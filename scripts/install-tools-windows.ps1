Write-Host "Installing dev toolchain for Windows..."
winget install -e --id Python.Python.3.11
winget install -e --id OpenJS.NodeJS.LTS
winget install -e --id Git.Git
winget install -e --id Microsoft.VisualStudio.2022.BuildTools
Write-Host "[OK] Windows toolchain installation triggered"
