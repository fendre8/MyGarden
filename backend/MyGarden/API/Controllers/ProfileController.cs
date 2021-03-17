using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyGarden.DAL;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.API.Controllers
{
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

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Profile> Get(Guid id)
        {
            var value = repository.FindById(id);
            if (value == null)
                return NotFound();
            else
                return Ok(value);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Profile> Create([FromBody] DAL.EF.DbModels.Profile value)
        {
            try
            {
                var created = repository.Insert(value);
                return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(Guid id)
        {
            var task = repository.Delete(id);
            if (task == null)
                return NotFound();
            else return NoContent();
        }

    }
}
