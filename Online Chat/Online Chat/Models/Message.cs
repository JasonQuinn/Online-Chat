using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Online_Chat.Models
{
    [Table("Message")]
    [Serializable]
    public class Message
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int MessageId { get; set; }
        public string User { get; set; }
        public string Text { get; set; }
        public DateTime Time { get; set; }
    }
}