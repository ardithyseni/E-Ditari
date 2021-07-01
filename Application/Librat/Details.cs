using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Librat
{
    public class Details
    {
        public class Query : IRequest<Libri>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Libri>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Libri> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Librat.FindAsync(request.Id);
            }
        }
    }
}