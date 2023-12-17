using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using WarehelperAPI.Data;
using static System.Net.Mime.MediaTypeNames;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<MoltDbContext>(options =>
	options.UseMySQL("Server = localhost; Database = ispdb; User Id = root; Password = test;"));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

// CORS configuration
app.UseCors(builder =>
{
	builder.WithOrigins("https://localhost:5173")
		   .AllowAnyMethod()
		   .AllowAnyHeader()
		   .AllowCredentials();
});

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();