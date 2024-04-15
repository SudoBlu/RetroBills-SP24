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
            var budgets = await _retroBillsContext.Budgets.FirstOrDefaultAsync(b => b.AccountId == accountID);
            if (budgets == null)
                return NotFound("There are no budgets set for this account");
            return Ok(budgets);
        }


        //Create a budget
        [HttpPost("{accountID}")]
        public async Task<IActionResult> CreateBudgetForAccount(int accountID, BudgetDTO budgetDTO)
        {
            var account = await _retroBillsContext.Accounts.FindAsync(accountID);
            if (account == null)
            {
                return NotFound("Account not found");
            }

            var budgetCheck = await _retroBillsContext.Budgets.FirstOrDefaultAsync(b => b.AccountId == accountID);
            if (budgetCheck != null)
            {
                return Conflict("Budget is already created for this account, try updating budget instead");
            }

            var budget = new Budget
            {
                AccountId = accountID,
                BudgetAmount = budgetDTO.BudgetAmount
            };

            _retroBillsContext.Budgets.Add(budget);
            await _retroBillsContext.SaveChangesAsync();

            return Ok();
        }


        //Edit a budget
        [HttpPut("{accountID}")]
        public async Task<IActionResult> EditBudgetForAccount(int accountID, BudgetDTO budgetDTO)
        {
            var existingBudget = await _retroBillsContext.Budgets.FirstOrDefaultAsync(b => b.AccountId==accountID);
            if (existingBudget == null)
                return NotFound("No budget found");
            
            existingBudget.BudgetAmount = budgetDTO.BudgetAmount;
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
