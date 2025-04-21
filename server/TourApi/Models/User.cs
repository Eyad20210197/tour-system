using System.Text.Json.Serialization;

namespace TourManagementAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [JsonPropertyName("username")]
        public string Username { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }


        [JsonPropertyName("role")]
        public string Role { get; set; } // e.g., "tourist", "admin", "agency"
    }
}
