using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL.EF.DbModels
{
    public class Friendship
    {
        public int Id { get; set; }

        public int Friend1Id { get; set; }
        public ApplicationUser Friend1 { get; set; }

        public int Friend2Id { get; set; }
        public ApplicationUser Friend2 { get; set; }
    }
}
