using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Online_Chat.Models;

namespace Online_Chat.Providers
{
    public class ChatRoomProvider
    {
        public async Task<ChatRoom> GetChatRoom(Guid chatGuid)
        {
            using (var db = new ChatRoomContext())
            {
                var chatRoom = await db.ChatRooms.Include(u => u.Messages).FirstOrDefaultAsync(u => u.ChatGuid == chatGuid);
                return chatRoom;
            }
        }

        public async Task<ChatRoom> CreateChatRoom(Guid chatGuid)
        {
            using (var db = new ChatRoomContext())
            {
                var chatRoom = new ChatRoom { ChatGuid = chatGuid };
                db.ChatRooms.Add(chatRoom);
                await db.SaveChangesAsync();
                return chatRoom;
            }
        }

        public async Task<ChatRoom> GetOrAddChatRoom(Guid chatGuid)
        {
            var chatRoom = await GetChatRoom(chatGuid) ?? await CreateChatRoom(chatGuid);
            return chatRoom;
        }

        public async Task<bool> AddMessage(ChatRoom chatRoom, Message message)
        {
            using (var db = new ChatRoomContext())
            {
                var dbChatRoom = await db.ChatRooms.FirstOrDefaultAsync(u => u.ChatGuid == chatRoom.ChatGuid);
                dbChatRoom.Messages.Add(message);
                return await db.SaveChangesAsync() > 0;
            }
        }
    }
}