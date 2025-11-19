import { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { getRichTextContent, getBlockImageUrl, getCodeLanguage, getBlockImageCaption, getBlockText } from './blocks';

/**
 * Rich Text를 Markdown 형식으로 변환 (bold, italic, code 등)
 */
const richTextToMarkdown = (richText: RichTextItemResponse[]): string => {
  if (!richText || richText.length === 0) return '';
  
  return richText.map((text) => {
    let content = text.plain_text || (text.type === 'text' ? text.text?.content : '') || '';
    
    if (!content) return '';
    
    // 어노테이션 적용 (순서 중요: code는 가장 안쪽, 그 다음 bold, italic, strikethrough)
    if (text.annotations) {
      const { bold, italic, code, strikethrough } = text.annotations;
      
      // code는 가장 안쪽에 적용
      if (code) {
        content = `\`${content}\``;
      }
      // bold와 italic은 code 밖에 적용
      if (bold) {
        content = `**${content}**`;
      }
      if (italic) {
        content = `*${content}*`;
      }
      // strikethrough는 가장 바깥쪽
      if (strikethrough) {
        content = `~~${content}~~`;
      }
    }
    
    return content;
  }).join('');
};

/**
 * Notion 블록을 Markdown 문자열로 변환
 */
export const convertBlockToMarkdown = (
  block: BlockObjectResponse,
  defaultImageCaption: string = 'Image'
): string => {
  const type = block.type;
  
  switch (type) {
    case 'heading_1': {
      const text = richTextToMarkdown(block.heading_1?.rich_text || []);
      return text ? `# ${text}\n\n` : '';
    }
    
    case 'heading_2': {
      const text = richTextToMarkdown(block.heading_2?.rich_text || []);
      return text ? `## ${text}\n\n` : '';
    }
    
    case 'heading_3': {
      const text = richTextToMarkdown(block.heading_3?.rich_text || []);
      return text ? `### ${text}\n\n` : '';
    }
    
    case 'paragraph': {
      const text = richTextToMarkdown(block.paragraph?.rich_text || []);
      return text ? `${text}\n\n` : '';
    }
    
    case 'bulleted_list_item': {
      const text = richTextToMarkdown(block.bulleted_list_item?.rich_text || []);
      return text ? `- ${text}\n` : '';
    }
    
    case 'numbered_list_item': {
      // numbered list는 convertBlocksToMarkdown에서 번호를 매기므로 여기서는 텍스트만 반환
      const text = richTextToMarkdown(block.numbered_list_item?.rich_text || []);
      return text ? `${text}\n` : '';
    }
    
    case 'to_do': {
      const text = richTextToMarkdown(block.to_do?.rich_text || []);
      const checked = block.to_do?.checked ? 'x' : ' ';
      return text ? `- [${checked}] ${text}\n` : '';
    }
    
    case 'toggle': {
      const text = richTextToMarkdown(block.toggle?.rich_text || []);
      return text ? `<details>\n<summary>${text}</summary>\n\n</details>\n\n` : '';
    }
    
    case 'quote': {
      const text = richTextToMarkdown(block.quote?.rich_text || []);
      return text ? `> ${text}\n\n` : '';
    }
    
    case 'callout': {
      const text = richTextToMarkdown(block.callout?.rich_text || []);
      const icon = block.callout?.icon?.type === 'emoji' ? block.callout.icon.emoji : '💡';
      return text ? `> ${icon} ${text}\n\n` : '';
    }
    
    case 'code': {
      const text = getRichTextContent(block.code?.rich_text || []);
      const language = getCodeLanguage(block);
      return text ? `\`\`\`${language}\n${text}\n\`\`\`\n\n` : '';
    }
    
    case 'divider': {
      return `---\n\n`;
    }
    
    case 'image': {
      const imageUrl = getBlockImageUrl(block);
      if (!imageUrl) return '';
      const caption = getBlockImageCaption(block, defaultImageCaption);
      return `![${caption}](${imageUrl})\n\n`;
    }
    
    case 'table': {
      // 테이블은 별도 처리 필요 (블록 배열에서 table_row 찾아야 함)
      return '';
    }
    
    case 'table_row': {
      // table_row는 table 블록과 함께 처리
      return '';
    }
    
    default:
      return '';
  }
};

/**
 * Notion 블록 배열을 Markdown 문자열로 변환
 */
export const convertBlocksToMarkdown = (
  blocks: BlockObjectResponse[],
  defaultImageCaption: string = 'Image'
): string => {
  if (!blocks || blocks.length === 0) return '';
  
  let markdown = '';
  let currentList: BlockObjectResponse[] = [];
  let currentListType: 'bulleted' | 'numbered' | null = null;
  let tableRows: BlockObjectResponse[] = [];
  let currentTable: BlockObjectResponse | null = null;
  
  blocks.forEach((block, index) => {
    // table_row는 table 블록과 함께 처리
    if (block.type === 'table_row') {
      if (currentTable) {
        tableRows.push(block);
      }
      return;
    }
    
    // table 블록 시작
    if (block.type === 'table') {
      // 이전 리스트 마무리
      if (currentList.length > 0) {
        markdown += currentListType === 'bulleted' ? '\n' : '\n';
        currentList = [];
        currentListType = null;
      }
      
      currentTable = block;
      tableRows = [];
      
      // 다음 블록들에서 table_row 찾기 (parent 관계 확인)
      const tableId = block.id;
      for (let i = index + 1; i < blocks.length; i++) {
        if (blocks[i].type === 'table_row') {
          // parent가 현재 table인지 확인
          const parent = blocks[i].parent;
          if (parent && 'type' in parent && parent.type === 'block_id' && 'block_id' in parent && parent.block_id === tableId) {
            tableRows.push(blocks[i]);
          } else {
            break;
          }
        } else {
          break;
        }
      }
      
      // 테이블 Markdown 생성
      if (tableRows.length > 0) {
        const hasColumnHeader = block.table?.has_column_header || false;
        
        // 첫 번째 행이 헤더인 경우
        if (hasColumnHeader && tableRows.length > 0) {
          const headerRow = tableRows[0];
          if (headerRow.type === 'table_row' && headerRow.table_row?.cells) {
            const headerCells = headerRow.table_row.cells.map((cell) => {
              const text = getRichTextContent(cell);
              return text || '';
            });
            markdown += `| ${headerCells.join(' | ')} |\n`;
            markdown += `| ${headerCells.map(() => '---').join(' | ')} |\n`;
          }
        }
        
        // 데이터 행
        const startIndex = hasColumnHeader ? 1 : 0;
        for (let i = startIndex; i < tableRows.length; i++) {
          const row = tableRows[i];
          if (row.type === 'table_row' && row.table_row?.cells) {
            const cells = row.table_row.cells.map((cell) => {
              const text = getRichTextContent(cell);
              // 줄바꿈을 <br>로 변환 (Markdown에서는 줄바꿈이 안되므로)
              return text.replace(/\n/g, '<br>') || '';
            });
            markdown += `| ${cells.join(' | ')} |\n`;
          }
        }
        markdown += '\n';
      }
      
      currentTable = null;
      tableRows = [];
      return;
    }
    
    // 리스트 항목 처리
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      const listType = block.type === 'bulleted_list_item' ? 'bulleted' : 'numbered';
      
      if (currentListType === listType) {
        currentList.push(block);
      } else {
        // 이전 리스트 마무리 및 변환
        if (currentList.length > 0) {
          if (currentListType === 'bulleted') {
            currentList.forEach((listBlock) => {
              markdown += convertBlockToMarkdown(listBlock, defaultImageCaption);
            });
          } else {
            // numbered list는 순서대로 번호 매기기
            currentList.forEach((listBlock, idx) => {
              const text = richTextToMarkdown(
                listBlock.type === 'numbered_list_item'
                  ? listBlock.numbered_list_item?.rich_text || []
                  : []
              );
              if (text) {
                markdown += `${idx + 1}. ${text}\n`;
              }
            });
          }
          markdown += '\n';
        }
        currentList = [block];
        currentListType = listType;
      }
    } else {
      // 리스트 마무리 및 변환
      if (currentList.length > 0) {
        if (currentListType === 'bulleted') {
          currentList.forEach((listBlock) => {
            markdown += convertBlockToMarkdown(listBlock, defaultImageCaption);
          });
        } else {
          // numbered list는 순서대로 번호 매기기
          currentList.forEach((listBlock, idx) => {
            const text = richTextToMarkdown(
              listBlock.type === 'numbered_list_item'
                ? listBlock.numbered_list_item?.rich_text || []
                : []
            );
            if (text) {
              markdown += `${idx + 1}. ${text}\n`;
            }
          });
        }
        markdown += '\n';
        currentList = [];
        currentListType = null;
      }
      
      // 일반 블록 변환
      markdown += convertBlockToMarkdown(block, defaultImageCaption);
    }
  });
  
  // 마지막 리스트 마무리 및 변환
  if (currentList.length > 0) {
    if (currentListType === 'bulleted') {
      currentList.forEach((listBlock) => {
        markdown += convertBlockToMarkdown(listBlock, defaultImageCaption);
      });
    } else {
      // numbered list는 순서대로 번호 매기기
      currentList.forEach((listBlock, idx) => {
        const text = richTextToMarkdown(
          listBlock.type === 'numbered_list_item'
            ? listBlock.numbered_list_item?.rich_text || []
            : []
        );
        if (text) {
          markdown += `${idx + 1}. ${text}\n`;
        }
      });
    }
    markdown += '\n';
  }
  
  return markdown;
};

/**
 * Notion 블록 배열을 순수 텍스트로 변환 (마크다운 문법 없이)
 * 단, 코드 블록은 마크다운 코드 블록 문법으로 변환
 */
export const convertBlocksToPlainText = (
  blocks: BlockObjectResponse[]
): string => {
  if (!blocks || blocks.length === 0) return '';
  
  return blocks
    .map((block) => {
      // 코드 블록은 마크다운 문법으로 변환
      if (block.type === 'code') {
        const text = getRichTextContent(block.code?.rich_text || []);
        const language = getCodeLanguage(block);
        return text ? `\`\`\`${language}\n${text}\n\`\`\`` : '';
      }
      
      // 나머지는 순수 텍스트
      const text = getBlockText(block);
      return text;
    })
    .filter((text) => text.length > 0)
    .join('\n\n');
};

