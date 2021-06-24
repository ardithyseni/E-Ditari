using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Profesorat
{
    public class Delete
    {
        public class Command : IRequest
    {
        public Guid ProfesoriID { get; set; }
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
            var profesori = await _context.Profesorat.FindAsync(request.ProfesoriID);

            _context.Remove(profesori); // removes from memory

            await _context.SaveChangesAsync();

            return Unit.Value;
        }
    }
    }
}