using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.API.DTO
{
    public enum UserStatus
    {
        New,
        Registered,
        LoggedIn
    }

    public enum UserType
    {
        User,
        Admin
    }

    public class ErrorModel
    {
        public string Type { get; set; } = "";
        public string Code { get; set; } = "";
        public string Description { get; set; } = "";
    }
  

    public class Session
    {

        public UserStatus Status { get; set; } = UserStatus.New;
        public UserType UserType { get; set;} = UserType.User;
        public string Username { get; set; } = "";
        public bool Success { get; set; } = false;
        public string Token { get; set; } = "";
        public ErrorModel Error { get; set; } = new ErrorModel();
    }
}
