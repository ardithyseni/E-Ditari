using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ProfesoratController : BaseApiController
    {
        private readonly DataContext _context;
        public ProfesoratController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Profesori>>> GetProfesorat()
        {
            return await _context.Profesorat.ToListAsync();
        }

        [HttpGet("{id}")]  //studentat/id

        public async Task<ActionResult<Profesori>> GetProfesori(Guid id) 
        {
            return await _context.Profesorat.FindAsync(id);
        }

        
    }
}