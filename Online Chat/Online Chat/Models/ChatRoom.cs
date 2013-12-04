using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Online_Chat.Models
{
    public class ChatRoomContext : DbContext
    {
        public ChatRoomContext()
            : base("DefaultConnection")
        {

        }

        public DbSet<ChatRoom> ChatRooms { get; set; }
        public DbSet<Message> Messages { get; set; }
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