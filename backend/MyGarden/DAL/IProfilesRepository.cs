using MyGarden.Models;
using System;
using System.Collections.Generic;

namespace MyGarden.DAL
{
    public interface IProfilesRepository
    {
        IReadOnlyCollection<Profile> List();
        Profile FindById(Guid id);
        Profile FindByUserName(string username);
        Profile Insert(EF.DbModels.ApplicationUser profile);
        Profile Delete(Guid id);

        FriendshipResponse AddFriend(string username1, string username2);
    }
}
