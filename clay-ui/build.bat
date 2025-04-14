@echo off

set raylibpath=C:\raylib\raylib\src

gcc main.c -o InteliCesta.exe -Wall -Wextra -L%raylibpath% -I%raylibpath% -l raylib -l Winmm -l gdi32

if %errorlevel% equ 0 (
  InteliCesta.exe
)
