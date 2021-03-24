using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

namespace MyGarden.DAL.EF.DbModels
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string First_name { get; set; }
        public string Last_name { get; set; }
        [NotMapped]
        public Image Image { get; set; }


        //public ICollection<Profile> Friends { get; set; }
        public virtual ICollection<Friendship> Friendship { get; set; } = new List<Friendship>();
        public virtual ICollection<Plant> Plants { get; set; } = new List<Plant>();
        public virtual ICollection<Issue> Issues { get; set; } = new List<Issue>();
    }
}
