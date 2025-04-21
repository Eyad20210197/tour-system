using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TourApi.Contexts;
using TourManagementAPI.Models;

namespace TourApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetBookings([FromQuery] int? userId, [FromQuery] int? agencyId)
        {
            var query = _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Tour)
                .AsQueryable();

            if (userId.HasValue)
                query = query.Where(b => b.UserId == userId);

            if (agencyId.HasValue)
                query = query.Where(b => b.Tour.AgencyId == agencyId);

            var result = await query
                .Select(b => new
                {
                    b.Id,
                    b.UserId,
                    Username = b.User.Username,
                    b.TourId,
                    TourName = b.Tour.Name,
                    Price = b.Tour.Price,
                    b.Status,
                    b.BookingDate,
                    b.Review,
                    b.Rating,
                    AgencyId = b.Tour.AgencyId
                })
                .ToListAsync();

            return Ok(result);
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }
            return booking;
        }

        // PUT: api/Bookings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.Id)
                return BadRequest();

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // PATCH: api/Bookings/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateBookingStatusOrReview(int id, [FromBody] Booking updatedBooking)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
                return NotFound();

            if (!string.IsNullOrEmpty(updatedBooking.Status))
                booking.Status = updatedBooking.Status;

            if (!string.IsNullOrEmpty(updatedBooking.Review))
                booking.Review = updatedBooking.Review;

            if (updatedBooking.Rating.HasValue)
                booking.Rating = updatedBooking.Rating;

            await _context.SaveChangesAsync();
            return Ok(booking);
        }

        // POST: api/Bookings
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            booking.BookingDate = DateTime.UtcNow;

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.Id }, booking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
                return NotFound();

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.Id == id);
        }
    }
}
