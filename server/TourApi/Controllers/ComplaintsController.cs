using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using TourApi.Contexts;
using TourApi.Hubs;
using TourManagementAPI.Models;

namespace TourApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplaintsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<ComplaintHub> _hubContext;

        public ComplaintsController(AppDbContext context, IHubContext<ComplaintHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/Complaints/5
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Complaint>>> GetComplaints([FromQuery] int? userId)
        {
            if (userId.HasValue)
            {
                // Tourist should only see their own complaints
                return await _context.Complaints
                    .Where(c => c.UserId == userId.Value)
                    .ToListAsync();
            }

            // Admin sees all complaints
            return await _context.Complaints.ToListAsync();
        }


        // PATCH: api/Complaints/5 (Admin response)
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateComplaint(int id, [FromBody] Complaint updated)
        {
            var complaint = await _context.Complaints.FindAsync(id);
            if (complaint == null) return NotFound();

            complaint.Response = updated.Response;
            complaint.Status = updated.Status;
            await _context.SaveChangesAsync();

            // Notify specific user via SignalR
            await _hubContext.Clients.User(complaint.UserId.ToString())
                .SendAsync("ReceiveComplaintUpdate", complaint);

            return Ok(complaint);
        }

        // POST: api/Complaints (User creates complaint)
        [HttpPost]
        public async Task<ActionResult<Complaint>> PostComplaint(Complaint complaint)
        {
            _context.Complaints.Add(complaint);
            await _context.SaveChangesAsync();

            // Notify all admins (or globally) of new complaint
            await _hubContext.Clients.All.SendAsync("ReceiveNewComplaint", complaint);

            return CreatedAtAction("GetComplaint", new { id = complaint.Id }, complaint);
        }

        // DELETE: api/Complaints/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComplaint(int id)
        {
            var complaint = await _context.Complaints.FindAsync(id);
            if (complaint == null) return NotFound();

            _context.Complaints.Remove(complaint);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
