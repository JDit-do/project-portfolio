export const LOCALE = {
  EN: 'en',
  KO: 'ko'
} as const;

export const THEME = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
  COMPANY: 'company'
} as const;

/**
 * Achievements 섹션 상수
 */
export const ACHIEVEMENTS = {
  /** 카드 너비 (px) */
  CARD_WIDTH: 400,
  /** 카드 간격 (px) */
  CARD_GAP: 20,
  /** 모바일 기준 너비 (px) */
  MOBILE_BREAKPOINT: 768,
  /** 스크롤 애니메이션 transition 시간 (s) */
  SCROLL_TRANSITION: 0.1,
  /** 모바일 전환 시 transition 시간 (s) */
  MOBILE_TRANSITION: 0.3
} as const;

/**
 * CountUp 애니메이션 상수
 */
export const COUNT_UP = {
  /** 기본 애니메이션 지속 시간 (ms) */
  DEFAULT_DURATION: 2000,
  /** 애니메이션 스텝 수 */
  STEPS: 60
} as const;