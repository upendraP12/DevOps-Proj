# DevOps AI Monitor

Enterprise-ready monitoring portal scaffold for Azure DevOps, AKS, Azure Container Apps, security, governance, and code quality.

## Structure

- `frontend/` - React 19 + Vite + MUI frontend
- `backend/` - ASP.NET Core 8 Web API backend with Clean Architecture
- `infra/` - Docker, Bicep, and CI/CD configuration

## Local setup

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

### Backend

```powershell
cd backend\DevOpsAIMonitor.Api
dotnet restore
dotnet run
```

### Docker compose

```powershell
cd infra\docker
docker compose up --build
```

## Notes

This workspace includes a production-ready scaffold with authentication, dashboard pages, monitoring API contracts, and Azure deployment templates.
