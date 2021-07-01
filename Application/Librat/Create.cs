using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Librat
{
    public class Create
    {
        public class Command : IRequest
        {
            public Libri Libri { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Librat.Add(request.Libri);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}