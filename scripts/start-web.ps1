param(
  [string]$ApiBase = "http://localhost:8081",
  [int]$Port = 3000
)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$root\..\web"
function Has-Cmd($name){ try { Get-Command $name -ErrorAction Stop | Out-Null; return $true } catch { return $false } }
if (-not (Has-Cmd "node") -or -not (Has-Cmd "npm")) {
  $defaultNodeDirs = @("C:\Program Files\nodejs", "$env:LOCALAPPDATA\nodejs")
  foreach ($dir in $defaultNodeDirs) {
    if (Test-Path (Join-Path $dir "node.exe")) { $env:Path = "$dir;$env:Path"; break }
  }
}
if (-not (Has-Cmd "node") -or -not (Has-Cmd "npm")) { Write-Output "未检测到 Node/npm，请安装 Node.js 18+：https://nodejs.org/en/download"; exit 1 }
$env:NEXT_PUBLIC_API_BASE = $ApiBase
if (-not (Test-Path "node_modules")) { cmd /c npm install }
Write-Output "启动前端开发服务器：PORT=$Port API_BASE=$ApiBase"
$env:PORT = "$Port"
cmd /c npm run dev