using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyGarden.API.DTO;
using MyGarden.DAL;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.API.Controllers
{
    [Authorize]
    [Route("api/profiles")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfilesRepository profile_repository;
        private readonly IPlantsRepository plant_repository;

        public ProfileController(IProfilesRepository prof_repository, IPlantsRepository plant_repository)
        {
            this.profile_repository = prof_repository;
            this.plant_repository = plant_repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Profile>> List()
        {
            return await profile_repository.List();
        }

        [HttpGet("id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Profile>> Get(int id)
        {
            var value = await profile_repository.FindById(id);
            if (value == null)
                return NotFound();
            else
                return Ok(value);
        }

        [HttpGet("name/{username}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Profile>> GetByUsername(string username)
        {
            var value = await profile_repository.FindByUserName(username);
            if (value == null)
                return NotFound();
            else
                return Ok(value);
        }

        [HttpGet("name/{username}/friends")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Profile>> GetUserFriendsByName(string username)
        {
            var value = await profile_repository.GetUserFriendsByName(username);
            if (value == null)
                return NotFound();
            else
                return Ok(value);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Profile>> Create([FromBody] DAL.EF.DbModels.ApplicationUser value)
        {
            try
            {
                var created = await profile_repository.Insert(value);
                return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles ="Admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int id)
        {
            var task = await profile_repository.Delete(id);
            if (task == null)
                return NotFound();
            else return NoContent();
        }

        [HttpPost("friend")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddFriend([FromBody] AddFriendModel friendModel)
        {
            var friendship = await profile_repository.AddFriend(friendModel.FriendFrom, friendModel.FriendTo);
            if (friendship == null)
            {
                return BadRequest(new Response
                {
                    Status = "400",
                    Message = "User not found"
                });
            }
            else
                return Created(nameof(AddFriend),friendship);
        }

        [HttpDelete("friend")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteFriend([FromBody] AddFriendModel friendModel)
        {
            var task = await profile_repository.DeleteFriendShip(friendModel.FriendFrom, friendModel.FriendTo);
            if (task == null)
                return NotFound();
            else return NoContent();
        }

        [HttpPost("name/{username}/plant")]
        public async Task<ActionResult> AddPlantToGarden([FromRoute] string username, [FromBody] PlantRequest _plant)
        {
            var plant = await plant_repository.AddPlant(_plant.plantName, username, _plant.plantTime);
            if (plant != null)
            {
                return Created(nameof(AddPlantToGarden), plant);
            }
            else
                return BadRequest();
        }

        [HttpGet("name/{username}/plants")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetUserPlants([FromRoute] string username)
        {
            var plants = await plant_repository.getUserPlants(username);
            if (plants != null)
            {
                return Ok(plants);
            }
            else
            {
                return NotFound();
            }
        }

    }

}
