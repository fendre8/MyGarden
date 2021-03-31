using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace MyGarden.DAL
{
    public class PlantsRepository : IPlantsRepository
    {
        private readonly Uri growstuffpath = new Uri("http://growstuff.org/");

        private readonly HttpClient client = new HttpClient();

        public async Task<IEnumerable<Plant>> List()
        {
            List<Plant> plants = null;
            HttpResponseMessage response = await client.GetAsync(growstuffpath + "crops.json");
            if (response.IsSuccessStatusCode)
            {
                plants = await response.Content.ReadAsAsync<List<Plant>>();
            }
            return plants;
        }
    }
}
