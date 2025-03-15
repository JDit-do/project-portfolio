import { ICON_TYPE } from '@/components/icon/index.type';
import { IPrincipleData } from './index.type';

export const DATA_PRINCIPLES: IPrincipleData[] = [
  {
    id: 'experience',
    title: 'principle.experience.title',
    subTitle: 'Enhance the Experience',
    description: [
      'principle.experience.description.data1',
      'principle.experience.description.data2',
      'principle.experience.description.data3'
    ],
    img: {
      url: '/images/principle-experience.jpg',
      alt: 'Experience 이미지'
    },
    icon: ICON_TYPE.ICON_TYPE_PRINCIPLE.bulb
  },
  {
    id: 'solve',
    title: 'principle.solve.title',
    subTitle: 'Find Better Solutions',
    description: [
      'principle.solve.description.data1',
      'principle.solve.description.data2',
      'principle.solve.description.data3'
    ],
    img: {
      url: '/images/principle-solve.jpg',
      alt: 'Solve 이미지'
    },
    icon: ICON_TYPE.ICON_TYPE_PRINCIPLE.tool
  },
  {
    id: 'collaborate',
    title: 'principle.collaborate.title',
    subTitle: 'Collaborate Smarter',
    description: [
      'principle.collaborate.description.data1',
      'principle.collaborate.description.data2',
      'principle.collaborate.description.data3'
    ],
    img: {
      url: '/images/principle-collaborate.jpg',
      alt: 'Collaborate 이미지'
    },
    icon: ICON_TYPE.ICON_TYPE_PRINCIPLE.like
  }
];
