import { Project } from '@/types/project';

// TODO: Notion API에서 데이터 가져오기
export const mockProjects: Project[] = [
  // 즐겨찾기 프로젝트 3개
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: '대규모 전자상거래 플랫폼 개발. React와 TypeScript를 활용한 반응형 웹 애플리케이션.',
    type: 'career',
    isFavorite: true,
    tags: ['React', 'TypeScript', 'Next.js', 'Redux'],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '2',
    title: 'Real-time Chat Application',
    description: 'WebSocket을 활용한 실시간 채팅 애플리케이션. Node.js와 Socket.io로 구현.',
    type: 'career',
    isFavorite: true,
    tags: ['Node.js', 'Socket.io', 'React', 'MongoDB'],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: '개인 포트폴리오 웹사이트. Next.js와 Notion API를 활용한 동적 콘텐츠 관리.',
    type: 'side',
    isFavorite: true,
    tags: ['Next.js', 'TypeScript', 'Notion API', 'SCSS'],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  // 일반 프로젝트 6개 (경력)
  {
    id: '4',
    title: 'Admin Dashboard',
    description: '관리자 대시보드 시스템. 데이터 시각화 및 사용자 관리 기능 제공.',
    type: 'career',
    isFavorite: false,
    tags: ['Vue.js', 'Chart.js', 'Express', 'PostgreSQL'],
    link: 'https://example.com'
  },
  {
    id: '5',
    title: 'Mobile App Landing Page',
    description: '모바일 앱 프로모션 랜딩 페이지. 성능 최적화 및 SEO 개선.',
    type: 'career',
    isFavorite: false,
    tags: ['React', 'SSR', 'SEO', 'Performance'],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '6',
    title: 'API Gateway System',
    description: '마이크로서비스 아키텍처를 위한 API 게이트웨이 시스템 구축.',
    type: 'career',
    isFavorite: false,
    tags: ['Node.js', 'Microservices', 'Docker', 'Kubernetes'],
    link: 'https://example.com'
  },
  {
    id: '7',
    title: 'Design System',
    description: '통일된 디자인 시스템 구축. 재사용 가능한 컴포넌트 라이브러리 개발.',
    type: 'career',
    isFavorite: false,
    tags: ['Storybook', 'React', 'TypeScript', 'Design Tokens'],
    github: 'https://github.com'
  },
  {
    id: '8',
    title: 'Payment Integration',
    description: '다중 결제 수단 통합 시스템. 안전한 결제 프로세스 구현.',
    type: 'career',
    isFavorite: false,
    tags: ['Stripe', 'PayPal', 'React', 'Security'],
    link: 'https://example.com'
  },
  {
    id: '9',
    title: 'Analytics Dashboard',
    description: '실시간 데이터 분석 대시보드. 복잡한 데이터를 시각적으로 표현.',
    type: 'career',
    isFavorite: false,
    tags: ['D3.js', 'React', 'WebSocket', 'Data Visualization'],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  // 사이드 프로젝트 샘플
  {
    id: '10',
    title: 'Task Management Tool',
    description: '협업을 위한 태스크 관리 도구. 실시간 동기화 및 알림 기능.',
    type: 'side',
    isFavorite: false,
    tags: ['React', 'Firebase', 'Real-time', 'PWA'],
    github: 'https://github.com'
  },
  {
    id: '11',
    title: 'Weather Widget',
    description: '날씨 정보를 제공하는 위젯 애플리케이션. 다양한 API 통합.',
    type: 'side',
    isFavorite: false,
    tags: ['Vue.js', 'Weather API', 'Charts', 'Responsive'],
    link: 'https://example.com'
  },
  {
    id: '12',
    title: 'Code Snippet Manager',
    description: '개발자를 위한 코드 스니펫 관리 도구. 검색 및 카테고리 기능.',
    type: 'side',
    isFavorite: false,
    tags: ['React', 'LocalStorage', 'Syntax Highlighting', 'Search'],
    github: 'https://github.com'
  }
];

