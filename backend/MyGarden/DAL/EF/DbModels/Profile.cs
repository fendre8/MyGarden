using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

namespace MyGarden.DAL.EF.DbModels
{
    public class Profile : IEntityBase
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        [NotMapped]
        public Image Image { get; set; }


        //public ICollection<Profile> Friends { get; set; }
        public virtual ICollection<Friendship> Friendship { get; set; } = new List<Friendship>();
        public virtual ICollection<Plant> Plants { get; set; } = new List<Plant>();
        public virtual ICollection<Issue> Issues { get; set; } = new List<Issue>();
    }
}
