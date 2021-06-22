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

            if (context.Profesorat.Any()) return;
            
            var profesorat = new List<Profesori>
            {
                new Profesori
                {
                    Emri = "Lavdim",
                    Mbiemri= "Menxhiqi",
                    Titulli = "Profesor",
		            Datelindja = DateTime.Now.AddMonths(-60),
                    Adresa= "Bregu i Diellit, Prishtine",
                    NumriKontaktues = "044123456",
                    Email = "lm@gmail.com",
                   
                },
                new Profesori
                {
                    Emri = "Blerton",
                    Mbiemri= "Abazi",
                    Titulli = "Profesor",
		            Datelindja = DateTime.Now.AddMonths(-90),
                    Adresa= "Prishtine",
                    NumriKontaktues = "044123123",
                    Email = "ba@gmail.com",  
                },
                new Profesori
                {
                    Emri = "Profa",
                    Mbiemri= "Filan",
                    Titulli = "Asistent",
		            Datelindja = DateTime.Now.AddMonths(-24),
                    Adresa= "Prizren",
                    NumriKontaktues = "044443444",
                    Email = "pf@gmail.com",
                }
	     };

            await context.Profesorat.AddRangeAsync(profesorat);
            await context.SaveChangesAsync();
        }

    }
}