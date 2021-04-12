using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

namespace MyGarden.DAL.EF.DbModels
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string First_name { get; set; }
        public string Last_name { get; set; }
        public string ImagePath { get; set; }


        //Friendship from me
        public virtual ICollection<Friendship> FriendshipFrom { get; set; } = new List<Friendship>();
        //Friendship to me
        public virtual ICollection<Friendship> FriendshipTo { get; set; } = new List<Friendship>();
        public virtual ICollection<Plant> Plants { get; set; } = new List<Plant>();
        public virtual ICollection<Issue> Issues { get; set; } = new List<Issue>();
    }
}
