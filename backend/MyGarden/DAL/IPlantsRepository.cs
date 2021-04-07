using Microsoft.AspNetCore.Mvc;
using MyGarden.API.DTO;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL
{
    public interface IPlantsRepository
    {
        Task<Action> GetTokenFromOpenFarm();

        Task<IEnumerable<Plant>> List();

        Task<ActionResult> AddPlant(EF.DbModels.Plant plant);

        Task<OFPlantResult> FindPlantByName(string plantName);

    }
}
