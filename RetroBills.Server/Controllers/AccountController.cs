using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroBills.Server.DTOs;
using RetroBills.Server.Models;

namespace RetroBills.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        //This code should be outside this file. To make this controller not a "fat controller"
        private readonly RetroBillsContext _retroBillsContext;
        public AccountController(RetroBillsContext retroBillsContext)
        {
            _retroBillsContext = retroBillsContext;
        }

        //Getter for all accounts
        [HttpGet]
        public async Task<IActionResult> GetAllAccounts()
        {
            var account = await _retroBillsContext.Accounts.ToListAsync();
            return Ok(account);
        }

        //Getter for a specific account
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccount(int id)
        {
            var account = await _retroBillsContext.Accounts.FindAsync(id);
            if (account == null)
                return NotFound();

            return Ok(account);

        }

        //Getter for all accounts tied to a user
        [HttpGet("{userID}/accounts")]
        public async Task<IActionResult> GetAllAccountsUser(int userID)
        {
            var userAccounts = await _retroBillsContext.UserAccounts.Where(ua => ua.UserId == userID).Include(ua => ua.Account).Select(ua => ua.Account).ToListAsync();
            if (userAccounts == null) 
                return NotFound("User is not tied to an account");
            return Ok(userAccounts);
        }
        
        //Create an account for a user
        [HttpPost]
        public async Task<IActionResult> CreateAccountForUser(int userID, AccountDTO accountDTO)
        {
            //Check if user exists
            var user = await _retroBillsContext.Users.FindAsync(userID);
            if (user == null)
                return NotFound("User not found");
            //Create a new account
            var account = new Account
            {
                AccountType = accountDTO.AccountType,
                Balance = 0
            };

            //Add the account to the context
            _retroBillsContext.Accounts.Add(account);
            await _retroBillsContext.SaveChangesAsync();

            //Create a record in the User_Account join table
            var userAccount = new UserAccount
            {
                UserId = userID,
                AccountId = account.AccountId,
            };
            _retroBillsContext.UserAccounts.Add(userAccount);
            await _retroBillsContext.SaveChangesAsync();

            return Ok(account);

        }

        //Delete an account for a user
        [HttpDelete("{userID}/accounts/{accountID}")]
        public async Task<IActionResult> DeleteAccountForUser(int userID, int accountID)
        {
            var userAccount = await _retroBillsContext.UserAccounts.FirstOrDefaultAsync(ua => ua.UserId == userID && ua.AccountId == accountID);
            if (userAccount == null)
                return NotFound("User account not found");
            //Remove the user's account
            _retroBillsContext.UserAccounts.Remove(userAccount);
            await _retroBillsContext.SaveChangesAsync();
            return NoContent();

        }

        //Update accountype for a user
        [HttpPut("{userID}/accounts/{accountID}")]
        public async Task<IActionResult> UpdateAccountForUser(int userID, int accountID, AccountDTO accountDTO)
        {
            var userAccount = await _retroBillsContext.UserAccounts.FirstOrDefaultAsync(ua => ua.UserId == userID && ua.AccountId == accountID);
            if (userAccount == null)
                return NotFound();

            //Update account properties
            var account = await _retroBillsContext.Accounts.FindAsync(accountID);
            if (account == null)
                return NotFound("Account not found");
            account.AccountType = accountDTO.AccountType;
            await _retroBillsContext.SaveChangesAsync();
            return NoContent();


        }

        //Get Account Balance
        [HttpGet("{userID}/accounts/{accountID}/balance")]
        public async Task<IActionResult> GetAccountBalance(int userID, int accountID)
        {
            var account = await _retroBillsContext.Accounts.FindAsync(accountID);
            if (account == null)
                return NotFound("Account not found");

            return Ok(account.Balance);
        }


        // Update account balance for a user
        [HttpPut("{userID}/accounts/{accountID}/balance")]
        public async Task<IActionResult> UpdateAccountBalanceForUser(int userID, int accountID, decimal balance)
        {
            var userAccount = await _retroBillsContext.UserAccounts.FirstOrDefaultAsync(ua => ua.UserId == userID && ua.AccountId == accountID);
            if (userAccount == null)
                return NotFound("User account not found");

            // Update account balance
            var account = await _retroBillsContext.Accounts.FindAsync(accountID);
            if (account == null)
                return NotFound("Account not found");

            account.Balance = balance;
            await _retroBillsContext.SaveChangesAsync();

            // Return updated balance value with status code 200 (OK)
            return Ok(balance);
        }
    }
}
