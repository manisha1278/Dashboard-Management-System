using DashboardProject.Models;
using DashboardProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DashboardProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserTypeController : ControllerBase
    {
        private readonly IUserTypeManager _userTypeManager;

        public UserTypeController(IUserTypeManager userTypeManager)
        {
            _userTypeManager = userTypeManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserTypeDto>>> GetAll()
        {
            var userTypes = await _userTypeManager.GetAllAsync();

            return Ok(userTypes);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<UserTypeDto>> GetById(Guid id)
        {
            var userType = await _userTypeManager.GetByIdAsync(id);

            if (userType == null)
            {
                return NotFound();
            }

            return Ok(userType);
        }

        [HttpPost]
        public async Task<ActionResult<UserTypeDto>> Create(CreateUserTypeDto dto)
        {
            try
            {
                var userType = await _userTypeManager.CreateAsync(dto);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = userType.Id },
                    userType);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<UserTypeDto>> Update(
            Guid id,
            UpdateUserTypeDto dto)
        {
            var userType = await _userTypeManager.UpdateAsync(id, dto);

            return Ok(userType);
        }
    }
}