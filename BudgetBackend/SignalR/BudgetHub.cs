using Microsoft.AspNetCore.SignalR;

namespace BudgetBackend.SignalR
{
    public class BudgetHub : Hub
    {
        public async Task SendAsync(string key, object message)
        {
            await Clients.All.SendAsync(key, message);
        }
    }
}
