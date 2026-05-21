# GitHub Private Repo → Vercel 연결 가이드

`push-to-github.bat` 으로 GitHub private 리포에 코드를 올렸다면, 이제 Vercel에 연결할 차례입니다. **약 2분 소요**.

이렇게 연결하면, 앞으로는 `git push` 한 번만 하면 Vercel이 자동으로 새 버전을 배포합니다 (= **GitOps**).

---

## 1단계 · Vercel 가입 (이미 있으면 건너뛰기)

https://vercel.com/signup → **Continue with GitHub** 클릭

> GitHub 계정으로 가입하면 권한 연결이 자동으로 처리됩니다.

---

## 2단계 · 프로젝트 Import

1. https://vercel.com/new 접속
2. **"Import Git Repository"** 섹션이 보입니다
3. 만약 본인의 private 리포 (`devtoolkit`)가 목록에 안 보이면:
   - **"Adjust GitHub App Permissions →"** 클릭
   - GitHub 페이지로 이동 → 본인 계정 선택
   - **"Only select repositories"** → `devtoolkit` 체크 → **Save**
   - Vercel 페이지로 돌아오면 리포가 보입니다
4. `devtoolkit` 옆 **"Import"** 클릭

---

## 3단계 · 설정 (모두 기본값 그대로!)

Import 후 나오는 화면:

| 항목 | 값 |
|------|-----|
| Project Name | `devtoolkit` (그대로) |
| Framework Preset | **Other** (자동 감지됨) |
| Root Directory | `./` (그대로) |
| Build Command | **비워두기** |
| Output Directory | **비워두기** |
| Install Command | **비워두기** |

→ **"Deploy"** 클릭

---

## 4단계 · 완료 확인 (약 30초 대기)

배포 완료 화면에서:
- 큰 스크린샷 + URL 표시 (`https://devtoolkit-xxxx.vercel.app`)
- **"Continue to Dashboard"** 클릭
- 그 URL이 라이브 사이트입니다

---

## 5단계 · 자동 배포 테스트

로컬에서 아무 파일이나 수정해보세요. 예시:

```cmd
cd C:\Users\nkia\Documents\Claude\Projects\make_profit
echo. >> README.md
git add . && git commit -m "test: trigger redeploy" && git push
```

→ Vercel Dashboard에서 약 20초 뒤 자동으로 새 배포가 시작됩니다.

---

## (선택) 6단계 · 커스텀 도메인 연결

1. Vercel Dashboard → 본인 프로젝트 → **Settings → Domains**
2. **"Add"** → 본인 도메인 입력 (예: `devtoolkit.app`)
3. Vercel이 알려주는 DNS 레코드 2~3개를 도메인 등록업체 (Namecheap, Cloudflare 등) DNS 설정에 추가
4. 약 1~10분 뒤 자동 SSL 적용 + 라이브

> 도메인이 아직 없다면 **Cloudflare Registrar** 추천 (마진 0%, 가장 저렴, 연 $10 내외).

---

## (선택) 7단계 · Vercel Analytics 켜기

Vercel Dashboard → 프로젝트 → **Analytics 탭** → **Enable**
- 무료 플랜에서도 기본 트래픽 통계 제공
- AdSense 신청 시 트래픽 증빙으로 활용 가능

---

## 문제 해결

**Q. 리포가 Vercel에 안 보여요**
→ 2단계의 "Adjust GitHub App Permissions" 단계를 빠뜨린 것입니다. 다시 실행.

**Q. Build 가 실패해요**
→ Framework Preset이 "Other" 가 아니라 Next.js 등으로 잘못 감지된 경우. Settings → General → Framework Preset → **Other** 로 변경.

**Q. 한글 깨짐**
→ 이미 `<meta charset="UTF-8">` 들어가 있어 발생하지 않습니다. 발생한다면 브라우저 강력 새로고침 (Ctrl+Shift+R).

**Q. AdSense 광고 자리가 안 보여요**
→ AdSense 승인 전이므로 자연스러운 상태입니다. `index.html` 의 `<!-- <script async ... -->` 주석을 본인 publisher ID로 교체하고 주석 해제하면 광고가 뜹니다.
