'use client';

import Image from 'next/image';

import { getSkillIconUrl } from '@/shared/lib/skills/icons';

interface SkillIconProps {
  techName: string;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * 기술 스택 아이콘 컴포넌트
 *
 * @param techName - 기술 이름 (예: "React", "TypeScript")
 * @param className - 추가 CSS 클래스
 * @param width - 아이콘 너비 (기본값: 16)
 * @param height - 아이콘 높이 (기본값: 16)
 */
const SkillIcon = ({
  techName,
  className,
  width = 16,
  height = 16
}: SkillIconProps) => {
  const iconUrl = getSkillIconUrl(techName);

  if (!iconUrl) {
    return null;
  }

  return (
    <Image
      src={iconUrl}
      alt={techName}
      width={width}
      height={height}
      className={className}
      unoptimized
      aria-hidden="true"
      onError={(e) => {
        // 아이콘 로드 실패 시 숨김 처리
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};

export default SkillIcon;
