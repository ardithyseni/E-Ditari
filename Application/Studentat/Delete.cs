using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Studentat
{

    public class Delete
{
    public class Command : IRequest
    {
        public Guid StudentiID { get; set; }
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
            var studenti = await _context.Studentat.FindAsync(request.StudentiID);

            _context.Remove(studenti); // removes from memory

            await _context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}

}