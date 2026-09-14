# Postly Desktop

Instagram 카드뉴스 초안을 만들고 PNG로 저장하는 Windows 데스크톱 MVP입니다.

## Windows 설치파일 받기

1. 저장소의 **Actions** 탭을 엽니다.
2. **Build Postly Windows Installer** 작업을 선택합니다.
3. 가장 최근 성공한 실행을 엽니다.
4. 페이지 아래 **Artifacts**의 `Postly-Windows-Installer`를 내려받습니다.
5. ZIP 압축을 풀고 `Postly-Setup-0.1.0.exe`를 실행합니다.

현재 설치파일은 코드서명 인증서가 없어서 Windows SmartScreen 경고가 나타날 수 있습니다. 본인이 만든 파일인지 확인한 뒤 **추가 정보 → 실행**을 선택하면 설치할 수 있습니다.

## 개발 실행

```bash
npm install
npm start
```

## Windows 설치파일 직접 빌드

```bash
npm install
npm run dist:win
```

출력 파일은 `dist/Postly-Setup-0.1.0.exe`입니다.

## 현재 MVP 범위

- 4가지 콘텐츠 모드
- 키워드 기반 주제 제안
- 6장 카드뉴스 초안
- 문구 편집과 템플릿 변경
- 현재 카드 PNG 저장

AI API, 사진 자동 선별, 6장 일괄 저장, Metricool 예약발행은 다음 개발 단계입니다.
