using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Studentat;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StudentatController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Studenti>>> GetStudentat()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Studenti>> GetStudenti(Guid id)
        {
           return await Mediator.Send(new Details.Query{StudentiID = id});
        } 

        [HttpPost]
        public async Task<IActionResult> CreateStudenti(Studenti studenti)
        {
            return Ok(await Mediator.Send(new Create.Command {Studenti = studenti}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditStudenti(Guid id, Studenti studenti)
        {
            studenti.StudentiID = id;
            return Ok(await Mediator.Send(new Edit.Command{Studenti = studenti}));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudenti(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{StudentiID = id}));
        }
    }

    
}