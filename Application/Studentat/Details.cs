using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Studentat
{
    public class Details
    {
        public class Query : IRequest<Studenti>
        {
            public Guid StudentiID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Studenti>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Studenti> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Studentat.FindAsync(request.StudentiID);
            }
        }
    }
}