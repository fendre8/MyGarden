using MyGarden.Models;
using System;
using System.Collections.Generic;
using MyGarden.API.DTO;

namespace MyGarden.DAL
{
    public interface IProfilesRepository
    {
        IReadOnlyCollection<Profile> List();
        Profile FindById(int id);
        Profile FindByUserName(string username);
        Profile Insert(EF.DbModels.ApplicationUser profile);
        Profile Delete(int id);

        FriendshipResponse AddFriend(string username1, string username2);

        Response InviteFriend(string username);
        Response AcceptFriendRequest();

        void Plant(Plant plant);
        Plant GetPlantById(int id);
        Issue CreateIssueForPlant(NewIssueModel issue);

        void AddCommentForIssue(Issue issue, Answer answer);
    }
}
