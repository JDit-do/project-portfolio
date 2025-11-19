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

### 🏗️ 프로젝트 구조 (Feature-based Architecture)

2024년 최신 트렌드를 반영한 **Feature-based Architecture**를 적용하여 도메인별 기능을 명확히 분리하고, 공통 코드는 `shared/` 폴더에 통합했습니다.

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 다국어 라우팅 (한국어/영어)
│   │   ├── page.tsx       # 홈 페이지
│   │   └── projects/      # 프로젝트 페이지
│   └── api/               # API Routes
│       ├── gnb/           # GNB API
│       └── projects/      # Notion API 연동
│
├── features/              # 도메인별 기능 (Feature-based)
│   ├── home/             # 홈 페이지 도메인
│   │   ├── components/   # 도메인 전용 컴포넌트
│   │   │   ├── hero/     # 히어로 섹션
│   │   │   ├── achievements/  # 주요 성과 섹션
│   │   │   ├── teamsays/ # 추천사 섹션
│   │   │   └── cta/      # CTA 섹션
│   │   ├── types.ts      # 도메인 타입
│   │   └── constants.ts # 도메인 상수
│   │
│   ├── navigation/       # 네비게이션 도메인
│   │   ├── components/   # GNB 컴포넌트
│   │   └── lib/          # 네비게이션 유틸리티
│   │
│   └── projects/         # 프로젝트 도메인
│       ├── components/   # 프로젝트 컴포넌트
│       │   ├── card/     # 프로젝트 카드
│       │   ├── gallery/  # 프로젝트 갤러리
│       │   ├── detail/   # 프로젝트 상세
│       │   └── content/  # 프로젝트 콘텐츠
│       ├── hooks/        # 프로젝트 전용 훅
│       ├── lib/          # 프로젝트 라이브러리
│       └── types.ts      # 프로젝트 타입
│
├── shared/               # 모든 공통 코드 통합
│   ├── components/       # 공통 컴포넌트
│   │   ├── ui/          # UI 컴포넌트 (button, dropdown, tab 등)
│   │   ├── layout/      # 레이아웃 컴포넌트 (sidebar, main 등)
│   │   ├── icon/        # 아이콘 컴포넌트
│   │   ├── animation/   # 애니메이션 컴포넌트
│   │   ├── notion/      # Notion 블록 렌더링 (직접 React 컴포넌트로 렌더링)
│   │   └── skillIcon/   # 스킬 아이콘 컴포넌트
│   │
│   ├── hooks/           # 공통 훅
│   │   ├── useCountUp.ts      # 숫자 카운트업 애니메이션
│   │   ├── useTypingEffect.ts # 타이핑 효과
│   │   ├── useToggle.ts       # 토글 상태 관리
│   │   └── ...
│   │
│   ├── lib/             # 공통 라이브러리
│   │   ├── api/         # API 유틸리티
│   │   ├── notion/      # Notion 클라이언트 및 유틸리티
│   │   └── skills/      # 스킬 아이콘 매핑
│   │
│   ├── types/            # 공통 타입 정의
│   ├── constants/       # 공통 상수
│   ├── store/          # 전역 상태 관리 (Zustand)
│   └── styles/         # 전역 스타일
│
├── config/               # 모든 앱 설정 통합
│   ├── i18n/           # 국제화 설정 (next-intl)
│   │   ├── request.ts   # next-intl 요청 설정
│   │   ├── routing.ts   # 라우팅 설정
│   │   └── navigation.ts # 네비게이션 유틸리티
│   └── seo/            # SEO 설정
│       └── defaultSeoConfig.ts
│
└── middleware.ts         # Next.js 미들웨어
```

### 🎯 아키텍처 설계 원칙

#### 1. **Feature-based Architecture**
- **도메인 중심 설계**: 비즈니스 로직을 도메인별로 분리 (`features/home`, `features/projects`, `features/navigation`)
- **독립성**: 각 도메인은 자체 컴포넌트, 훅, 라이브러리, 타입을 포함
- **확장성**: 새로운 도메인 추가 시 `features/`에 폴더만 추가하면 됨

#### 2. **Shared 폴더 통합**
- **공통 코드 중앙 집중화**: 모든 재사용 가능한 코드를 `shared/`에 통합
- **중복 제거**: `components/`, `hooks/`, `lib/`, `types/`, `constants/` 등을 `shared/` 하위로 통합
- **명확한 책임**: `app/`는 라우팅만, `features/`는 비즈니스 로직, `shared/`는 공통 코드

#### 3. **실용성 우선**
- **과도한 추상화 지양**: FSD의 entities, widgets 등 복잡한 계층 구조는 사용하지 않음
- **직관적인 구조**: 다른 사람이 쉽게 이해하고 유지보수할 수 있는 구조
- **확장 가능**: 작은 프로젝트에서 시작하되, 큰 프로젝트로 확장 가능

### ✨ 주요 기능

- **다국어 지원**: 한국어/영어 지원 (next-intl)
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 대응
- **Notion API 연동**: 프로젝트 데이터를 Notion에서 동적으로 가져오기
- **Notion 콘텐츠 렌더링**: Notion 블록을 직접 React 컴포넌트로 렌더링 (제목, 문단, 리스트, 코드, 이미지, 테이블 등 지원)
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

- **Notion API**: 프로젝트 포트폴리오 데이터 관리 (Headless CMS 역할)
- **Skill Icons**: 기술 스택 아이콘 표시 (Simple Icons CDN 활용)

#### 주요 개선 사항

1. **도메인별 기능 분리**
   - `features/home`: 홈 페이지 관련 모든 코드
   - `features/projects`: 프로젝트 관련 모든 코드
   - `features/navigation`: 네비게이션 관련 모든 코드

2. **공통 코드 통합**
   - `shared/components`: 모든 공통 컴포넌트 (UI, layout, icon 등)
   - `shared/hooks`: 모든 공통 훅
   - `shared/lib`: 모든 공통 라이브러리
   - `shared/types`: 모든 공통 타입
   - `shared/constants`, `shared/store`, `shared/styles` 통합

3. **설정 파일 통합**
   - `config/i18n`: 국제화 설정 (next-intl)
   - `config/seo`: SEO 설정
   - 모든 앱 레벨 설정을 `config/` 폴더에 통합

4. **명확한 책임 분리**
   - `app/`: Next.js 라우팅만 담당
   - `features/`: 비즈니스 로직과 도메인별 기능
   - `shared/`: 재사용 가능한 공통 코드
   - `config/`: 앱 레벨 설정 (i18n, seo 등)

## 🚀 확장 고려 사항

### 1. 새로운 도메인 추가

새로운 기능(예: 블로그, 이력서)을 추가할 때는 `features/` 폴더에 새 도메인을 추가합니다.

```
features/
├── home/
├── navigation/
├── projects/
└── blog/          # 새 도메인 추가 예시
    ├── components/
    ├── hooks/
    ├── lib/
    └── types.ts
