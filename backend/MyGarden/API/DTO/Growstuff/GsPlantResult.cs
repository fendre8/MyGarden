using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.API.DTO.Growstuff
{

    public class GsPlantResult
    {
        public int id { get; set; }
        public string name { get; set; }
        public string slug { get; set; }
        public int median_lifespan { get; set; }
        public int? median_days_to_first_harvest { get; set; }
        public int? median_days_to_last_harvest { get; set; }
        public Scientific_Names[] scientific_names { get; set; }
    }

    public class Scientific_Names
    {
        public string name { get; set; }
    }


}
