namespace TourManagementAPI.Models
{
    public class Complaint
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; }
        public string Status { get; set; } // pending, resolved, rejected
        public DateTime Date { get; set; } = DateTime.Now;
        public string? Response { get; set; }
    }
}
