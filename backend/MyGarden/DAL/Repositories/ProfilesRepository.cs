using Microsoft.EntityFrameworkCore;
using MyGarden.API.DTO;
using MyGarden.DAL.EF;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL
{
    public class ProfilesRepository : IProfilesRepository
    {
        private readonly AutoMapper.IMapper mapper;
        private readonly MyGardenDbContext db;

        public ProfilesRepository(MyGardenDbContext db, AutoMapper.IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        public async Task<IReadOnlyCollection<Profile>> List()
        {
            return db
                .ApplicationUsers
                .Include(u => u.FriendshipTo).ThenInclude(f => f.FriendTo)
                .Include(u => u.FriendshipFrom).ThenInclude(f => f.FriendFrom)
                .Include(u => u.Plants)
                .Include(u => u.Issues)
                .AsSplitQuery()
                .Select(ToModel)
                .ToList();
        }

        public async Task<Profile> FindById(int id)
        {
            var dbRecord = await db.ApplicationUsers
                    .Include(u => u.FriendshipTo).ThenInclude(f => f.FriendTo)
                    .Include(u => u.FriendshipFrom).ThenInclude(f => f.FriendFrom)
                    .Include(u => u.Plants)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync(p => p.Id == id);
            if (dbRecord == null)
                return null;
            else
                return ToModel(dbRecord);
        }

        public async Task<Profile> FindByUserName(string username)
        {
            var dbRecord = await db.ApplicationUsers
                .Include(u => u.FriendshipTo).ThenInclude(f => f.FriendTo)
                .Include(u => u.FriendshipFrom).ThenInclude(f => f.FriendFrom)
                .Include(u => u.Plants)
                .AsSplitQuery()
                .FirstOrDefaultAsync(p => p.NormalizedUserName == username.Normalize());
            if (dbRecord == null)
                return null;
            else
                return ToModel(dbRecord);
        }

        public async Task<Profile[]> GetUserFriendsByName(string username)
        {
            var dbRecord = await db.ApplicationUsers
                .Include(u => u.FriendshipTo).ThenInclude(f => f.FriendTo).ThenInclude(u => u.Plants)
                .Include(u => u.FriendshipFrom).ThenInclude(f => f.FriendFrom).ThenInclude(u => u.Plants)
                .AsSplitQuery()
                .FirstOrDefaultAsync(u => u.UserName == username);
            if (dbRecord == null)
            {
                return null;
            }
            else
            {
                var friends1 = dbRecord.FriendshipFrom.Select(f => f.FriendFrom);
                var friends2 = dbRecord.FriendshipTo.Select(f => f.FriendTo);
                var allFriends = friends1.Concat(friends2);
                var result = new List<Profile>();
                foreach (var friend in allFriends)
                {
                    result.Add(new Profile
                    {
                        Id = friend.Id,
                        Username = friend.UserName,
                        Email = friend.Email,
                        First_name = friend.First_name,
                        Last_name = friend.Last_name,
                        ImagePath = friend.ImagePath,
                        Friends = null,
                        Issues = null,
                        Plants = friend.Plants.Select(p => p.Name).ToList()
                    });
                }
                return result.ToArray();
            }
        }


        public async Task<Profile> Insert(EF.DbModels.ApplicationUser profile)
        {
            using (var tran = await db.Database.BeginTransactionAsync(System.Data.IsolationLevel.RepeatableRead))
            {
                if (db.ApplicationUsers.Any(s => Microsoft.EntityFrameworkCore.EF.Functions.Like(s.UserName, profile.UserName)))
                    throw new ArgumentException("username must be unique");

                var toInsert = new EF.DbModels.ApplicationUser()
                {
                    UserName = profile.UserName,
                    Email = profile.Email,
                    PasswordHash = profile.PasswordHash,
                };
                db.ApplicationUsers.Add(toInsert);

                await db.SaveChangesAsync();
                await tran.CommitAsync();

                return new Profile
                {
                    Id = toInsert.Id,
                    Username = profile.UserName,
                    Email = profile.Email
                };
            }

        }

        public async Task<Profile> Delete(int profileId)
        {
            using (var tran = await db.Database.BeginTransactionAsync(System.Data.IsolationLevel.RepeatableRead))
            {
                var dbRecord = await db.ApplicationUsers.FirstOrDefaultAsync(t => t.Id == profileId);

                db.ApplicationUsers.Remove(dbRecord);
                await db.SaveChangesAsync();
                await tran.CommitAsync();

                return dbRecord == null ? null : mapper.Map<Profile>(dbRecord);
            }
        }

        public async Task<FriendshipResponse> AddFriend(string FriendFrom, string FriendTo)
        {
            using (var trans = await db.Database.BeginTransactionAsync(System.Data.IsolationLevel.RepeatableRead))
            {
                var dbUserFrom = await db.ApplicationUsers.FirstOrDefaultAsync(p => p.NormalizedUserName == FriendFrom.Normalize());
                var dbUserTo = await db.ApplicationUsers.FirstOrDefaultAsync(p => p.NormalizedUserName == FriendTo.Normalize());
                if (dbUserFrom == null || dbUserTo == null)
                    return null;
                var toInsert = new EF.DbModels.Friendship()
                {
                    FriendFrom = dbUserFrom,
                    FromId = dbUserFrom.Id,
                    FriendTo = dbUserTo,
                    ToId = dbUserTo.Id
                };

                db.Friendships.Add(toInsert);

                await db.SaveChangesAsync();
                await trans.CommitAsync();
                return new FriendshipResponse { FriendFrom = dbUserFrom.UserName, FriendTo = dbUserTo.UserName };
            }
        }

        public async Task<FriendshipDTO> DeleteFriendShip(string username1, string username2)
        {
            using (var tran = await db.Database.BeginTransactionAsync(System.Data.IsolationLevel.RepeatableRead))
            {
                var user1 = await db.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == username1);
                var user2 = await db.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == username2);

                var dbRecord = await db.Friendships.
                    FirstOrDefaultAsync(f => (
                    f.FromId == user1.Id && f.ToId == user2.Id || f.FromId == user2.Id && f.ToId == user1.Id));

                if (dbRecord != null)
                {
                    db.Friendships.Remove(dbRecord);
                    await db.SaveChangesAsync();
                    await tran.CommitAsync();
                }

                return dbRecord == null ? null : new FriendshipDTO
                {
                    Friend1 = user1.UserName,
                    Friend2 = user2.UserName
                };
            }
        }

        public Response InviteFriend(string username)
        {
            throw new NotImplementedException();
        }

        public Response AcceptFriendRequest()
        {
            throw new NotImplementedException();
        }

        private static Profile ToModel(EF.DbModels.ApplicationUser value)
        {
            var friends1 = value.FriendshipFrom.Select(f => f.FriendFrom.UserName);
            var friends2 = value.FriendshipTo.Select(f => f.FriendTo.UserName);

            var profile = new Profile
            {
                Id = value.Id,
                Username = value.UserName,
                Email = value.Email,
                Plants = value.Plants.Select(p => p.Name).ToList(),
                First_name = value.First_name,
                Last_name = value.Last_name,
                ImagePath = value.ImagePath,
            };

                profile.Friends.AddRange(friends1);
                profile.Friends.AddRange(friends2);

            return profile;
        }

    }
}
