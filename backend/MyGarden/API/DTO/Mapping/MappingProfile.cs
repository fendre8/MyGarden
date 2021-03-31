using MyGarden.API.DTO;

namespace MyGarden.Models.Mapping
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<DAL.EF.DbModels.ApplicationUser, Profile>();
            CreateMap<DAL.EF.DbModels.Friendship, FriendshipDTO>()
                .ForMember(dest => dest.Friend1, source => source.MapFrom(source => source.Friend1.UserName))
                .ForMember(dest => dest.Friend2, source => source.MapFrom(source => source.Friend2.UserName));
        }
    }
}
