# 🧑‍💻 Web Portfolio - JD

개인 포트폴리오 웹사이트입니다.  
Next.js v15 기반으로 제작되었으며, 반응형 웹, 프로젝트 상세 페이지 등 다양한 기능을 포함하고 있습니다.

## 📦 프로젝트 구성

### 🎯 핵심 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript 5
- **UI 라이브러리**: React 19 RC
- **스타일링**: SCSS Modules, Tailwind CSS 4
- **애니메이션**: Framer Motion
- **상태 관리**: Zustand
- **다국어**: next-intl
- **테마**: next-themes (다크/라이트 모드)

### 🏗️ 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 다국어 라우팅 (한국어/영어)
│   │   ├── page.tsx       # 홈 페이지
│   │   └── projects/      # 프로젝트 페이지
│   └── api/               # API Routes
│       └── projects/      # Notion API 연동
│
├── components/            # 재사용 가능한 컴포넌트
│   ├── animation/         # 애니메이션 컴포넌트
│   ├── button/            # 버튼 컴포넌트
│   ├── card/              # 카드 컴포넌트
│   ├── cursor/            # 커스텀 커서
│   ├── projectCard/       # 프로젝트 카드
│   └── typingText/        # 타이핑 효과 텍스트
│
├── container/             # 페이지별 컨테이너
│   ├── layouts/           # 레이아웃 (Header, Sidebar, Main)
│   └── pages/             # 페이지 컴포넌트
│       ├── home/          # 홈 페이지 섹션들
│       │   ├── hero/      # 히어로 섹션
│       │   ├── achievements/  # 주요 성과 섹션
│       │   ├── teamsays/  # 추천사 섹션
│       │   └── cta/       # CTA 섹션
│       └── projects/      # 프로젝트 페이지
│
├── hooks/                 # 커스텀 훅
│   ├── useCountUp.ts      # 숫자 카운트업 애니메이션
│   ├── useTypingEffect.ts # 타이핑 효과
│   ├── useProjects.ts     # 프로젝트 데이터 관리
│   └── useLanguage.ts      # 언어 관리
│
├── lib/                   # 라이브러리 설정
│   └── notion/           # Notion API 클라이언트
│
├── store/                 # 상태 관리 (Zustand)
│   └── themeStore.ts      # 테마 상태 관리 (다크/라이트 모드)
│
├── styles/                # 전역 스타일
│   ├── globals.scss       # 전역 스타일
│   └── themes/            # 테마별 스타일 (다크/라이트 모드 스타일 정의)
│
├── types/                 # TypeScript 타입 정의
│   ├── api.ts             # API 타입
│   ├── project.ts         # 프로젝트 타입
│   └── common.ts          # 공통 타입
│
└── utils/                 # 유틸리티 함수
    ├── notion.ts          # Notion 유틸리티
    └── skillIcons.ts      # 기술 스택 아이콘 매핑
```

### ✨ 주요 기능

- **다국어 지원**: 한국어/영어 지원 (next-intl)
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 대응
- **Notion API 연동**: 프로젝트 데이터를 Notion에서 동적으로 가져오기
- **애니메이션**: 스크롤 기반 애니메이션 및 인터랙션 (Framer Motion)
- **SEO 최적화**: 메타데이터 및 Open Graph 설정
- **성능 최적화**: Next.js의 서버 사이드 렌더링 및 데이터 캐싱 활용

### 🎨 스타일링 시스템

- **SCSS Modules**: 컴포넌트별 스타일 격리
- **Tailwind CSS**: 유틸리티 클래스 활용
- **CSS Variables**: 테마별 색상 변수 관리 (`data-theme` 속성 기반)
- **반응형 Mixins**: SCSS 믹스인을 통한 반응형 처리
- **테마 시스템**: 선택자를 통한 테마별 스타일 적용

### 🔌 외부 연동

- **Notion API**: 프로젝트 포트폴리오 데이터 관리
- **Skill Icons**: 기술 스택 아이콘 표시
- **Simple Icons**: 추가 아이콘 지원

### 📝 참고사항

- 현재 API는 Notion을 이용하고 있습니다. 해당 부분에 대한 API를 외부에서 접근하는 것을 고려하고 있습니다.
- 패키지 매니저는 `pnpm`을 사용합니다.
- **다크/라이트 모드**: 다크 모드 스타일과 테마 전환 기능은 구현되어 있으나, 현재는 UI에서 테마 전환 기능을 제공하지 않으며 라이트 모드만 활성화되어 있습니다. 향후 해당 부분은 적용 예쩡입니다.
