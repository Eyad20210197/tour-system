namespace TourManagementAPI.Models
{
    public class Tour
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public int Seats { get; set; }
        public int Duration { get; set; } // in days/hours
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public int AgencyId { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public string? Location { get; set; }
        public string Status { get; set; } = "pending";
    }


}
