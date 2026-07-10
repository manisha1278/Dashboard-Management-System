using DashboardProject.Data;
using DashboardProject.Services;
using DashboardProject.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);



builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));



builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            ReferenceHandler.IgnoreCycles;
    });

// CORS (can be removed later if Angular and API are served from the same origin)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// JWT Authentication
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();

// Dependency Injection
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<SeedService>();
builder.Services.AddScoped<IUserTypeService, UserTypeService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserDashboardService, UserDashboardAssignmentService>();
builder.Services.AddScoped<DashboardService>();



var app = builder.Build();



app.UseHttpsRedirection();

// Serve Angular files from wwwroot
app.UseStaticFiles();

app.UseRouting();

// CORS
app.UseCors("AngularPolicy");

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// API Controllers
app.MapControllers();

// Angular Routing Fallback
app.MapFallbackToFile("index.html");

// Seed Database
/*
using (var scope = app.Services.CreateScope())
{
    var seedService = scope.ServiceProvider.GetRequiredService<SeedService>();
    await seedService.SeedAsync();
}
*/
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var dbContext = services.GetRequiredService<ApplicationDbContext>();

    await dbContext.Database.MigrateAsync();

    var seedService = services.GetRequiredService<SeedService>();

    await seedService.SeedAsync();
}

app.Run();