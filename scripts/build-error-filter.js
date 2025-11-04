const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const tsFile = path.join(__dirname, '../src/lib/scripts/error-filter.ts');
const outputDir = path.join(__dirname, '../public/scripts');
const outputFile = path.join(outputDir, 'error-filter.js');

// public/scripts 디렉토리가 없으면 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  // esbuild를 사용하여 TypeScript를 JavaScript로 컴파일
  // esbuild는 Next.js에 포함되어 있음
  execSync(
    `npx esbuild "${tsFile}" --bundle --format=iife --outfile="${outputFile}" --target=es2017`,
    { stdio: 'inherit' }
  );
  console.log('error-filter.js built successfully');
} catch (error) {
  console.error('Failed to build error-filter.js:', error.message);
  process.exit(1);
}

