FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ../../backend/DevOpsAIMonitor.Api/*.csproj ./
RUN dotnet restore
COPY ../../backend/DevOpsAIMonitor.Api/. ./
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish ./
ENTRYPOINT ["dotnet", "DevOpsAIMonitor.Api.dll"]
