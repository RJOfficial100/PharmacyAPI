using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyAPI.Models
{
    public class MedRecord
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string brand { get; set; }
        public double price { get; set; }
        public int quantity { get; set; }
        public DateTime date { get; set; }
        public string notes { get; set; }
    }
}
