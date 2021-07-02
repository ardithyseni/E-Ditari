using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Librat;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class LibratController : BaseApiController
    {
       

        [HttpGet]
        public async Task<ActionResult<List<Libri>>> GetLibrat()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]  //librat/id

        public async Task<ActionResult<Libri>> GetLibri(Guid id) 
        {
             return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateLibri(Libri libri)
        {
            return Ok(await Mediator.Send(new Create.Command {Libri = libri}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditLibri(Guid id, Libri libri)
        {
            libri.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Libri = libri}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibri(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}