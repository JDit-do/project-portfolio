import { API_STATUS } from '@/constants/status';

export interface APIResponse<T> {
  data: T;
  code: number;
  status: keyof typeof API_STATUS;
  message?: string;
}

/**
 * @property id(string): UUID
 * @property langKey(string): 다국어 Key
 * @property url(string): G.N.B URL
 * @property order(string): 순서
 */
export interface GnbItem {
  id: string;
  langKey: string;
  url: string;
  order: number;
}
