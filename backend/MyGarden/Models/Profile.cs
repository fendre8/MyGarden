using System;
using System.Collections.Generic;
using System.Drawing;

namespace MyGarden.Models
{
    public class Profile
    {
        public Profile(Guid id, string username, string email, string password)
        {
            Id = id;
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
        public Image Image { get; set; }

        public virtual ICollection<Profile> Friends { get; set; } = new List<Profile>();
        public virtual ICollection<Plant> Plants { get; set; }
        public virtual ICollection<Issue> Issues { get; set; }

    }
}
