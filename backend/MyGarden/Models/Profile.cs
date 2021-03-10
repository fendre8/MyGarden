using System;
using System.Collections.Generic;
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

            Friends = new List<Profile>();
            Plants = new List<Plant>();
            Issues = new List<Issue>();
        }

        public Guid Id { get; set; }
        public string Username { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public Image Image { get; set; }


        public List<Profile> Friends { get; set; }
        public List<Plant> Plants { get; set; }
        public List<Issue> Issues { get; set; }
    }
}
