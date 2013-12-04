using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Online_Chat.Models;
using Online_Chat.Providers;

namespace Online_Chat.Hubs
{
    public class ChatHub : Hub
    {
        private static ChatRoomProvider _chatRoomProvider;

        public ChatHub()
        {
            _chatRoomProvider = new ChatRoomProvider();
        }

        public async Task NewChatMessage(Guid group, string messageText)
        {
            if (string.IsNullOrWhiteSpace(messageText))
            {
                return;
            }

            await Groups.Add(Context.ConnectionId, group.ToString());
            var owner = group.ToString();
            var message = new Message
            {
                User = Context.User.Identity.Name,
                Text = messageText.Trim(),
                Time = DateTime.Now
            };
            //var userMessage = UserMessage.Create(message, Context.User.Identity);
            await Clients.Group(owner).addMessage(message);

            var chatRoom = await _chatRoomProvider.GetOrAddChatRoom(group);
            await _chatRoomProvider.AddMessage(chatRoom, message);
        }

        public async Task<IEnumerable<Message>> GetAllMessages(Guid group)
        {
            await Groups.Add(Context.ConnectionId, group.ToString());
            var chatRoom = await _chatRoomProvider.GetChatRoom(group);

            var result = chatRoom != null
                ? chatRoom.Messages
                : null;
            return result;
        }
    }
}