using System;

namespace Domain
{
    public class Studenti
    {
    
        public Guid StudentiID { get; set; }

        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public DateTime Datelindja { get; set; }
        public string Adresa { get; set; }
        public string NumriKontaktues { get; set; }
        public string Email {get; set;}
        


    }
}