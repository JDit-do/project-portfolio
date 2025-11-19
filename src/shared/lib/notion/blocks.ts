import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

/**
 * Notion Rich Text를 텍스트로 변환
 */
export const getRichTextContent = (
  richText: Array<{
    plain_text?: string;
    text?: { content: string };
  }>
): string => {
  if (!richText || richText.length === 0) return '';
  return richText
    .map((text) => text.plain_text || text.text?.content || '')
    .join('');
};

/**
 * Notion 블록 타입 추출
 */
export const getBlockType = (block: BlockObjectResponse): string => {
  return block.type;
};

/**
 * Notion 블록에서 텍스트 추출
 */
export const getBlockText = (block: BlockObjectResponse): string => {
  const type = block.type;
  
  switch (type) {
    case 'heading_1':
      return getRichTextContent(block.heading_1?.rich_text || []);
    case 'heading_2':
      return getRichTextContent(block.heading_2?.rich_text || []);
    case 'heading_3':
      return getRichTextContent(block.heading_3?.rich_text || []);
    case 'paragraph':
      return getRichTextContent(block.paragraph?.rich_text || []);
    case 'bulleted_list_item':
      return getRichTextContent(block.bulleted_list_item?.rich_text || []);
    case 'numbered_list_item':
      return getRichTextContent(block.numbered_list_item?.rich_text || []);
    case 'to_do':
      return getRichTextContent(block.to_do?.rich_text || []);
    case 'toggle':
      return getRichTextContent(block.toggle?.rich_text || []);
    case 'quote':
      return getRichTextContent(block.quote?.rich_text || []);
    case 'callout':
      return getRichTextContent(block.callout?.rich_text || []);
    case 'code':
      return getRichTextContent(block.code?.rich_text || []);
    case 'table_row':
      // 테이블 행의 셀들을 텍스트로 변환
      if (block.table_row?.cells) {
        return block.table_row.cells
          .map((cell) => getRichTextContent(cell))
          .join(' | ');
      }
      return '';
    default:
      return '';
  }
};

/**
 * Notion 블록에서 이미지 URL 추출
 */
export const getBlockImageUrl = (block: BlockObjectResponse): string | null => {
  if (block.type === 'image') {
    const image = block.image;
    if (image?.type === 'external') {
      return image.external?.url || null;
    }
    if (image?.type === 'file') {
      return image.file?.url || null;
    }
  }
  return null;
};

/**
 * Notion 블록에서 코드 언어 추출
 */
export const getCodeLanguage = (block: BlockObjectResponse): string => {
  if (block.type === 'code') {
    return block.code?.language || 'plain text';
  }
  return '';
};

/**
 * Notion 이미지 블록에서 caption 추출
 * @param block - Notion 블록
 * @param defaultCaption - caption이 없을 때 사용할 기본값 (다국어 처리된 텍스트, 필수)
 */
export const getBlockImageCaption = (
  block: BlockObjectResponse,
  defaultCaption: string
): string => {
  if (block.type === 'image' && block.image?.caption) {
    const caption = getRichTextContent(block.image.caption);
    if (caption) {
      return caption;
    }
  }
  return defaultCaption;
};

