/**
 * MetaMask 및 기타 확장 프로그램에서 발생하는 콘솔 오류를 필터링합니다.
 * 프로젝트에서 사용하지 않는 외부 확장 프로그램의 오류를 무시합니다.
 */
(function() {
  if (typeof window === 'undefined') return;
  
  // 원본 console.error 저장
  const originalError = console.error;
  
  // console.error 오버라이드
  console.error = function(...args: unknown[]) {
    const errorMessage = args.join(' ');
    if (
      errorMessage.includes('MetaMask') ||
      errorMessage.includes('Failed to connect to MetaMask') ||
      errorMessage.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
      errorMessage.includes('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn')
    ) {
      // MetaMask 관련 오류는 무시
      return;
    }
    // 다른 오류는 정상적으로 출력
    originalError.apply(console, args);
  };
  
  // window.onerror 핸들러로도 필터링
  window.addEventListener('error', function(event: ErrorEvent) {
    const errorMessage = event.message || '';
    if (
      errorMessage.includes('MetaMask') ||
      errorMessage.includes('Failed to connect to MetaMask') ||
      errorMessage.includes('nkbihfbeogaeaoehlefnkodbefgpgknn')
    ) {
      event.preventDefault();
      return false;
    }
  });
  
  // unhandledrejection도 필터링 (Promise 오류)
  window.addEventListener('unhandledrejection', function(event: PromiseRejectionEvent) {
    const errorMessage = String(event.reason || '');
    if (
      errorMessage.includes('MetaMask') ||
      errorMessage.includes('Failed to connect to MetaMask') ||
      errorMessage.includes('nkbihfbeogaeaoehlefnkodbefgpgknn')
    ) {
      event.preventDefault();
    }
  });
})();

