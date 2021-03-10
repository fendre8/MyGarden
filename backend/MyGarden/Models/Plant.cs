using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.Models
{
    public class Plant
    {
        //TODO - Plant konstruktor
        public Plant()
        {

        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Scientific_name { get; set; }
        public string Description { get; set; }
        public string Median_lifespan { get; set; }
        public string First_harvest_exp { get; set; }
        public string Last_harvest_exp { get; set; }
        public double Height { get; set; }
        public double Spread { get; set; }
        public double Row_spacing { get; set; }
        public string Sun_requirements { get; set; }
        public string Sowing_method { get; set; }
        public string Img_url { get; set; }

        public DateTime Plant_time { get; set; }
    }
}
