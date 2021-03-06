using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Studentat
{
    public class Edit
    {
        public class Command : IRequest
        {

            public Studenti Studenti { get; set; }
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
                var studenti = await _context.Studentat.FindAsync(request.Studenti.StudentiID);

                _mapper.Map(request.Studenti, studenti);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}