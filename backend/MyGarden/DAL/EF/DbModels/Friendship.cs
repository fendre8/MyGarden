using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL.EF.DbModels
{
    public class Friendship
    {
        public int FromId { get; set; }
        public virtual ApplicationUser FriendFrom { get; set; }

        public int ToId { get; set; }
        public virtual ApplicationUser FriendTo { get; set; }
    }
}
