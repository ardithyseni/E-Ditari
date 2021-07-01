using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Studenti> Studentat { get; set; }

        public DbSet<Libri> Librat { get; set; }

        public DbSet<Profesori> Profesorat {get; set; }

    }
}