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

            //Friends = new List<Profile>();
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
        public ICollection<Friendship> Friendship { get; set; }
        public ICollection<Plant> Plants { get; set; }
        public ICollection<Issue> Issues { get; set; }
    }
}
