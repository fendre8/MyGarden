using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

namespace MyGarden.Models
{
    public class Profile : IEntityBase
    {
        public Profile(string username, string email, string password)
        {
            Username = username;
            Email = email;
            Password = password;
            First_name = null;
            Last_name = null;
            Image = null;

            Plants = new List<Plant>();
            Issues = new List<Issue>();
        }

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
        public virtual ICollection<Plant> Plants { get; set; }
        public virtual ICollection<Issue> Issues { get; set; }
    }
}
