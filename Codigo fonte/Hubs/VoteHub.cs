using RepiperSignalR.Models;
using Microsoft.AspNetCore.SignalR;

namespace RepiperSignalR.Hubs
{
    public class VoteHub : Hub
    {
        public async Task BroadcastVoteUpdate(int pollId, List<Option> options)
        {
            await Clients.All.SendAsync("ReceiveVoteUpdate", pollId, options);
        }
    }
}
