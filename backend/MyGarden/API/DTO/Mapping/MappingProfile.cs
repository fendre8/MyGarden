using MyGarden.API.DTO;

namespace MyGarden.Models.Mapping
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<DAL.EF.DbModels.ApplicationUser, Profile>();
            CreateMap<Profile, DAL.EF.DbModels.ApplicationUser>()
                .ForMember(dest => dest.FriendshipFrom, opt => opt.MapFrom(src => src.Friends))
                .ForMember(dest => dest.FriendshipTo, opt => opt.MapFrom(src => src.Friends));

            CreateMap<DAL.EF.DbModels.Plant, Plant>();
            CreateMap<Plant, DAL.EF.DbModels.Plant>();

            //CreateMap<DAL.EF.DbModels.Friendship, FriendshipDTO>();
            //CreateMap<FriendshipDTO, DAL.EF.DbModels.Friendship>();

            CreateMap<Issue, DAL.EF.DbModels.Issue>();
            CreateMap<DAL.EF.DbModels.Issue, Issue>();
        }
    }
}
