export const DROPDOWN_DIRECTION = {
  UP: 'up',
  DOWN: 'down'
} as const;
export type DROPDOWN_DIRECTION =
  (typeof DROPDOWN_DIRECTION)[keyof typeof DROPDOWN_DIRECTION];

export interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  direction?: DROPDOWN_DIRECTION; // 열리는 방향 설정
}
