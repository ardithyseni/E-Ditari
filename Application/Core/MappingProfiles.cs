using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Studenti, Studenti>();
            CreateMap<Profesori, Profesori>();
        }
    }
}