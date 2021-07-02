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
                    Autori = "Cal Newport",
                    Title = "Deep Work",
                    Description = "Libri per Fokus", 
		            Category = "Life",
                }
	     };

            await context.Librat.AddRangeAsync(librat);
            await context.SaveChangesAsync();
        }

    }
}