using Microsoft.AspNetCore.Mvc;
using MyGarden.API.DTO;
using MyGarden.API.DTO.Growstuff;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL
{
    public interface IPlantsRepository
    {
        //Task<string> GetTokenFromOpenFarm();

        Task<IEnumerable<Plant>> List();

        Task<Plant> AddPlant(string plantName, string username = null);

        Task<OFPlantResult> OfFindPlantByName(string plantName);

        Task<GsPlantResult> GsFindPlantByName(string plantName);

        Plant GetPlantById(int id);

        Task<Plant> GetPlantByName(string name);
    }
}
