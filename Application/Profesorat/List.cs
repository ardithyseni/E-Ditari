using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profesorat
{
    public class List
    {
        public class Query : IRequest<List<Profesori>> { }

        public class Handler : IRequestHandler<Query, List<Profesori>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Profesori>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Profesorat.ToListAsync();
            }
        }
    }
}