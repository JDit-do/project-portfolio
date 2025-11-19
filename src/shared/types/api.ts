import { API_STATUS } from '@/shared/constants/status';

export interface APIResponse<T> {
  data: T;
  code: number;
  status: keyof typeof API_STATUS;
  message?: string;
}

/**
 * @property id: UUID
 * @property order: 순서
 * @property isActive: 표시 여부
 * @property url: G.N.B URL
 * @property menu: (object) G.N.B name(Language)
 */
export interface GnbItem {
  id: string;
  order: number;
  isActive: boolean;
  url: string;
  menu: {
    ko: string;
    en: string;
  };
}
