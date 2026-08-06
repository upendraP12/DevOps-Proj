# DevOps AI Monitor Backend

## Run locally

```powershell
cd backend/DevOpsAIMonitor.Api
dotnet restore
dotnet run
```

## Database migration

```powershell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Notes

- `AuthController` provides JWT-based login/register endpoints.
- `ApplicationDbContext` stores user accounts.
- `appsettings.json` is configured for local SQL Server.
