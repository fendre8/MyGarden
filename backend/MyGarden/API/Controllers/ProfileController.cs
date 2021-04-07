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
        private readonly IProfilesRepository repository;

        public ProfileController(IProfilesRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IEnumerable<Profile> List()
        {
            return repository.List();
        }

        [HttpGet("id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Profile> Get(int id)
        {
            var value = repository.FindById(id);
            if (value == null)
                return NotFound();
            else
                return Ok(value);
        }

        [HttpGet("name/{username}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Profile> GetByUsername(string username)
        {
            var value = repository.FindByUserName(username);
            if (value == null)
                return NotFound();
            else
                return Ok(value);
        }

        //[HttpPost]
        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public ActionResult<Profile> Create([FromBody] DAL.EF.DbModels.ApplicationUser value)
        //{
        //    try
        //    {
        //        var created = repository.Insert(value);
        //        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        return BadRequest(new { error = ex.Message });
        //    }
        //}

        [HttpDelete("{id}")]
        [Authorize(Roles ="Admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(int id)
        {
            var task = repository.Delete(id);
            if (task == null)
                return NotFound();
            else return NoContent();
        }

        [HttpPost("friend")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult AddFriend([FromBody] AddFriendModel friendModel)
        {
            var friendship = repository.AddFriend(friendModel.username1, friendModel.username2);
            if (friendship == null)
            {
                return BadRequest();
            }
            else
                return Created(nameof(AddFriend),friendship);
        }

        [HttpPost("issue")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<NewIssueResponse> CreateIssue([FromBody] NewIssueModel issue)
        {
            var user = repository.FindByUserName(issue.Username);
            if (user == null)
                return BadRequest();
            var plant = repository.GetPlantById(issue.PlantId);
            if (plant == null)
                return BadRequest();
            var result = repository.CreateIssueForPlant(issue);

            return new NewIssueResponse
            {
                Id = result.Id,
                Author = result.Author.Username,
                Plant = result.Plant.Name,
                Title = result.Title,
                Description = result.Description,
                Is_open = result.Is_open,
                Img_url = result.Img_url,
                Answers = new List<string>()
            };
        }
    }
}
