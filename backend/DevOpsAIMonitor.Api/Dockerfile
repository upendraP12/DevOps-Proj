FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["backend/DevOpsAIMonitor.Api/DevOpsAIMonitor.Api.csproj", "backend/DevOpsAIMonitor.Api/"]
RUN dotnet restore "backend/DevOpsAIMonitor.Api/DevOpsAIMonitor.Api.csproj"
COPY . .
WORKDIR "/src/backend/DevOpsAIMonitor.Api"
RUN dotnet build "DevOpsAIMonitor.Api.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "DevOpsAIMonitor.Api.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DevOpsAIMonitor.Api.dll"]
