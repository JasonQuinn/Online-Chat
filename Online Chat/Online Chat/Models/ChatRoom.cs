using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

namespace Online_Chat.Models
{
    public class ChatRoomContext : DbContext
    {
        public ChatRoomContext()
            : base("DefaultConnection")
        {

        }

        public DbSet<ChatRoom> ChatRooms { get; set; }
    }

    [Table("ChatRoom")]
    [Serializable]
    public class ChatRoom
    {
        [Key]
        public Guid ChatGuid { get; set; }
        public virtual List<Message> Messages { get; set; }
    }
}