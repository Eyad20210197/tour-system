namespace TourManagementAPI.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int TourId { get; set; }
        public Tour? Tour { get; set; }
        public string Status { get; set; } // pending, approved, rejected
        public string? Review { get; set; }
        public int? Rating { get; set; }
        public DateTime? BookingDate { get; set; } = DateTime.Now;
    }
}
