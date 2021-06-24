using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Profesorat;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ProfesoratController : BaseApiController
    {
        private readonly IMediator _mediator;
        public ProfesoratController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Profesori>>> GetProfesorat()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]  //profesorat/id

        public async Task<ActionResult<Profesori>> GetProfesori(Guid id) 
        {
             return await Mediator.Send(new Details.Query{ProfesoriID = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudenti(Profesori profesori)
        {
            return Ok(await Mediator.Send(new Create.Command {Profesori = profesori}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProfesori(Guid id, Profesori profesori)
        {
            profesori.ProfesoriID = id;
            return Ok(await Mediator.Send(new Edit.Command{Profesori = profesori}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfesori(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{ProfesoriID = id}));
        }
    }
}