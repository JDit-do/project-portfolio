import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { NOTION_API_KEY } from './config';

const notion = new Client({ auth: NOTION_API_KEY });

export const getNotionQuery = async (_databaseId: string) => {
  if (!_databaseId) {
    throw new Error('Database ID is not defined');
  }

  try {
    const response = await notion.databases.query({
      database_id: _databaseId
    });
    return response.results as PageObjectResponse[];
  } catch (error) {
    console.error(`Failed to query database ${_databaseId}:`, error);
    throw error;
  }
};
