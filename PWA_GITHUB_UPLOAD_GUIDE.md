# Go Life Lab · 11단계 PWA 설치용 패키지

`index.html`과 `manifest.webmanifest` **파일 2개만이 아니라**, 아래 8개 파일을 **모두 저장소 최상단**에 올려 주세요.

- `index.html` (11단계 앱 및 422개 Go Game Guru SGF 내장)
- `manifest.webmanifest` (앱 이름/시작 주소/아이콘 설정)
- `icon.png` (512×512)
- `icon-192.png` (192×192)
- `icon-maskable.png` (512×512: Android 적응형 아이콘)
- `apple-touch-icon.png` (180×180: iOS 홈 화면)
- `favicon.png` (48×48: 브라우저 탭)
- `sw.js` (첫 접속 후 오프라인 재실행용 캐시)

## 설치 순서
1. ZIP을 **압축 해제**합니다.
2. Go Life Lab GitHub 저장소의 **루트**에서 `Add file → Upload files`로 위 파일을 업로드하고 기존 `index.html`은 교체합니다.
3. `Commit changes` 후 GitHub Pages 주소를 HTTPS로 엽니다.
4. Android Chrome: 브라우저 메뉴 → 앱 설치 또는 홈 화면에 추가. iPhone Safari: 공유 → 홈 화면에 추가.
5. 첫 온라인 접속과 캐시 준비가 끝나면 이후 재접속 시 오프라인에서도 HTML과 콘텐츠를 열 수 있습니다. 업데이트 반영은 온라인에서 다시 방문한 뒤 새로고침해 주세요.

`start_url` 및 `scope`에 `./`를 사용하여 GitHub Pages의 `<계정>.github.io/<저장소>/` 경로에서도 동작하도록 했습니다. 기존 학습 기록은 동일한 웹 주소와 브라우저 프로필이 유지되면 재사용되며, 휴대폰에 설치한 앱과 다른 브라우저의 학습 기록이 자동 동기화되지는 않습니다. `설정 → 학습 기록 → JSON 기록 백업`을 권장합니다.

원본 SGF는 Go Game Guru 저작권(CC BY-NC-SA 4.0) 준수: `LICENSE_GoGameGuru.txt`.
