import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { NOTION_API_KEY } from './config';

const notion = new Client({ auth: NOTION_API_KEY });

/**
 * Notion 데이터베이스 쿼리
 */
export const getNotionQuery = async (
  _databaseId: string,
  filter?: QueryDatabaseParameters['filter']
) => {
  if (!_databaseId) {
    throw new Error('Database ID is not defined');
  }

  try {
    const response = await notion.databases.query({
      database_id: _databaseId,
      ...(filter && { filter })
    });
    return response.results as PageObjectResponse[];
  } catch (error) {
    console.error(`Failed to query database ${_databaseId}:`, error);
    throw error;
  }
};

/**
 * Notion 데이터베이스 스키마 정보 가져오기
 */
export const getNotionDatabase = async (_databaseId: string) => {
  if (!_databaseId) {
    throw new Error('Database ID is not defined');
  }

  try {
    const response = await notion.databases.retrieve({
      database_id: _databaseId
    });
    return response;
  } catch (error) {
    console.error(`Failed to retrieve database ${_databaseId}:`, error);
    throw error;
  }
};

/**
 * Notion 페이지의 블록(콘텐츠)을 재귀적으로 가져오는 함수
 * 
 * @param pageId - Notion 페이지 ID
 * @returns 페이지의 모든 블록 배열
 */
export const getNotionPageBlocks = async (
  pageId: string
): Promise<BlockObjectResponse[]> => {
  if (!pageId) {
    throw new Error('Page ID is not defined');
  }

  try {
    const blocks: BlockObjectResponse[] = [];
    let cursor: string | undefined = undefined;

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor
      });

      const blockResults = response.results as BlockObjectResponse[];
      blocks.push(...blockResults);

      // 중첩된 블록도 재귀적으로 가져오기
      for (const block of blockResults) {
        if (block.has_children) {
          const childBlocks = await getNotionPageBlocks(block.id);
          blocks.push(...childBlocks);
        }
      }

      cursor = response.next_cursor ?? undefined;
    } while (cursor);

    return blocks;
  } catch (error) {
    console.error(`Failed to retrieve blocks for page ${pageId}:`, error);
    throw error;
  }
};
