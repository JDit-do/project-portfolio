/**
 * Resume 섹션 애니메이션 delay 상수
 * 
 * 섹션별 우선순위:
 * 1. Intro & Profile (hero + about) - 첫인상과 핵심 가치 전달
 * 2. 경력 (Career) - 구체적인 프로젝트 및 역할 설명
 * 3. 기술 검증 및 기술 전파 (projects + publications) - 품질과 리더십 검증
 * 4. 기술 스택 - 사용 가능한 도구 목록
 * 5. 학력 및 기타 - 기본 정보 제공
 */

export const RESUME_SECTION_DELAY = {
  // 1순위: Intro & Profile
  INTRO_PROFILE: 0.1,
  
  // 2순위: 경력 (Career)
  CAREER: 0.2,
  
  // 3순위: 기술 검증 및 기술 전파
  VALIDATION: 0.3,
  
  // 4순위: 기술 스택
  SKILLS: 0.4,
  
  // 5순위: 학력 및 기타
  EDUCATION_ETC: 0.5
} as const;

/**
 * 섹션 내부 요소 간 추가 delay 간격
 */
export const ITEM_DELAY_INTERVAL = 0.05;

