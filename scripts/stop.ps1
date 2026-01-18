if (Test-Path "server.pid") {
  $pid = Get-Content "server.pid"
  try { Stop-Process -Id $pid -Force } catch {}
  Remove-Item "server.pid" -Force
}
docker compose stop mongodb redis minio nats | Out-Null
Write-Output "Stopped server and dependencies"