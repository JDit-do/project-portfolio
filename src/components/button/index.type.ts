/**
 * Button에서 사용되는 Props 정보
 * 타입(BUTTON, LINK, DOWNLOAD), defalt(BUTTON) - 현재 상태에서는 3중 1개에 대한 속성만 넣어야 한다.
 * @param button - 버튼명과 이벤트 함수
 * @param link - 새탭 띄울 주소.
 * @param download - 다운로드할 주소.
 */
export interface ButtonProps {
  button?: {
    label: React.ReactNode | string;
    onClick: () => void;
  };
  download?: string;
  link?: string;
}

export const BUTTON_TYPE = {
  BUTTON: 'button',
  LINK: 'link',
  DOWNLOAD: 'download'
} as const;
export type BUTTON_TYPE = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];
