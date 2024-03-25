using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroBills.Server.DTOs;
using RetroBills.Server.Models;

namespace RetroBills.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        //This code should be outside this file. To make this controller not a "fat controller"
        private readonly RetroBillsContext _retroBillsContext;
        public TransactionController(RetroBillsContext centralHubContext)
        {
            _retroBillsContext = centralHubContext;
        }

        // Get transaction by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionById(int id)
        {
            var transaction = await _retroBillsContext.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound("Transaction not found");
            }

            return Ok(transaction);
        }

        //Get all transactions for a specific user
        [HttpGet("user/{userID}")]
        public async Task<IActionResult> GetTransactionsForUser(int userID)
        {
            var transactions = await _retroBillsContext.Transactions.Where(t => t.UserId == userID).ToListAsync();
            return Ok(transactions);
        }

        //Get all transactions for a specific account
        [HttpGet("account/{accountID}")]
        public async Task<IActionResult> GetTransactionsForAccount(int accountID)
        {
            var transactions = await _retroBillsContext.Transactions.Where(t => t.AccountId == accountID).ToListAsync();
            return Ok(transactions);
        }

        //Create a new transaction
        [HttpPost]
        public async Task<IActionResult> CreateTransaction(TransactionDTO transactionDTO)
        {
            var userAccount = await _retroBillsContext.UserAccounts.FirstOrDefaultAsync(ua => ua.UserId == transactionDTO.UserID && ua.AccountId == transactionDTO.AccountID);
            if (userAccount == null)
                return NotFound("User is not associated with the specific account");
            var transaction = new Transaction
            {
                UserId = transactionDTO.UserID,
                AccountId = transactionDTO.AccountID,
                TransactionType = transactionDTO.TransactionType,
                CategoryName = transactionDTO.CategoryName,
                Amount = transactionDTO.Amount,
                TransactionDateTime = DateTime.UtcNow,
                TransactionDescription = transactionDTO.TransactionDescription,

            };

            _retroBillsContext.Transactions.Add(transaction);
            await _retroBillsContext.SaveChangesAsync();
            return Ok(transaction);

        }

        //Update an existing transaction
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransactionForUser(int id, TransactionDTO transactionDTO)
        {
            //check if transaction is in the database
            var transaction = await _retroBillsContext.Transactions.FindAsync(id);
            if (transaction == null)
                return NotFound("Transaction not found");
            //Check if user is authorized to update account
            var userAccount = await _retroBillsContext.UserAccounts.FirstOrDefaultAsync(ua => ua.UserId == transactionDTO.UserID && ua.AccountId == transactionDTO.AccountID);
            if (userAccount == null)
                return NotFound("User is not associated with the specific account");
            //Update transaction
            transaction.UserId = transactionDTO.UserID;
            transaction.AccountId = transactionDTO.AccountID;
            transaction.TransactionType = transactionDTO.TransactionType;
            transaction.CategoryName = transactionDTO.CategoryName;
            transaction.Amount = transactionDTO.Amount;
            transaction.TransactionDateTime = DateTime.UtcNow;
            transaction.TransactionDescription = transactionDTO.TransactionDescription;

            await _retroBillsContext.SaveChangesAsync();
            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransactionForUser(int id)
        {
            var transaction = await _retroBillsContext.Transactions.FindAsync(id);
            if (transaction == null)
                return NotFound("Transaction not found");
            _retroBillsContext.Transactions.Remove(transaction);
            await _retroBillsContext.SaveChangesAsync();
            return NoContent();
        }

    }
}
