using System;

namespace Domain
{
    public class Libri 
    {
        public Guid Id { get; set; }
        public string Autori { get; set; }
        public string Title { get; set;}
        public string Description { get; set;}
        public string Category { get; set;}
    }
}