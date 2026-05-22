# DevToolKit

[![Live](https://img.shields.io/badge/Live-devkit--three.vercel.app-36e2c1?style=flat-square&logo=vercel&logoColor=white)](https://devkit-three.vercel.app/)
[![GitHub stars](https://img.shields.io/github/stars/TaeheeLim/devkit?style=flat-square&color=6c8cff)](https://github.com/TaeheeLim/devkit/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/taeheelim)

> 개발자가 매일 쓰는 7가지 도구를 한 페이지에. 회원가입 없음 · 100% 브라우저 동작 · 무료.

JSON Formatter · Base64 · URL Encode · JWT Decoder · UUID v4 · SHA-1/256/512 Hash · Unix Timestamp

**🌐 Live: <https://devkit-three.vercel.app/>**

---

## 1. 프로젝트 구조

```
.
├── index.html        # 메인 페이지 (모든 도구)
├── styles.css        # 디자인 시스템
├── app.js            # 클라이언트 로직 (i18n + 7가지 도구)
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── privacy.html      # 개인정보 처리방침
├── terms.html        # 이용약관
├── 404.html
├── vercel.json       # Vercel 배포 설정 (보안 헤더 + 캐시)
├── package.json      # 로컬 개발 서버용
└── .gitignore
```

빌드 단계가 없는 순수 정적 사이트입니다. **서버 비용 0원**.

---

## 2. 로컬 개발

```bash
npm run dev
# → http://localhost:5173
```

또는 Python:

```bash
python3 -m http.server 5173
```

---

## 3. 배포 (3분 안에 끝남)

### Option A — Vercel (추천)

1. GitHub에 새 리포지토리 만들기: `devtoolkit`
2. 이 폴더에서:
   ```bash
   git init
   git add .
   git commit -m "feat: initial DevToolKit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/devtoolkit.git
   git push -u origin main
   ```
3. https://vercel.com → "Add New… → Project" → GitHub 리포 선택
4. Framework Preset: **Other** (그대로 두면 됨), Build Command/Output: **비워두기**
5. **Deploy** 클릭 → 약 30초 뒤 `https://devtoolkit-xxxx.vercel.app` 라이브
6. Settings → Domains 에서 커스텀 도메인 연결 (선택)

### Option B — GitHub Pages

1. 위 1~2단계까지 동일
2. GitHub 리포 → Settings → Pages
3. Source: **Deploy from a branch** → Branch: `main` / `(root)` 선택
4. 약 1분 뒤 `https://<your-username>.github.io/devtoolkit/` 라이브

### Option C — Cloudflare Pages

1. 위 1~2단계까지 동일
2. https://dash.cloudflare.com → Pages → Create → GitHub 연결
3. Build command: (없음), Output directory: `/`
4. Save and Deploy

---

## 4. 수익화 단계 (A to Z)

이 사이트는 다음 4가지 흐름으로 수익화하도록 설계되어 있습니다.

### 4-1. Google AdSense (메인)

1. 배포 후 사이트가 정상 동작하는지 확인
2. https://adsense.google.com 가입 → 사이트 추가 → 본인 도메인 입력
3. 승인 코드 (`<script async ...>...`)를 `index.html`의 **AdSense 주석 블록**에 붙여넣고 주석 해제
4. 승인 후 (보통 1~2주), `index.html`의 3개 `ad-placeholder` 영역에 광고 단위를 삽입
5. **승인 팁**: 콘텐츠 부족으로 거절되는 경우가 많으므로, `privacy.html` 과 `terms.html` 가 살아있는 상태로 유지하고, 트래픽이 조금 쌓인 뒤 신청

### 4-2. 검색 트래픽 확보 (SEO)

- `index.html`에 JSON-LD, Open Graph, Twitter Card 메타 이미 적용
- 배포 후 https://search.google.com/search-console 에서 sitemap 제출
  ```
  https://<your-domain>/sitemap.xml
  ```
- 노리는 핵심 키워드 (각각 월 검색량 수만 회):
  - "json formatter", "json 포매터"
  - "base64 encode", "base64 디코더"
  - "jwt decoder", "jwt 디코더"
  - "uuid generator", "uuid 생성기"
  - "unix timestamp converter", "유닉스 타임스탬프 변환기"

### 4-3. 어필리에이트 (보조)

- 개발자 대상이므로 Vercel/Cloudflare 추천 링크, 도메인 등록 어필리에이트, 책 어필리에이트가 잘 맞음
- 푸터 또는 별도 "Recommended" 섹션에 자연스럽게 삽입

### 4-4. 향후 프리미엄 기능 (확장)

- 대용량 JSON 처리 (10MB+)
- 팀 워크스페이스 (저장된 토큰 공유)
- API 키 발급 (CI에서 호출)
- Stripe로 월 $5 구독

---

## 5. 운영 체크리스트

- [ ] 도메인 구입 (예: Namecheap, Cloudflare Registrar — 연 $10 내외)
- [ ] Vercel 또는 Cloudflare Pages 배포
- [ ] Google Search Console 등록 + sitemap 제출
- [ ] Google Analytics 4 또는 Vercel Analytics 부착
- [ ] AdSense 신청
- [ ] Reddit r/webdev, dev.to, 디스콰이엇, GeekNews에 런칭 글 작성
- [ ] 한 달 뒤 검색어 분석해서 도구 추가 (Color picker, Lorem ipsum, Cron 표현식 등)

---

## 6. 라이선스

MIT
 
