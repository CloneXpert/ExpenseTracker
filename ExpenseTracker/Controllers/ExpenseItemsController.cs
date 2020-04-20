﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Data;
using ExpenseTracker.Model;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseItemsController : ControllerBase
    {
        private readonly ExpenseTrackerContext _context;

        public ExpenseItemsController(ExpenseTrackerContext context)
        {
            _context = context;
        }

        // GET: api/ExpenseItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseItem>>> GetExpenseItem()
        {
            return await _context.ExpenseItem.ToListAsync();
        }

        // GET: api/ExpenseItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseItem>> GetExpenseItem(int id)
        {
            var expenseItem = await _context.ExpenseItem.FindAsync(id);

            if (expenseItem == null)
            {
                return NotFound();
            }

            return expenseItem;
        }

        // PUT: api/ExpenseItems/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpenseItem(int id, ExpenseItem expenseItem)
        {
            if (id != expenseItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(expenseItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ExpenseItems
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ExpenseItem>> PostExpenseItem(ExpenseItem expenseItem)
        {
            _context.ExpenseItem.Add(expenseItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpenseItem", new { id = expenseItem.Id }, expenseItem);
        }

        // DELETE: api/ExpenseItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ExpenseItem>> DeleteExpenseItem(int id)
        {
            var expenseItem = await _context.ExpenseItem.FindAsync(id);
            if (expenseItem == null)
            {
                return NotFound();
            }

            _context.ExpenseItem.Remove(expenseItem);
            await _context.SaveChangesAsync();

            return expenseItem;
        }

        private bool ExpenseItemExists(int id)
        {
            return _context.ExpenseItem.Any(e => e.Id == id);
        }
    }
}
