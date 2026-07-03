@echo off
echo ====================================
echo  仲伟钰 | 个人作品集
echo ====================================
echo.
echo 正在启动本地服务器...
echo 请访问 http://localhost:3000
echo 按 Ctrl+C 停止服务器
echo.
npx --yes serve . --single -l 3000
pause
