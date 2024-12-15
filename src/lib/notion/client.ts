import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const notionQuery = async (_databaseId: string) => {
  if (!_databaseId) {
    throw new Error('Database ID is not defined');
  }

  try {
    const response = await notion.databases.query({ database_id: _databaseId });
    return response.results;
  } catch (error) {
    console.error(`Failed to query database ${_databaseId}:`, error);
    throw error;
  }
};
