using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PharmacyAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyAPI.Data
{
    public class DummyData
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<PharmacyContext>();
                context.Database.EnsureCreated();

                if (context.medRecord != null && context.medRecord.Any())
                    return;
                var medRecords = GetMedRecord().ToArray();
                context.medRecord.AddRange(medRecords);
                context.SaveChanges();
            }
        }


        public static List<MedRecord> GetMedRecord()
        {
            List<MedRecord> medRecords = new List<MedRecord>()
            {
                new MedRecord{name="Ciplox",brand="Cipla",price=34.00,quantity=50,date=Convert.ToDateTime("25-08-2021"),notes="Calcium Medicine"},
                new MedRecord{name="Low Quantity",brand="Own",price=150.00,quantity=7,date=Convert.ToDateTime("04-08-2021"),notes="anything"},
                new MedRecord{name="Expiry Date Near",brand="Own",price=400.00,quantity=70,date=Convert.ToDateTime("23-09-2020"),notes="anything"},
                new MedRecord{name="Expiry Date + Low Quantity",brand="Own",price=400.00,quantity=9,date=Convert.ToDateTime("23-09-2020"),notes="anything"}
            };
            return medRecords;
        }
    }
}
