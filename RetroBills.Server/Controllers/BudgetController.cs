using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using RetroBills.Server.DTOs;
using RetroBills.Server.Models;

namespace RetroBills.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        //This code should be outside this file. To make this controller not a "fat controller"
        private readonly RetroBillsContext _retroBillsContext;
        public BudgetController(RetroBillsContext retroBillsContext)
        {
            _retroBillsContext = retroBillsContext;
        }

        //Getter for all budgets
        [HttpGet]
        public async Task<IActionResult> GetAllBudgets()
        {
            var budgets = await _retroBillsContext.Budgets.ToListAsync();
            return Ok(budgets);
        }

        //Getter for budget for an account
        [HttpGet("{accountID}")]
        public async Task<IActionResult> GetAllBudgetsForAccount(int accountID)
        {
            var budgets = await _retroBillsContext.Budgets.FindAsync(accountID);
            if (budgets == null)
                return NotFound("There are no budgets set for this account");
            return Ok(budgets);
        }


        //Create a budget
        [HttpPost("{accountId}")]
        public async Task<IActionResult> PostBudgetForAccount(int accountID, Budget budget)
        {
            var account = await _retroBillsContext.Accounts.FindAsync(accountID);
            if (account == null)
            {
                return NotFound("Account not found");
            }

            budget.AccountId = accountID; 
            _retroBillsContext.Budgets.Add(budget);
            await _retroBillsContext.SaveChangesAsync();

            return Ok();
        }


        //Edit a budget
        [HttpPut("{accountId}")]
        public async Task<IActionResult> EditBudgetForAccount(int accountID, int budgetID, BudgetDTO budgetDTO)
        {
            var existingBudget = await _retroBillsContext.Budgets.FindAsync(budgetID);
            if (existingBudget == null)
                return NotFound("No budget found");
            //Create a new account
            var budget = new Budget
            {
                BudgetAmount = budgetDTO.BudgetAmount
            };

            //Add the account to the context
            _retroBillsContext.Budgets.Add(budget);
            await _retroBillsContext.SaveChangesAsync();
            return Ok();

           
        }

        //Delete a budget
        [HttpDelete]
        public async Task<IActionResult> DeleteBudgetForAccount(int accountID)
        {
            var budgetToDelete = await _retroBillsContext.Budgets.FirstOrDefaultAsync(b => b.AccountId == accountID);
            if (budgetToDelete == null)
            {
                return NotFound($"No budgets found for this account");
            }
            //Remove the user's budget
            _retroBillsContext.Budgets.Remove(budgetToDelete);
            await _retroBillsContext.SaveChangesAsync();
            return NoContent();
        }

    }
}
