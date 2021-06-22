using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class StudentatController : BaseApiController
    {
        private readonly DataContext _context;
        public StudentatController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Studenti>>> GetStudentat()
        {
            return await _context.Studentat.ToListAsync();
        }

        [HttpGet("{id}")]  //studentat/id

        public async Task<ActionResult<Studenti>> GetStudenti(Guid id) 
        {
            return await _context.Studentat.FindAsync(id);
        }

        
    }
}