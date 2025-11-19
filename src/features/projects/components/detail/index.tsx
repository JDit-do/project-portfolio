'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

import { APIResponse } from '@/shared/types/api';
import { Project } from '@/features/projects/types';

import { APIEndpoints } from '@/shared/constants/apiEndPoint';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import Button from '@/shared/components/ui/button';
import Icon from '@/shared/components/icon/base';
import { ICON_TYPE } from '@/shared/components/icon/base/index.type';
import ProjectContent from '@/features/projects/components/content';
import { NotionBlockRenderer } from '@/shared/components/notion';

import style from './index.module.scss';

interface ProjectsDetailProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 프로젝트 상세 팝업 컴포넌트
 */
const ProjectsDetail = ({ project, isOpen, onClose }: ProjectsDetailProps) => {
  const t = useTranslations('projects.detail');
  const [content, setContent] = useState<BlockObjectResponse[] | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  // 상세 화면이 열릴 때 프로젝트 콘텐츠 가져오기
  useEffect(() => {
    if (!project || !isOpen) {
      setContent(null);
      return;
    }

    // 콘텐츠 가져오기 (매번 호출하되, 브라우저 캐시 활용)
    const fetchContent = async () => {
      setIsLoadingContent(true);
      try {
        const url = APIEndpoints.projects.content(project.id).url;
        const startTime = performance.now();

        // 개발 환경에서는 캐시 비활성화, 프로덕션에서는 브라우저 캐시 활용
        const response = await fetch(url, {
          cache:
            process.env.NODE_ENV === 'development'
              ? 'no-store' // 개발: 캐시 비활성화
              : 'force-cache' // 프로덕션: 브라우저 캐시 강제 사용 (30분 이내)
        });

        const endTime = performance.now();
        const fetchTime = endTime - startTime;

        // 캐시 상태 확인
        const cacheStatus =
          response.headers.get('cache-control') || 'no-cache-control';
        const age = response.headers.get('age') || '0';
        const etag = response.headers.get('etag') || 'no-etag';
        const status = response.status;

        // Cache-Control 헤더에서 max-age 추출
        const maxAgeMatch = cacheStatus.match(/max-age=(\d+)/);
        const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : null;

        // 브라우저 캐시 판단
        // fetchTime이 매우 짧으면 (3ms 미만) 캐시에서 가져온 것으로 판단
        // 실제로는 Network 탭에서 "(disk cache)" 또는 "(memory cache)" 확인이 가장 정확함
        const isFromCache = fetchTime < 3;

        // 개발 환경에서만 로깅
        if (process.env.NODE_ENV === 'development') {
          console.log('📦 API 호출:', {
            projectId: project.id,
            projectTitle: project.title,
            url,
            status,
            fetchTime: `${fetchTime.toFixed(2)}ms`,
            cacheControl: cacheStatus,
            maxAge: maxAge
              ? `${maxAge}초 (${Math.floor(maxAge / 60)}분)`
              : '없음',
            age: age !== '0' ? `${age}초` : '새로운 요청',
            etag: etag !== 'no-etag' ? '있음' : '없음',
            fromCache: isFromCache
              ? '✅ 브라우저 캐시에서 가져옴 (예상)'
              : '❌ 서버에서 가져옴',
            tip: isFromCache
              ? '✅ 캐시 작동 중!'
              : maxAge
                ? `💡 다음 요청부터는 캐시에서 가져올 예정 (max-age: ${maxAge}초)`
                : '⚠️ Cache-Control에 max-age가 없습니다. 서버를 재시작해주세요.'
          });
        }

        if (!response.ok) {
          throw new Error('Failed to fetch project content');
        }

        const { data }: APIResponse<BlockObjectResponse[]> =
          await response.json();
        setContent(data || []);

        // 프로젝트 객체에 콘텐츠 추가 (메모리 캐싱 - 선택적)
        // 주의: 이렇게 하면 같은 프로젝트 객체를 재사용할 때 메모리 캐시가 우선됨
        // project.content = data || [];
      } catch (error) {
        console.error('Failed to fetch project content:', error);
        setContent([]);
      } finally {
        setIsLoadingContent(false);
      }
    };

    fetchContent();
  }, [project?.id, isOpen]);

  if (!project) return null;

  return (
    <>
      {/* 오버레이 */}
      {isOpen && <div className={style.overlay} onClick={onClose} />}

      {/* 팝업 */}
      <div className={`${style.wrap} ${isOpen ? style.active : ''}`}>
        <div className={style.header}>
          <Button onClick={onClose} className={style.closeButton}>
            <Icon type={ICON_TYPE.ICON_TYPE_COMMON.close} />
            {t('close')}
          </Button>
        </div>

        <div className={style.content}>
          {/* 썸네일 */}
          {project.thumbnail && (
            <div className={style.thumbnail}>
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          {/* 프로젝트 정보 */}
          <div className={`${style.info} detail`}>
            <ProjectContent
              project={project}
              variant="detail"
              showDateLabel
              showThumbnail={false}
            />

            {/* Notion 블록 콘텐츠 */}
            {isLoadingContent && (
              <div className={style.contentLoading}>
                콘텐츠를 불러오는 중...
              </div>
            )}
            {content && content.length > 0 && (
              <div className={style.notionContent}>
                <NotionBlockRenderer blocks={content} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsDetail;
