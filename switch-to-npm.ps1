# Switch to npm (Alternative Solution)
# This script helps you switch from pnpm to npm to avoid path length issues

Write-Host "Switching from pnpm to npm..." -ForegroundColor Cyan
Write-Host ""

# Backup pnpm files
Write-Host "1. Backing up pnpm configuration..." -ForegroundColor Yellow
if (Test-Path "pnpm-lock.yaml") {
    Copy-Item "pnpm-lock.yaml" "pnpm-lock.yaml.backup"
    Write-Host "   ✓ Backed up pnpm-lock.yaml" -ForegroundColor Green
}
if (Test-Path ".npmrc") {
    Copy-Item ".npmrc" ".npmrc.backup"
    Write-Host "   ✓ Backed up .npmrc" -ForegroundColor Green
}

# Remove pnpm files
Write-Host ""
Write-Host "2. Removing pnpm files..." -ForegroundColor Yellow
if (Test-Path "pnpm-lock.yaml") {
    Remove-Item "pnpm-lock.yaml" -Force
    Write-Host "   ✓ Removed pnpm-lock.yaml" -ForegroundColor Green
}
if (Test-Path ".npmrc") {
    Remove-Item ".npmrc" -Force
    Write-Host "   ✓ Removed .npmrc" -ForegroundColor Green
}

# Update package.json to remove pnpm-specific settings
Write-Host ""
Write-Host "3. Updating package.json..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
if ($packageJson.PSObject.Properties.Name -contains "packageManager") {
    $packageJson.PSObject.Properties.Remove("packageManager")
    $packageJson | ConvertTo-Json -Depth 100 | Set-Content "package.json"
    Write-Host "   ✓ Removed packageManager field" -ForegroundColor Green
}

Write-Host ""
Write-Host "4. Installing dependencies with npm..." -ForegroundColor Yellow
Write-Host "   This may take a few minutes..." -ForegroundColor Gray
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS! Switched to npm" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run:" -ForegroundColor Cyan
    Write-Host "  npm run mobile" -ForegroundColor White
    Write-Host ""
    Write-Host "Or for Android specifically:" -ForegroundColor Cyan
    Write-Host "  cd apps\mobile" -ForegroundColor White
    Write-Host "  npm run android" -ForegroundColor White
}
else {
    Write-Host ""
    Write-Host "ERROR: npm install failed" -ForegroundColor Red
    Write-Host "Restoring pnpm files..." -ForegroundColor Yellow
    
    if (Test-Path "pnpm-lock.yaml.backup") {
        Copy-Item "pnpm-lock.yaml.backup" "pnpm-lock.yaml" -Force
    }
    if (Test-Path ".npmrc.backup") {
        Copy-Item ".npmrc.backup" ".npmrc" -Force
    }
}
