'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

import {
  getRichTextContent,
  getBlockImageUrl,
  getCodeLanguage,
  getBlockImageCaption,
} from '@/shared/lib/notion/blocks';

import style from './NotionBlockRenderer.module.scss';

interface NotionBlockRendererProps {
  blocks: BlockObjectResponse[];
}

/**
 * 텍스트에 서식 적용 (bold, italic, code, strikethrough)
 */
const applyTextStyles = (
  content: React.ReactNode,
  annotations: { bold?: boolean; italic?: boolean; code?: boolean; strikethrough?: boolean }
): React.ReactNode => {
  let element: React.ReactNode = content;
  const { bold, italic, code, strikethrough } = annotations;

  if (code) {
    element = <code className={style.inlineCode}>{element}</code>;
  }
  if (bold) {
    element = <strong>{element}</strong>;
  }
  if (italic) {
    element = <em>{element}</em>;
  }
  if (strikethrough) {
    element = <del>{element}</del>;
  }

  return element;
};

/**
 * Rich Text를 React 컴포넌트로 렌더링
 */
const renderRichText = (richText: RichTextItemResponse[]): React.ReactNode => {
  if (!richText || richText.length === 0) return null;

  const result: React.ReactNode[] = [];

  for (let textIndex = 0; textIndex < richText.length; textIndex++) {
    const text = richText[textIndex];
    const content = text.plain_text || (text.type === 'text' ? text.text?.content : '') || '';
    if (!content) continue;

    const annotations = text.annotations || {};
    const { bold, italic, code, strikethrough } = annotations;
    const hasTextStyle = bold || italic || code || strikethrough;
    const hasNewline = content.includes('\n');

    // 최적화: 줄바꿈과 서식이 모두 없는 경우 단순 처리
    if (!hasNewline && !hasTextStyle) {
      result.push(<React.Fragment key={textIndex}>{content}</React.Fragment>);
      continue;
    }

    // 줄바꿈이 없는 경우 서식만 적용
    if (!hasNewline) {
      const element = applyTextStyles(content, annotations);
      result.push(<React.Fragment key={textIndex}>{element}</React.Fragment>);
      continue;
    }

    // 줄바꿈이 있는 경우 처리
    const lines = content.split('\n');
    const lineElements: React.ReactNode[] = [];

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const isLastLine = lineIndex === lines.length - 1;

      // 빈 줄 처리
      if (line === '' && !isLastLine) {
        lineElements.push(<br key={`br-${lineIndex}`} />);
        continue;
      }

      // 빈 줄이 아닌 경우 서식 적용
      const element = applyTextStyles(line, annotations);

      lineElements.push(
        <React.Fragment key={lineIndex}>
          {element}
          {!isLastLine && <br />}
        </React.Fragment>
      );
    }

    result.push(<React.Fragment key={textIndex}>{lineElements}</React.Fragment>);
  }

  return result.length > 0 ? result : null;
};

/**
 * 블록이 리스트 항목인지 확인
 */
const isListItem = (block: BlockObjectResponse): boolean => {
  return (
    block.type === 'bulleted_list_item' ||
    block.type === 'numbered_list_item' ||
    block.type === 'to_do'
  );
};

/**
 * 블록의 parent ID 가져오기
 */
const getParentId = (block: BlockObjectResponse): string | null => {
  const parent = block.parent;
  if (parent && 'type' in parent && parent.type === 'block_id' && 'block_id' in parent) {
    return parent.block_id;
  }
  return null;
};

/**
 * 리스트 타입 결정
 */
const getListType = (blockType: string): 'ul' | 'ol' => {
  return blockType === 'to_do' || blockType === 'bulleted_list_item' ? 'ul' : 'ol';
};

/**
 * 자식 리스트 항목 찾기
 */
const getChildListItems = (
  block: BlockObjectResponse,
  allBlocks: BlockObjectResponse[]
): BlockObjectResponse[] => {
  if (!block.has_children) return [];
  
  return allBlocks.filter((b) => {
    const parentId = getParentId(b);
    return parentId === block.id && isListItem(b);
  });
};

/**
 * 리스트 렌더링 (ul 또는 ol)
 */
const renderList = (
  items: React.ReactNode[],
  listType: 'ul' | 'ol',
  key: string
): React.ReactNode => {
  if (listType === 'ul') {
    return (
      <ul key={key} className={style.list}>
        {items}
      </ul>
    );
  }
  return (
    <ol key={key} className={style.list}>
      {items}
    </ol>
  );
};

/**
 * 리스트 항목을 렌더링 (자식 리스트 포함)
 */
