using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profesorat
{
    public class Edit
    {
        public class Command : IRequest
        {

            public Profesori Profesori { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var profesori = await _context.Studentat.FindAsync(request.Profesori.ProfesoriID);

                _mapper.Map(request.Profesori, profesori);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}