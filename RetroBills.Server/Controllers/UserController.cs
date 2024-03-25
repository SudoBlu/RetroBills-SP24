using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroBills.Server.DTOs;
using RetroBills.Server.Models;

namespace RetroBills.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //This code should be outside this file. To make this controller not a "fat controller"
        private readonly RetroBillsContext _retroBillsContext;
        public UserController(RetroBillsContext retroBillsContext)
        {
            _retroBillsContext = retroBillsContext;
        }

        //Getter for all users
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _retroBillsContext.Users.ToListAsync();

            return Ok(users);
        }

        //Getter for specific user
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _retroBillsContext.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found");

            return Ok(user);
        }

        //Creation of a user
        [HttpPost]
        public async Task<IActionResult> CreateUser(UserDTO userDTO)
        {
            //Mapping DTO to entity
            var user = new User
            {
                UserName = userDTO.UserName,
                Password = userDTO.Password,
                Email = userDTO.Email,
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,
                Address = userDTO.Address,
            };

            //Add User to database
            _retroBillsContext.Users.Add(user);
            await _retroBillsContext.SaveChangesAsync();

            return Ok(user);

            // Differing return statement. Returns a 201 Created response with the created user
            //return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);

        }

        //Editing of a user
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserDTO userDTO)
        {

            var user = await _retroBillsContext.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            user.UserName = userDTO.UserName;
            user.Password = userDTO.Password;
            user.Email = userDTO.Email;
            user.FirstName = userDTO.FirstName;
            user.LastName = userDTO.LastName;
            user.Address = userDTO.Address;

            try
            {
                await _retroBillsContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!UserExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();


        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _retroBillsContext.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _retroBillsContext.Users.Remove(user);
            await _retroBillsContext.SaveChangesAsync();
            return NoContent();
        }


        private bool UserExists(int id)
        {
            return _retroBillsContext.Users.Any(e => e.UserId == id);
        }


    }

}

