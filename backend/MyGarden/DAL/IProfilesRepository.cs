using MyGarden.Models;
using System;
using System.Collections.Generic;
using MyGarden.API.DTO;
using System.Threading.Tasks;

namespace MyGarden.DAL
{
    public interface IProfilesRepository
    {
        Task<IReadOnlyCollection<Profile>> List();
        Task<Profile> FindById(int id);
        Task<Profile> FindByUserName(string username);
        Task<Profile> Insert(EF.DbModels.ApplicationUser profile);
        Task<Profile> Delete(int id);

        Task<FriendshipResponse> AddFriend(string username1, string username2);
        Task<FriendshipDTO> DeleteFriendShip(string username1, string username2);

        Response InviteFriend(string username);
        Response AcceptFriendRequest();
    }
}
