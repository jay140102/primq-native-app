# Enable Windows Long Paths
# This script must be run as Administrator

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator" -ForegroundColor Red
    Write-Host ""
    Write-Host "To run as Administrator:" -ForegroundColor Yellow
    Write-Host "1. Right-click on PowerShell" -ForegroundColor Yellow
    Write-Host "2. Select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host "3. Navigate to this directory: cd '$PSScriptRoot'" -ForegroundColor Yellow
    Write-Host "4. Run: .\enable-long-paths.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "Enabling Windows Long Paths..." -ForegroundColor Cyan

try {
    # Enable long paths in registry
    New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
                     -Name "LongPathsEnabled" `
                     -Value 1 `
                     -PropertyType DWORD `
                     -Force | Out-Null
    
    Write-Host "SUCCESS: Long paths have been enabled!" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: You must restart your computer for this change to take effect." -ForegroundColor Yellow
    Write-Host ""
    
    $restart = Read-Host "Would you like to restart now? (y/n)"
    if ($restart -eq 'y' -or $restart -eq 'Y') {
        Write-Host "Restarting in 10 seconds... (Press Ctrl+C to cancel)" -ForegroundColor Yellow
        Start-Sleep -Seconds 10
        Restart-Computer -Force
    } else {
        Write-Host "Please restart your computer manually when ready." -ForegroundColor Yellow
    }
} catch {
    Write-Host "ERROR: Failed to enable long paths" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
