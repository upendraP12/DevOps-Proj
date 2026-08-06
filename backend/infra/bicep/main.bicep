param location string = resourceGroup().location
param appServicePlanName string = 'devops-ai-monitor-plan'
param webAppName string = 'devops-ai-monitor-api'
param sqlServerName string = 'devopsaimonitorsql'
param sqlDatabaseName string = 'devopsaimonitordb'
param adminLogin string = 'sqladmin'
param adminPassword string

resource appServicePlan 'Microsoft.Web/serverfarms@2024-06-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: 'P1v2'
    tier: 'PremiumV2'
  }
  kind: 'app'
}

resource webApp 'Microsoft.Web/sites@2024-06-01' = {
  name: webAppName
  location: location
  kind: 'app'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      appSettings: [
        { name: 'ASPNETCORE_ENVIRONMENT'; value: 'Production' }
      ]
    }
  }
}

resource sqlServer 'Microsoft.Sql/servers@2024-06-01-preview' = {
  name: sqlServerName
  location: location
  properties: {
    administratorLogin: adminLogin
    administratorLoginPassword: adminPassword
    version: '12.0'
  }
}

resource sqlDatabase 'Microsoft.Sql/servers/databases@2024-06-01-preview' = {
  parent: sqlServer
  name: sqlDatabaseName
  sku: {
    name: 'GP_S_Gen5_2'
  }
}
