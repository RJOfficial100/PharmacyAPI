using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacyAPI.Data;
using PharmacyAPI.Models;

namespace PharmacyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("PharmacyPolicy")]
    public class MedRecordsController : ControllerBase
    {
        private readonly PharmacyContext _context;

        public MedRecordsController(PharmacyContext context)
        {
            _context = context;
        }

        // GET: api/MedRecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedRecord>>> GetmedRecord()
        {
            return await _context.medRecord.ToListAsync();
        }

        // GET: api/MedRecords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedRecord>> GetMedRecord(int id)
        {
            var medRecord = await _context.medRecord.FindAsync(id);

            if (medRecord == null)
            {
                return NotFound(); 
            }

            return medRecord;
        }
        // PUT: api/MedRecords/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedRecord(int id, MedRecord medRecord)
        {
            if (id != medRecord.id)
            {
                return BadRequest();
            }

            _context.Entry(medRecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedRecordExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MedRecords
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MedRecord>> PostMedRecord(MedRecord medRecord)
        {
            _context.medRecord.Add(medRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedRecord", new { id = medRecord.id }, medRecord);
        }

        // DELETE: api/MedRecords/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MedRecord>> DeleteMedRecord(int id)
        {
            var medRecord = await _context.medRecord.FindAsync(id);
            if (medRecord == null)
            {
                return NotFound();
            }

            _context.medRecord.Remove(medRecord);
            await _context.SaveChangesAsync();

            return medRecord;
        }

        private bool MedRecordExists(int id)
        {
            return _context.medRecord.Any(e => e.id == id);
        }
    }
}
