param(
  [string]$ServerAddr = ":8081",
  [bool]$UseLocalDeps = $false,
  [string]$MongoUri = "mongodb://localhost:27017",
  [string]$RedisAddr = "localhost:6379",
  [string]$MinioEndpoint = "localhost:9000"
)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root\..
if ((Test-Path ".env.example") -and -not (Test-Path ".env.local")) { Copy-Item ".env.example" ".env.local" }
if (-not (Test-Path "data")) { New-Item -ItemType Directory -Path "data" | Out-Null }
$env:SERVER_ADDR = $ServerAddr
$env:MONGO_URI = $MongoUri
$env:MONGO_DB = "realdeal"
$env:REDIS_ADDR = $RedisAddr
$env:MINIO_ENDPOINT = $MinioEndpoint
$env:MINIO_ACCESS_KEY = "miniouser"
$env:MINIO_SECRET_KEY = "miniopass123"
$env:MINIO_BUCKET = "media"
if (-not $UseLocalDeps) { docker compose up -d mongodb redis minio nats | Out-Null }
function Test-Port($hostname, $portno) {
  try { $c = New-Object Net.Sockets.TcpClient($hostname, [int]$portno); $c.Close(); return $true } catch { return $false }
}
if (-not $UseLocalDeps) {
  for ($i=0; $i -lt 60; $i++) {
    if (Test-Port "localhost" 27017 -and Test-Port "localhost" 6379 -and Test-Port "localhost" 9000 -and Test-Port "localhost" 4222) { break }
    Start-Sleep -Milliseconds 500
  }
}
go run .\cmd\seed | Out-Null
$argsList = @(
  "-NoProfile",
  "-ExecutionPolicy","Bypass",
  "-Command","& { go run ./cmd/server }"
)
$p = Start-Process -FilePath powershell -ArgumentList $argsList -WorkingDirectory (Get-Location) -PassThru
Set-Content -Path "server.pid" -Value $p.Id
Write-Output "Server PID=$($p.Id)"
Write-Output "Explore: http://localhost$ServerAddr/api/explore"