const renderListItem = (
  block: BlockObjectResponse,
  defaultImageCaption: string,
  childBlocks: BlockObjectResponse[],
  allBlocks: BlockObjectResponse[]
): React.ReactNode => {
  const type = block.type;
  let content: React.ReactNode = null;

  // 리스트 항목 타입별 텍스트 추출
  if (type === 'bulleted_list_item') {
    const text = block.bulleted_list_item?.rich_text || [];
    content = renderRichText(text);
    if (!content) return null;
  } else if (type === 'numbered_list_item') {
    const text = block.numbered_list_item?.rich_text || [];
    content = renderRichText(text);
    if (!content) return null;
  } else if (type === 'to_do') {
    const text = block.to_do?.rich_text || [];
    content = renderRichText(text);
    const checked = block.to_do?.checked || false;
    
    // 체크박스 리스트 항목 렌더링
    const checkboxItem = (
      <li className={`${style.listItem} ${style.listItemWithCheckbox}`}>
        <input
          type="checkbox"
          checked={checked}
          readOnly
          className={style.checkbox}
        />
        {content}
      </li>
    );

    // 자식 리스트가 있으면 중첩 리스트 추가
    if (childBlocks.length > 0) {
      const childListItems = childBlocks.map((childBlock) => {
        const childChildBlocks = getChildListItems(childBlock, allBlocks);
        return renderListItem(childBlock, defaultImageCaption, childChildBlocks, allBlocks);
      });

      return (
        <li className={`${style.listItem} ${style.listItemWithCheckbox}`}>
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className={style.checkbox}
          />
          {content}
          <ul className={style.list}>{childListItems}</ul>
        </li>
      );
    }

    return checkboxItem;
  }

  // 자식 리스트가 있으면 중첩 리스트 렌더링
  if (childBlocks.length > 0) {
    const firstChildType = childBlocks[0]?.type;
    const childListType = getListType(firstChildType || '');
    
    const childListItems = childBlocks.map((childBlock) => {
      const childChildBlocks = getChildListItems(childBlock, allBlocks);
      return renderListItem(childBlock, defaultImageCaption, childChildBlocks, allBlocks);
    });

    const ListTag = childListType === 'ol' ? 'ol' : 'ul';
    
    return (
      <li className={style.listItem}>
        {content}
        <ListTag className={style.list}>{childListItems}</ListTag>
      </li>
    );
  }

  return <li className={style.listItem}>{content}</li>;
};

/**
 * Heading 렌더링 (공통 로직)
 */
const renderHeading = (
  level: 1 | 2 | 3,
  richText: RichTextItemResponse[],
  className: string
): React.ReactNode => {
  const content = renderRichText(richText);
  if (!content) return null;

  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3';
  return <HeadingTag className={className}>{content}</HeadingTag>;
};

/**
 * Notion 블록을 React 컴포넌트로 렌더링
 */
const renderBlock = (block: BlockObjectResponse, defaultImageCaption: string): React.ReactNode => {
  const type = block.type;

  switch (type) {
    case 'heading_1': {
      const text = block.heading_1?.rich_text || [];
      return renderHeading(1, text, style.heading1);
    }

    case 'heading_2': {
      const text = block.heading_2?.rich_text || [];
      return renderHeading(2, text, style.heading2);
    }

    case 'heading_3': {
      const text = block.heading_3?.rich_text || [];
      return renderHeading(3, text, style.heading3);
    }

    case 'paragraph': {
      const text = block.paragraph?.rich_text || [];
      const content = renderRichText(text);
      if (!content) return null;
      return <p className={style.paragraph}>{content}</p>;
    }

    case 'quote': {
      const text = block.quote?.rich_text || [];
      const content = renderRichText(text);
      if (!content) return null;
      return <blockquote className={style.quote}>{content}</blockquote>;
    }

    case 'code': {
      const text = getRichTextContent(block.code?.rich_text || []);
      const language = getCodeLanguage(block);
      if (!text) return null;
      return (
        <pre className={style.codeBlock}>
          <code className={style.code} data-language={language}>
            {text}
          </code>
        </pre>
      );
    }

    case 'divider': {
      return <hr className={style.divider} />;
    }

    case 'image': {
      const imageUrl = getBlockImageUrl(block);
      if (!imageUrl) return null;
      const imageCaption = getBlockImageCaption(block, defaultImageCaption);
      return (
        <div className={style.imageContainer}>
          <Image
            src={imageUrl}
            alt={imageCaption}
            width={1200}
            height={675}
            className={style.image}
            unoptimized
          />
        </div>
      );
    }

    default:
      return null;
  }
};

/**
 * Notion 블록 배열을 렌더링 (중첩 리스트 처리)
 */
const NotionBlockRenderer = ({ blocks }: NotionBlockRendererProps) => {
  const tA11y = useTranslations('accessibility');
  const defaultImageCaption = tA11y('projectImage');

  if (!blocks || blocks.length === 0) {
    return null;
  }

  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let currentListType: 'ul' | 'ol' | null = null;

  blocks.forEach((block, index) => {
    // 리스트 항목 처리
    if (isListItem(block)) {
      const listType = getListType(block.type);
      const childBlocks = getChildListItems(block, blocks);

      // parent가 리스트 항목인지 확인 (중첩된 리스트인지)
      const parentId = getParentId(block);
      const parentBlock = parentId ? blocks.find((b) => b.id === parentId) : null;
      const isNested = parentBlock && isListItem(parentBlock);

      if (isNested) {
        // 중첩된 리스트는 renderListItem에서 처리되므로 여기서는 스킵
        return;
      }

      // 최상위 리스트 항목
      if (currentListType === listType) {
        // 같은 타입의 리스트면 현재 리스트에 추가
        currentList.push(renderListItem(block, defaultImageCaption, childBlocks, blocks));
      } else {
        // 다른 타입의 리스트면 이전 리스트 마무리
        if (currentList.length > 0 && currentListType) {
          elements.push(renderList(currentList, currentListType, `list-${index}`));
        }
        currentList = [renderListItem(block, defaultImageCaption, childBlocks, blocks)];
        currentListType = listType;
      }
    } else {
      // 리스트가 아닌 블록
      // 이전 리스트 마무리
      if (currentList.length > 0 && currentListType) {
        elements.push(renderList(currentList, currentListType, `list-${index}`));
        currentList = [];
        currentListType = null;
      }

      // 일반 블록 렌더링
      const rendered = renderBlock(block, defaultImageCaption);
      if (rendered) {
        elements.push(<React.Fragment key={block.id}>{rendered}</React.Fragment>);
      }
    }
  });

  // 마지막 리스트 마무리
  if (currentList.length > 0 && currentListType) {
    elements.push(renderList(currentList, currentListType, 'list-end'));
  }

  return <div className={style.wrap}>{elements}</div>;
};

export default NotionBlockRenderer;
