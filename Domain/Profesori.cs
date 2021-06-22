using System;

namespace Domain
{
    public class Profesori
    {
        public Guid ProfesoriID { get; set; }
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public string Titulli { get; set; }
        public DateTime Datelindja { get; set; }
        public string Adresa { get; set; }
        public string NumriKontaktues { get; set; }
        public string Email {get; set;}
    }
}