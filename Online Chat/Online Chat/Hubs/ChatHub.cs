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

        public async Task NewChatMessage(Guid group, string messageText)
        {
            if (string.IsNullOrWhiteSpace(messageText))
            {
                return;
            }

            await Groups.Add(Context.ConnectionId, group.ToString());
            var owner = group.ToString();
            var message = new Message { User = Context.User.Identity.Name, Text = messageText.Trim(), Time = DateTime.Now };
            var chatRoom = Messages.GetOrAdd(owner, new ChatRoom());
            chatRoom.Messages.Add(message);
            await Clients.Group(owner).addMessage(message);
        }

        public IEnumerable<Message> GetAllMessages(Guid group)
        {
            Groups.Add(Context.ConnectionId, group.ToString());
            ChatRoom chatRoom;
            return Messages.TryGetValue(group.ToString(), out chatRoom) ? chatRoom.Messages : null;
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