using DevOpsAIMonitor.Api.Models;

namespace DevOpsAIMonitor.Api.Services
{
    public interface IUserService
    {
        Task<AuthResult> RegisterAsync(RegisterRequest request);
        Task<AuthResult> LoginAsync(LoginRequest request);
    }
}
