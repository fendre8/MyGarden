using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL.EF.DbModels
{
    public class Friendship
    {
        public Guid Id { get; set; }

        public Guid Friend1Id { get; set; }
        public ApplicationUser Friend1 { get; set; }

        public Guid Friend2Id { get; set; }
        public ApplicationUser Friend2 { get; set; }
    }
}
