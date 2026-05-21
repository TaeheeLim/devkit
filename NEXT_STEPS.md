# 🚀 배포 이후 — 수익화까지의 단계별 체크리스트

배포 완료 축하합니다. 아래는 **트래픽 확보 → 광고 수익화** 까지의 실행 순서입니다.
대부분 1회성 작업이며, 총 소요 시간 약 **30~40분**.

---

## STEP 0. 사이트 URL 확인 + 코드 일괄 교체 (5분)

지금 코드에는 도메인이 `devkit.vercel.app` 으로 들어가 있습니다.
실제 Vercel 이 만들어준 URL 이 다르다면 (예: `devkit-taeheelim.vercel.app`), VS Code 에서 **Ctrl+Shift+H** (찾기-바꾸기 전체) 로 한 번에 교체하세요:

- 찾기: `devkit.vercel.app`
- 바꾸기: 본인 실제 도메인 (예: `devkit-taeheelim.vercel.app`)

해당되는 파일: `index.html`, `sitemap.xml`, `robots.txt`

> **나중에 커스텀 도메인을 사면** 다시 한 번 이 작업을 반복하면 됩니다.

---

## STEP 1. Google Search Console 등록 (10분)

검색 노출의 시작점. 등록 안 하면 구글이 사이트의 존재는 알지만 인덱싱이 느립니다.

### 1-1. 사이트 추가
1. https://search.google.com/search-console 접속 → 구글 계정 로그인
2. **속성 추가** → **URL 접두어** 선택 (Vercel 서브도메인은 Domain 방식이 안 되므로 URL 접두어 사용)
3. URL 입력: `https://devkit.vercel.app/` (본인 실제 URL)
4. **계속** 클릭

### 1-2. 소유권 인증 (HTML 태그 방식 — 가장 쉬움)
1. "다른 확인 방법" → **HTML 태그** 선택
2. 표시된 `<meta name="google-site-verification" content="..." />` 의 **content 값만** 복사
3. `index.html` 13번째 줄 근처 다음 위치를 찾아 교체:
   ```html
   <meta name="google-site-verification" content="REPLACE_WITH_GSC_VERIFICATION_CODE" />
   ```
   → `REPLACE_WITH_GSC_VERIFICATION_CODE` 부분을 복사한 값으로 교체
4. 저장 후 Git push:
   ```cmd
   git add index.html
   git commit -m "feat: add Google Search Console verification"
   git push
   ```
5. Vercel이 자동 재배포 완료(~30초) 대기 후 Search Console에서 **확인** 클릭 → 완료

### 1-3. sitemap.xml 제출
1. Search Console 좌측 메뉴 → **Sitemaps**
2. "새 사이트맵 추가"에 `sitemap.xml` 입력 → **제출**
3. 상태: **성공** 으로 바뀌면 OK

> 첫 인덱싱까지 보통 1~7일. 일주일 후 "성과" 메뉴에 노출 횟수가 잡히기 시작합니다.

---

## STEP 2. 네이버 서치어드바이저 등록 (선택, 5분, 한국 사용자 중요)

한국 검색의 약 30%는 여전히 네이버. 등록은 5분.

1. https://searchadvisor.naver.com → 네이버 로그인
2. **사이트 등록** → URL 입력
3. 메타태그 방식 선택 → 받은 content 값을 `index.html` 에 추가:
   ```html
   <meta name="naver-site-verification" content="여기에_붙여넣기" />
   ```
   (코드에 이미 주석 처리되어 있음 — 주석만 해제 후 값 교체)
4. Push → 인증 완료
5. **사이트맵 제출** 메뉴에서 `https://devkit.vercel.app/sitemap.xml` 입력

---

## STEP 3. Vercel Analytics 활성화 (1분, 무료)

방문 트래픽 확인용. AdSense 신청 시 트래픽 증빙으로도 활용.

1. https://vercel.com/dashboard → `devkit` 프로젝트 클릭
2. 상단 탭 **Analytics** → **Enable**
3. 끝. 코드 변경 불필요. Vercel이 자동으로 스크립트를 삽입합니다.

---

## STEP 4. 첫 유입 만들기 (즉시, 무료)

검색 인덱싱은 시간이 걸리므로, 사람을 직접 데려와 초기 트래픽을 만듭니다.
**광고 승인용 트래픽 + Search Console 색인 가속** 두 효과.

가장 효과 좋은 채널 (한국):
- **GeekNews** https://news.hada.io — "내가 만든 것" 카테고리에 짧은 소개글
- **디스콰이엇** https://disquiet.io — 메이커 커뮤니티
- **Reddit r/webdev** https://reddit.com/r/webdev → "I made: …" 형식
- **개인 블로그 / Velog / Tistory** — "JSON 포매터 만들었습니다" 류 글
- **회사 슬랙, 카톡 개발자 단톡방** — 가볍게 공유

샘플 소개 문구:

> **DevToolKit — 개발자 도구 7개를 한 페이지에 모았습니다.**
> JSON 포매터, Base64, JWT 디코더, UUID, SHA-256 해시, Unix Timestamp 변환기 등.
> 모든 처리는 브라우저 안에서만 동작해서, 사내 토큰이나 민감 데이터도 안전하게 처리 가능합니다.
> 무료 / 회원가입 없음 / 광고 차단 안 해주셔도 됨 (아직 광고 없음 😅).
> 👉 https://devkit.vercel.app

---

