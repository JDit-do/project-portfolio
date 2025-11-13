/**
 * 기술 이름을 아이콘 CDN URL로 매핑
 * 
 * 하이브리드 방식:
 * 1. Skill Icons (색상 포함) - https://skillicons.dev/
 * 2. Simple Icons (색상 없음, 더 많은 아이콘) - https://simpleicons.org/
 * 
 * Skill Icons에 있으면 색상이 포함된 Skill Icons를 우선 사용하고,
 * 없으면 Simple Icons를 사용합니다.
 */
export const getSkillIconUrl = (skillName: string): string | null => {
  // Skill Icons 매핑 (색상 포함, 우선 사용)
  const skillIconsMap: Record<string, string> = {
    // Frontend
    React: 'react',
    TypeScript: 'typescript',
    'Next.js': 'nextjs',
    Nextjs: 'nextjs',
    'Redux Toolkit': 'redux',
    Redux: 'redux',
    Recoil: 'react',
    JavaScript: 'javascript',
    JS: 'javascript',
    
    // UI & Styling
    'Styled-Components': 'styledcomponents',
    'Styled Components': 'styledcomponents',
    'Tailwind CSS': 'tailwind',
    Tailwind: 'tailwind',
    MUI: 'materialui',
    'Material UI': 'materialui',
    'Material-UI': 'materialui',
    SCSS: 'scss',
    SASS: 'scss',
    CSS: 'css',
    HTML: 'html',
    
    // Data Visualization
    // 'D3.js': 'd3js',
    D3: 'd3js',
    // 'Chart.js': 'chartjs',
    Chartjs: 'chartjs',
    
    // Backend
    'Spring Boot': 'spring',
    Spring: 'spring',
    'Node.js': 'nodejs',
    Nodejs: 'nodejs',
    Node: 'nodejs',
    MySQL: 'mysql',
    PostgreSQL: 'postgresql',
    MongoDB: 'mongodb',
    Python: 'python',
    Java: 'java',
    Django: 'django',
    
    // DevOps
    'GitHub Actions': 'githubactions',
    'AWS EC2': 'aws',
    AWS: 'aws',
    Docker: 'docker',
    Terraform: 'terraform',
    Kubernetes: 'kubernetes',
    K8s: 'kubernetes',
    'CI/CD': 'githubactions',
    
    // Cloud & Infrastructure
    OpenStack: 'openstack',
    'IaaS Architecture': 'aws',
    
    // Version Control
    Git: 'git',
    GitHub: 'github',
    
    // Others
    Vite: 'vite',
    Webpack: 'webpack',
    'Angular 2': 'angular',
    Angular: 'angular',
    AngularJS: 'angular',
    RxJS: 'rxjs',
    Bootstrap: 'bootstrap',
  };

  // Simple Icons 매핑 (Skill Icons에 없을 때 사용)
  const simpleIconsMap: Record<string, string> = {
    'Paper.js': 'javascript',
    'AG-Grid': 'javascript',
    Highcharts: 'javascript',
    WebSocket: 'javascript',
    'React Intl': 'react',
    'React-helmet-async': 'react',
    CloudFront: 'amazoncloudwatch',
    Route53: 'amazonaws',
    S3: 'amazonaws',
    ACM: 'amazonaws',
    'AWS EKS': 'amazonaws',
    EKS: 'amazonaws',
    Cognito: 'amazonaws',
    ArgoCD: 'argo',
    Argo: 'argo',
    Keepalived: 'linux',
    HAProxy: 'linux',
    VMware: 'vmware',
  };

  const normalizedName = skillName.trim();
  
  // 1. Skill Icons 우선 확인 (색상 포함)
  let skillIconId = skillIconsMap[normalizedName] || skillIconsMap[normalizedName.toLowerCase()];
  if (skillIconId) {
    return `https://skillicons.dev/icons?i=${skillIconId}`;
  }
  
  // 2. Simple Icons 확인
  let simpleIconId = simpleIconsMap[normalizedName] || simpleIconsMap[normalizedName.toLowerCase()];
  
  // 3. 매핑에 없으면 기술 이름을 kebab-case로 변환하여 Simple Icons 시도
  if (!simpleIconId) {
    const kebabCase = normalizedName
      .replace(/\s+/g, '-')
      .replace(/\./g, 'dot')
      .replace(/\//g, '-')
      .toLowerCase();
    simpleIconId = kebabCase;
  }
  
  if (!simpleIconId) {
    return null;
  }

  // Simple Icons CDN URL (색상 없음, CSS로 색상 적용 필요)
  return `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${simpleIconId}.svg`;
};

