using Microsoft.EntityFrameworkCore;
using PharmacyAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace PharmacyAPI.Data
{
    public class PharmacyContext : DbContext
    {
        public PharmacyContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<MedRecord>()
                .HasIndex(m => m.name)
                .IsUnique();
        }
        public DbSet<MedRecord> medRecord
        {
            get; set;
        }
    }
}
