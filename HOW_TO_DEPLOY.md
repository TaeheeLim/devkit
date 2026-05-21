# 지금 바로 배포하기 (3가지 옵션)

코드/SEO/정책 페이지/보안 헤더 — 모두 준비 완료. 아래 셋 중 하나만 고르시면 됩니다.

---

## ⭐ 옵션 1. Vercel 1-클릭 (추천, 약 2분)

Windows 사용자는 그냥 더블 클릭:

```
deploy.bat
```

또는 직접 명령:

```cmd
cd C:\Users\nkia\Documents\Claude\Projects\make_profit
npx vercel --prod
```

처음 한 번 브라우저 로그인만 하면 끝. 약 30초 뒤 `https://devtoolkit-xxxx.vercel.app` 라이브.

---

## 옵션 2. Cloudflare Pages — 드래그&드롭 (계정만 있으면 60초)

1. https://dash.cloudflare.com → Workers & Pages → **Create application** → **Pages** → **Upload assets**
2. 프로젝트 이름 입력 (예: `devtoolkit`)
3. 이 폴더에 있는 **`devtoolkit-static.zip`** 을 드래그&드롭 (또는 압축 풀어 폴더째로)
4. **Deploy site** 클릭 → `https://devtoolkit.pages.dev` 라이브

> 무료 도메인 + 무제한 트래픽 + 매우 빠름.

---

## 옵션 3. GitHub Pages

```cmd
cd C:\Users\nkia\Documents\Claude\Projects\make_profit
git init -b main
git add .
git commit -m "feat: initial DevToolKit"
gh repo create devtoolkit --public --source=. --push
```

이후 GitHub 리포 → Settings → Pages → Source: `main` `/(root)` → Save

---

## 배포 직후 해야 할 4가지

1. **Search Console 등록** — https://search.google.com/search-console
   - URL prefix: `https://<배포된-도메인>/`
   - Sitemap 제출: `sitemap.xml`

2. **Analytics 부착** (선택)
   - Vercel 사용 시: 대시보드 → Analytics 활성화 (무료)
   - 또는 Google Analytics 4 스니펫을 `index.html`의 `</head>` 직전에 삽입

3. **AdSense 신청** — https://adsense.google.com
   - 트래픽이 일주일 정도 쌓인 뒤 신청하면 승인율 ↑
   - 승인되면 `index.html` 의 AdSense 주석 블록 해제 + 3곳의 `ad-placeholder` 를 실제 광고 단위로 교체

4. **첫 유입 만들기**
   - r/webdev, dev.to, GeekNews, 디스콰이엇에 런칭 글
   - 본인 GitHub README, 블로그, 회사 슬랙 등에 링크

---

## 도메인 (선택)

`devtoolkit.app` 같은 짧은 도메인은 연 $15 내외. 추천:
- Cloudflare Registrar (마진 0%, 가장 저렴)
- Namecheap

도메인 구매 후 Vercel/Cloudflare Pages 의 Custom Domain 설정에서 DNS 두 개만 입력하면 끝.

---

## 한 달 뒤 할 일

검색 데이터를 보고 **추가 도구**를 1~2개씩 더 늘리세요. 각 도구가 별도 키워드 페이지로 작동해 SEO 자산이 누적됩니다.

후보:
- Color picker / HEX↔RGB↔HSL 변환
- Cron 표현식 파서
- JSON ↔ YAML ↔ TOML 변환
- Lorem Ipsum 생성기
- 정규표현식 테스터
- Markdown 미리보기
