using BCrypt.Net;
using DevOpsAIMonitor.Api.Data;
using DevOpsAIMonitor.Api.Entities;
using DevOpsAIMonitor.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DevOpsAIMonitor.Api.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public UserService(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public async Task<AuthResult> RegisterAsync(RegisterRequest request)
        {
            var existingEmail = await _dbContext.Users.AnyAsync(u => u.Email == request.Email);
            if (existingEmail)
            {
                return new AuthResult { Success = false, Errors = new[] { "Email is already registered" } };
            }

            var existingUsername = await _dbContext.Users.AnyAsync(u => u.Username == request.Username);
            if (existingUsername)
            {
                return new AuthResult { Success = false, Errors = new[] { "Username is already taken" } };
            }

            var user = new User
            {
                Username = request.Username,
                FirstName = request.FirstName,
                LastName = request.LastName,
                CompanyName = request.CompanyName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return new AuthResult { Success = true };
        }

        public async Task<AuthResult> LoginAsync(LoginRequest request)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return new AuthResult { Success = false, Errors = new[] { "Invalid credentials" } };
            }

            var token = GenerateJwtToken(user);
            return new AuthResult { Success = true, Token = token };
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrWhiteSpace(jwtKey) || jwtKey.Length < 32)
            {
                jwtKey = "SuperSecretKey12345SuperSecretKey12345SuperSecretKey12345";
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(claims: claims, expires: DateTime.UtcNow.AddHours(2), signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
