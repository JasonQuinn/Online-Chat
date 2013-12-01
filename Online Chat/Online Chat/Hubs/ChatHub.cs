using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace Online_Chat.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly ConcurrentDictionary<string, ChatRoom> Messages = new ConcurrentDictionary<string, ChatRoom>(StringComparer.OrdinalIgnoreCase);

        public async Task NewChatMessage(string messageText)
        {
            if (string.IsNullOrWhiteSpace(messageText))
            {
                return;
            }
            var owner = "owner";
            var message = new Message { User = Context.User.Identity.Name, Text = messageText.Trim(), Time = DateTime.Now };
            Messages.GetOrAdd(owner, new ChatRoom());
            Messages[owner].Messages.Add(message);
            await Clients.All.addMessage(message);
        }

        public IEnumerable<Message> GetAllMessages()
        {
            var owner = "owner";
            ChatRoom chatRoom;
            return Messages.TryGetValue(owner, out chatRoom) ? Messages[owner].Messages : null;
        }
    }

    [Serializable]
    public class Message
    {
        public string User { get; set; }
        public string Text { get; set; }
        public DateTime Time { get; set; }
    }

    [Serializable]
    public class ChatRoom
    {
        public List<Message> Messages { get; set; }

        public ChatRoom()
        {
            Messages = new List<Message>();
        }
    }
}