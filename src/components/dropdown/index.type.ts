export const DROPDOWN_DIRECTION = {
  UP: 'up',
  DOWN: 'down'
} as const;
export type DROPDOWN_DIRECTION =
  (typeof DROPDOWN_DIRECTION)[keyof typeof DROPDOWN_DIRECTION];

/**
 * Dropdown에서 사용되는 Props 정보
 * @param label - 보여줄 라벨 정보
 * @param options - 옵션 정보
 * @param onSelect - 옵션 선택시 호출될 함수
 * @param value - 옵션과 매핑할 값
 * @param direction - 옵션 열리는 방향 설정(위, 아래 방향)
 */
export interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  value?: string;
  direction?: DROPDOWN_DIRECTION;
}
