using DevOpsAIMonitor.Api.Data;
using DevOpsAIMonitor.Api.Entities;
using DevOpsAIMonitor.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
        {
            if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri))
                return false;

            return uri.IsLoopback;
        })
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "SuperSecretKey12345"))
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.EnsureCreated();

    var adminUser = db.Users.FirstOrDefault(u => u.Username == "admin");
    if (adminUser == null)
    {
        db.Users.Add(new User
        {
            Username = "admin",
            FirstName = "Admin",
            LastName = "User",
            Email = "admin@example.com",
            CompanyName = "AdminCorp",
            PhoneNumber = "+10000000000",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin"),
            Role = "Administrator"
        });
        db.SaveChanges();
    }
    else if (string.IsNullOrWhiteSpace(adminUser.Role) || !adminUser.Role.Equals("Administrator", StringComparison.OrdinalIgnoreCase))
    {
        adminUser.Role = "Administrator";
        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowLocalhost");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
