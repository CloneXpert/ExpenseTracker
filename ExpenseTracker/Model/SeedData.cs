using ExpenseTracker.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ExpenseTracker.Model
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var ctx = new ExpenseTrackerContext(serviceProvider.GetRequiredService<DbContextOptions<ExpenseTrackerContext>>()))
            {
                if (ctx.ExpenseItem.Any())
                {
                    return;
                }

                ctx.ExpenseItem.AddRange(
                    new ExpenseItem
                    {
                        Amount = 100,
                        Currency = "CHF",
                        Recipient = "Digitec",
                        TransactionDate = DateTime.Today.AddDays(-5),
                        Type = ExpenseItemType.Electronics,
                    },
                    new ExpenseItem
                    {
                        Amount = 25,
                        Currency = "CHF",
                        Recipient = "Spiga",
                        TransactionDate = DateTime.Today.AddDays(-2),
                        Type = ExpenseItemType.Food,
                    },
                    new ExpenseItem
                    {
                        Amount = 20,
                        Currency = "EUR",
                        Recipient = "",
                        TransactionDate = DateTime.Today.AddDays(-5),
                        Type = ExpenseItemType.Electronics,
                    });

                ctx.SaveChanges();
            }
        }
    }

}