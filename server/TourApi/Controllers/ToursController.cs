using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TourApi.Contexts;
using TourManagementAPI.Models;

namespace TourApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToursController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ToursController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tour>>> GetTours([FromQuery] string? status, [FromQuery] int? agencyId)
        {
            var query = _context.Tours.AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(t => t.Status == status);

            if (agencyId.HasValue)
                query = query.Where(t => t.AgencyId == agencyId);

            return await query.ToListAsync();
        }


        // GET: api/Tours/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tour>> GetTour(int id)
        {
            var tour = await _context.Tours.FindAsync(id);

            if (tour == null)
            {
                return NotFound();
            }

            return tour;
        }

        // PUT: api/Tours/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTour(int id, Tour tour)
        {
            if (id != tour.Id)
            {
                return BadRequest();
            }

            _context.Entry(tour).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TourExists(id))
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

        // POST: api/Tours
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tour>> PostTour(Tour tour)
        {
            _context.Tours.Add(tour);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTour", new { id = tour.Id }, tour);
        }

        // DELETE: api/Tours/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTour(int id)
        {
            var tour = await _context.Tours.FindAsync(id);
            if (tour == null)
            {
                return NotFound();
            }

            _context.Tours.Remove(tour);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/Tours/5/approve
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApproveTour(int id)
        {
            if (!IsAdmin()) return Forbid(); // Check role

            var tour = await _context.Tours.FindAsync(id);
            if (tour == null) return NotFound();

            tour.Status = "approved";
            await _context.SaveChangesAsync();

            return Ok(tour);
        }

        // PUT: api/Tours/5/reject
        [HttpPut("{id}/reject")]
        public async Task<IActionResult> RejectTour(int id)
        {
            if (!IsAdmin()) return Forbid(); // Check role

            var tour = await _context.Tours.FindAsync(id);
            if (tour == null) return NotFound();

            tour.Status = "rejected";
            await _context.SaveChangesAsync();

            return Ok(tour);
        }

        private bool TourExists(int id)
        {
            return _context.Tours.Any(e => e.Id == id);
        }
        private bool IsAdmin()
        {
            // TEMPORARY for dev/testing — force admin access
            return true;
        }

    }
}
