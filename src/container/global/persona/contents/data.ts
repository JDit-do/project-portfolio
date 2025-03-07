import { ICON_TYPE } from '@/components/icon/index.type';
import { IPrincipleData } from './index.type';

export const DATA_PRINCIPLES: IPrincipleData[] = [
  {
    id: 'solve',
    title: '최적의 솔루션을 찾기 위해 문제를 분석합니다.',
    subTitle: 'Solve Better',
    description: [
      '당연한 것처럼 보이는 문제도 다시 바라보면 새로운 해결책이 보일 수 있습니다.',
      '단순한 해결이 아니라, 최적화된 접근 방식을 찾는 것이 중요합니다.',
      '구조적 접근과 데이터를 기반으로 문제를 분석하고, 보다 효율적인 해결책을 고민합니다.'
    ],
    img: {
      url: '/images/principle-solve.jpg',
      alt: 'Solve 이미지'
    },
    icon: ICON_TYPE.ICON_TYPE_PRINCIPLE.tool
  },
  {
    id: 'experience',
    title: '기술을 통해 사용자 경험을 제공합니다.',
    subTitle: 'Enhance the Experience',
    description: [
      '단순한 기능 구현을 넘어, 사용자가 더 편리하고 직관적으로 서비스를 이용할 수 있도록 고민합니다.',
      'UI/UX 설계를 고려한 개발이 서비스의 완성도를 결정합니다.',
      '사용자의 흐름을 방해하는 요소를 최소화하고, 직관적이고 자연스러운 인터랙션을 설계하는 것이 중요합니다.'
    ],
    img: {
      url: '/images/principle-experience.jpg',
      alt: 'Experience 이미지'
    },
    icon: ICON_TYPE.ICON_TYPE_PRINCIPLE.bulb
  },
  {
    id: 'collaborate',
    title: '더 좋은 결과를 위해 협업합니다.',
    subTitle: 'Collaborate Smarter',
    description: [
      '혼자 잘하는 것보다, 함께 더 나은 결과를 만들어가는 것이 중요합니다.',
      '다양한 관점에서 아이디어를 교류하고, 팀과 함께 성장하는 과정을 중요하게 생각합니다.',
      '원활한 협업을 위한 커뮤니케이션과 기술적 조율이 프로젝트 성공을 결정합니다.'
    ],
    img: {
      url: '/images/principle-collaborate.jpg',
      alt: 'Collaborate 이미지'
    },
    icon: ICON_TYPE.ICON_TYPE_PRINCIPLE.like
  }
];
