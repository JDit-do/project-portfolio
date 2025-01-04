export const DROPDOWN_DIRECTION = {
  UP: 'up',
  DOWN: 'down'
} as const;
export type DROPDOWN_DIRECTION =
  (typeof DROPDOWN_DIRECTION)[keyof typeof DROPDOWN_DIRECTION];

/**
 * Dropdown에서 사용되는 Props 정보
 * @param options - 드랍다운에 보여줄 정보
 * @param onSelect - 변경시 호출될 함수
 * @param direction - 열리는 방향 설정(위, 아래 방향)
 * @param isShowClickMe - Click ME 글씨 표현 여부
 */
export interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  direction?: DROPDOWN_DIRECTION;
  isShowClickMe?: boolean;
}
