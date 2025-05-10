using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TourApi.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Net.Http.Headers;

    [Route("api/[controller]")]
    [ApiController]
    public class AIController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public AIController()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://openrouter.ai/api/v1/");
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", "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"); // Put your key here securely
        }

        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] object promptPayload)
        {
            var response = await _httpClient.PostAsync(
                "chat/completions",
                new StringContent(promptPayload.ToString(), System.Text.Encoding.UTF8, "application/json")
            );

            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }
    }

}
