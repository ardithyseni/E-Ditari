using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {

            if (context.Librat.Any()) return;
            
            var librat = new List<Libri>
            {
                new Libri
                {
                    Autori = "Rexhep Gjergji",
                    Title = "Matematika 1",
                    Description = "Libri i Matematikes 1",
		    Category = "Matematike",
                },
                new Libri
                {
                    Autori = "Daniel Lang",
                    Title = "Introduction to Java Programming",
                    Description = "Libri per SHK1 dhe SHK2",
		    Category = "Java",  
                },
                new Libri
                {
                    Autori = "Abraham-Silberschatz",
                    Title = "Operating System Concepts (2018)",
                    Description = "Libri per Sisteme Operative",
		    Category = "Sisteme Operative",
                }
	     };

            await context.Librat.AddRangeAsync(librat);
            await context.SaveChangesAsync();
        }

    }
}