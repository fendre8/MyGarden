using MyGarden.API.DTO;

namespace MyGarden.Models.Mapping
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<DAL.EF.DbModels.ApplicationUser, Profile>();
        }
    }
}
