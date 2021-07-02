using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Domain;


namespace Application.Librat
{
    public class Delete
    {
        public class Command : IRequest
    {
        public Guid Id { get; set; }
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
            var libri = await _context.Librat.FindAsync(request.Id);

            _context.Remove(libri); // removes from memory

            await _context.SaveChangesAsync();

            return Unit.Value;
        }
        }
    }
}