using EnqueteSignalr.Models;
using Microsoft.AspNetCore.SignalR;

namespace EnqueteSignalr.Hubs
{
    public class VoteHub : Hub
    {
        public async Task BroadcastVoteUpdate(int pollId, List<Option> options)
        {
            await Clients.All.SendAsync("ReceiveVoteUpdate", pollId, options);
        }
    }
}
