using Microsoft.EntityFrameworkCore;
using RetroBills.Server.Models; // Adjust to match your namespace

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        builder.WithOrigins("http://localhost:4200", "http://127.0.0.1:4200",
                            "https://localhost:4200", "https://127.0.0.1:4200") // Include HTTPS origins 
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});
// Added code to use the Database. Connection string is in appsettings.json
builder.Services.AddDbContext<RetroBillsContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseDefaultFiles(); // If you want default 'index.html' lookup support
app.UseStaticFiles();  // To serve static files (CSS, JS etc.)

app.UseAuthorization();

app.UseCors("AllowSpecificOrigins"); // Enable CORS 

app.MapControllers();

app.MapFallbackToFile("/index.html"); // Assuming Angular setup

app.Run();
