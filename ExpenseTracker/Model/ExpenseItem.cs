using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenseTracker.Model
{
    public class ExpenseItem
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime TransactionDate { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public string Recipient { get; set; }
        [Required]
        public string Currency { get; set; }
        [Required]
        [EnumDataType(typeof(ExpenseItemType))]
        public ExpenseItemType Type { get; set; }
    }
}
