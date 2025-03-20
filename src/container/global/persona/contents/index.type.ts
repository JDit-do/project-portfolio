import { TICON_TYPE } from '@/components/icon/index.type';

export interface IPersonaContentProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface IPrincipleData {
  id: string;
  title: string;
  subTitle: string;
  description: string[];
  img: {
    url: string;
    alt: string;
  };
  icon: TICON_TYPE;
}
