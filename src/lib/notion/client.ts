import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

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