## STEP 5. Google AdSense 신청 (트래픽 1주일 누적 후)

**중요: 너무 일찍 신청하면 "콘텐츠 부족" 으로 거절됩니다.** 트래픽이 일 100명 이상은 나오는 시점에 신청 권장.

### 5-1. 가입 + 사이트 추가
1. https://adsense.google.com → 구글 계정 가입
2. 사이트 URL 입력: `devkit.vercel.app`
3. 받는 통화 / 주소 입력 → 다음
4. AdSense가 알려주는 코드 (`<script async ...adsbygoogle.js?client=ca-pub-XXXXXXXX...">`) 를 복사

### 5-2. 코드 삽입
`index.html` 의 다음 부분을 찾아 본인 publisher ID 로 교체 + 주석 해제:

```html
<!-- 기존 (주석 상태) -->
<!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script> -->

<!-- 변경 후 (주석 해제 + 본인 ca-pub) -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOURPUBID" crossorigin="anonymous"></script>
```

Push → Search Console 에 등록한 도메인이라면 자동 인증 완료.

### 5-3. 승인 대기 (보통 1~7일)
승인 메일 도착 시:
1. AdSense 대시보드 → **광고 단위** → **새 광고 단위** → "디스플레이 광고" 생성
2. 생성된 광고 코드를 `index.html` 안의 다음 위치에 붙여넣기 (3곳):
   ```html
   <aside class="ad-slot">
     <div class="ad-placeholder">광고 자리 (AdSense Top Banner)</div>
   </aside>
   ```
   → 이 `<aside>` 안쪽의 `<div>` 를 광고 코드로 교체

### 5-4. 승인 거절 시 대처
가장 흔한 사유 3가지:
- **고유 콘텐츠 부족** → FAQ 섹션, "왜 DevToolKit인가요" 본문을 더 길게 (각 도구마다 사용 예시 문단 추가)
- **개인정보처리방침 누락** → 이미 `/privacy.html` 있음 — 무시
- **사이트 navigation 어려움** → 이미 상단 메뉴 있음 — 무시

→ 1차 거절되면, 문제 부분만 보완 후 30일 뒤 재신청.

---

## STEP 6. (선택) 후원 / 어필리에이트 활성화

`index.html` 의 **"☕ Buy me a coffee"** 섹션에 placeholder가 있습니다.

### 6-1. Buy Me a Coffee
1. https://buymeacoffee.com 가입 → username 선택 (예: `taeheelim`)
2. `index.html` 의 `https://www.buymeacoffee.com/REPLACE_USERNAME` 에서 `REPLACE_USERNAME` 을 본인 username으로 교체

### 6-2. 토스 송금 링크
1. 토스 앱 → 송금 → 받기 → 내 토스 ID 확인
2. `https://toss.me/REPLACE_USERNAME` 에서 username 교체

### 6-3. Vercel 어필리에이트 (가입자당 $20)
1. https://vercel.com/affiliate → 가입
2. 받은 추천 링크로 `vercel.com/?utm_source=devtoolkit` 부분 교체

---

## STEP 7. 한 달 뒤 — 추가 도구 1개씩 늘리기

Search Console **성과** 메뉴를 보면, 사람들이 검색한 키워드를 알 수 있습니다.
가장 많이 검색되는 키워드를 보고, 그에 맞는 도구를 1~2주에 1개씩 추가하세요.

추가 후보 (높은 검색량 순):
- Color picker / HEX↔RGB↔HSL
- Cron 표현식 파서
- 정규표현식 테스터
- JSON ↔ YAML ↔ TOML 변환
- Markdown 미리보기
- QR 코드 생성기
- 비밀번호 생성기

각 도구 추가 = 새 키워드 = 누적되는 SEO 자산.

---

## 📊 예상 수익 시나리오 (정직한 추정)

| 시점 | 일 PV | 월 PV | 월 광고 수익 (CPM $1 가정) |
|------|------|------|------|
| 1개월 | 50 | 1,500 | **~$1.5** |
| 3개월 | 200 | 6,000 | **~$6** |
| 6개월 | 1,000 | 30,000 | **~$30** |
| 1년 | 3,000 | 90,000 | **~$90** |
| 2년 | 10,000 | 300,000 | **~$300** |

> 개발자 도구 사이트는 **광고 단가는 낮지만 트래픽이 꾸준히 누적**되는 카테고리. 의미 있는 수익은 6개월 이후부터.
> 어필리에이트 / 후원 수익이 광고보다 클 수 있음.

---

## ✅ 체크리스트 (이 페이지를 인쇄/북마크 해두세요)

- [ ] STEP 0: 도메인 일괄 교체 (`devkit.vercel.app` → 실제 URL)
- [ ] STEP 1: Google Search Console 등록 + sitemap 제출
- [ ] STEP 2: 네이버 서치어드바이저 등록 (선택)
- [ ] STEP 3: Vercel Analytics 활성화
- [ ] STEP 4: 첫 유입 만들기 (3개 채널 이상 공유)
- [ ] STEP 5: AdSense 신청 (트래픽 1주일 누적 후)
- [ ] STEP 6: 후원 / 어필리에이트 링크 채우기
- [ ] STEP 7: 한 달 뒤 추가 도구 1개 출시

---

## 💡 Tip

배포한 즉시 가장 먼저 할 일은 **STEP 1 (Search Console)** 입니다.
나머지는 그 사이에 인덱싱이 진행되는 동안 천천히 진행해도 됩니다.
