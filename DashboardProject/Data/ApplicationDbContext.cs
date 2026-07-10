using DashboardProject.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace DashboardProject.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Dashboard> Dashboards { get; set; }
        public DbSet<Widget> Widgets { get; set; }

        public DbSet<DashboardWidget> DashboardWidgets { get; set; }

        public DbSet<UserType> UserTypes { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserDashboard> UserDashboards { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<DashboardWidget>()
                .HasKey(dw => new
                {
                    dw.DashboardId,
                    dw.WidgetId
                });

            modelBuilder.Entity<DashboardWidget>()
                .HasOne(dw => dw.Dashboard)
                .WithMany(d => d.DashboardWidgets)
                .HasForeignKey(dw => dw.DashboardId);

            modelBuilder.Entity<DashboardWidget>()
                .HasOne(dw => dw.Widget)
                .WithMany(w => w.DashboardWidgets)
                .HasForeignKey(dw => dw.WidgetId);

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.Name)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(x => x.IsActive)
                      .IsRequired();

                entity.Property(x => x.IsSystem)
                      .IsRequired();

                entity.Property(x => x.CreatedOn)
                      .IsRequired();

                entity.HasIndex(x => x.Name)
                      .IsUnique();
            });


            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.Username)
                      .IsRequired()
                      .HasMaxLength(50);

                entity.Property(x => x.FullName)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(x => x.Email)
                      .HasMaxLength(150);

                entity.Property(x => x.Contact)
                      .HasMaxLength(20);

                entity.Property(x => x.IsActive)
                      .IsRequired();

                entity.Property(x => x.IsSystem)
                      .IsRequired();

                entity.Property(x => x.CreatedOn)
                      .IsRequired();

                entity.HasIndex(x => x.Username)
                      .IsUnique();

                entity.HasOne(x => x.UserType)
                      .WithMany(x => x.Users)
                      .HasForeignKey(x => x.UserTypeId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<UserDashboard>(entity =>
            {
                entity.HasKey(x => new
                {
                    x.UserId,
                    x.DashboardId
                });

                entity.HasOne(x => x.User)
                      .WithMany(x => x.UserDashboards)
                      .HasForeignKey(x => x.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(x => x.Dashboard)
                      .WithMany(x => x.UserDashboards)
                      .HasForeignKey(x => x.DashboardId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }



    }
}
