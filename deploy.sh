#!/usr/bin/env bash
# DevToolKit · macOS/Linux 1-click deploy helper
set -e

echo "==================================================="
echo " DevToolKit · Vercel 1-click deploy helper"
echo "==================================================="

command -v node >/dev/null 2>&1 || { echo "[X] Node.js 미설치. https://nodejs.org 에서 LTS 설치 후 재실행."; exit 1; }
command -v git  >/dev/null 2>&1 || { echo "[X] Git 미설치. https://git-scm.com 에서 설치 후 재실행."; exit 1; }

cd "$(dirname "$0")"

if [ ! -d ".git" ]; then
  echo "[1/3] Git 저장소 초기화..."
  git init -b main
  git add .
  git -c commit.gpgsign=false commit -m "feat: initial DevToolKit"
else
  echo "[1/3] 변경사항 커밋..."
  git add .
  git -c commit.gpgsign=false commit -m "chore: update" 2>/dev/null || true
fi

echo
echo "[2/3] Vercel CLI 준비..."
npx --yes vercel@latest --version

echo
echo "[3/3] Vercel 배포 시작 (처음이면 브라우저 로그인 화면이 열립니다)..."
npx --yes vercel@latest --prod --yes

echo
echo "==================================================="
echo " 완료! 위 URL 이 라이브 사이트입니다."
echo "==================================================="
