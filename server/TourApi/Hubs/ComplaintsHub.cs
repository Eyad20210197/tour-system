using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace TourApi.Hubs
{
    public class ComplaintHub : Hub
    {
        public async Task SendComplaintToAdmins(object complaint)
        {
            await Clients.All.SendAsync("ReceiveComplaint", complaint);
        }

        public async Task SendResponseToUser(object complaint)
        {
            await Clients.All.SendAsync("ReceiveResponse", complaint);
        }
    }
}