```

### 2. 공통 컴포넌트 추가

여러 도메인에서 사용되는 컴포넌트는 `shared/components/`에 추가합니다.

```
shared/components/
├── ui/            # 기본 UI 컴포넌트
├── layout/        # 레이아웃 컴포넌트
└── [new-shared]/  # 새로운 공통 컴포넌트
```

### 3. 마이크로 프론트엔드 전환

현재 구조는 마이크로 프론트엔드로 전환하기에 적합합니다.
- 각 `features/` 도메인을 독립적인 모듈로 분리 가능
- 도메인 간 의존성 최소화
- 독립적인 배포 및 버전 관리 가능

### 4. 성능 최적화

- **코드 스플리팅**: 도메인별 동적 import 활용
- **서버 컴포넌트**: Next.js 15 App Router의 서버 컴포넌트 최대한 활용
- **캐싱 전략**: API Route에서 HTTP 헤더 기반 캐싱 활용

## 💡 기술적 의사결정

### 왜 Feature-based Architecture를 선택했나?

1. **확장성**: 새로운 기능 추가 시 구조 변경 최소화
2. **유지보수성**: 도메인별 코드가 한 곳에 모여 있어 수정 용이
3. **팀 협업**: 도메인별로 작업 분리 가능

### 왜 Notion API를 선택했나?

- **비개발자 친화적**: 비개발자도 콘텐츠를 쉽게 수정 가능
- **비용 효율적**: 별도 CMS 구축 비용 없이 Headless CMS 역할
- **API 기반 자동화**: API를 통한 자동화 및 통합 용이

### 왜 Shared 폴더로 통합했나?

- **중복 제거**: 공통 코드가 여러 곳에 분산되어 있던 문제 해결
- **명확한 구조**: 공통 코드와 도메인 코드의 명확한 구분
- **유지보수성**: 공통 코드 수정 시 한 곳만 수정하면 됨

### 왜 Config 폴더로 설정을 통합했나?

- **설정 파일 통합**: 모든 앱 레벨 설정을 `config/`에 모아 관리
- **논리적 그룹화**: i18n, seo 등 설정이 한 곳에 있어 찾기 쉬움
- **확장성**: 향후 `config/database/`, `config/auth/` 등 추가 용이
- **명확한 분리**: 설정과 코드의 명확한 구분

## 📝 개발 가이드

### Import 경로 규칙

```typescript
// 도메인 코드에서 도메인 내부 import
import { Project } from '../types';
import { useProjects } from '../hooks/useProjects';

// 도메인 코드에서 공통 코드 import
import Button from '@/shared/components/ui/button';
import { useToggle } from '@/shared/hooks/useToggle';

// 공통 코드에서 공통 코드 import
import { API_STATUS } from '@/shared/constants/status';
import { useCountUp } from '@/shared/hooks/useCountUp';

// 설정 파일 import
import { routing } from '@/config/i18n/routing';
import { METADATA } from '@/config/seo/defaultSeoConfig';
```

### 컴포넌트 작성 규칙

1. **도메인 전용 컴포넌트**: `features/[domain]/components/`에 작성
2. **공통 컴포넌트**: `shared/components/`에 작성
3. **컴포넌트 구조**: 각 컴포넌트는 `index.tsx`, `index.module.scss`, `index.type.ts` 포함

### 타입 정의 규칙

1. **도메인 타입**: `features/[domain]/types.ts`에 정의
2. **공통 타입**: `shared/types/`에 정의
3. **타입 네이밍**: 인터페이스는 `PascalCase`, 타입은 `PascalCase` 또는 `Union Type`

## 📚 참고 자료

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

## 📝 참고사항

- 패키지 매니저는 `pnpm`을 사용합니다.
- **다크/라이트 모드**: 다크 모드 스타일과 테마 전환 기능은 구현되어 있으나, 현재는 UI에서 테마 전환 기능을 제공하지 않으며 라이트 모드만 활성화되어 있습니다. 향후 해당 부분은 적용 예정입니다.
- 현재 API는 Notion을 이용하고 있습니다. 해당 부분에 대한 API를 외부에서 접근하는 것을 고려하고 있습니다.

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.
