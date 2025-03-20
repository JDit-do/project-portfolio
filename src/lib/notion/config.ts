// Common
export const LOCALE_ID = process.env.LOCALE || '';
export const API_URL = process.env.API_URL || '';
// Notion
export const NOTION_API_KEY = process.env.NOTION_API_KEY || '';
export const NOTION_DB_GNB_ID = process.env.NOTION_DB_GNB_ID || '';

if (!NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not defined in environment variables');
}
if (!NOTION_DB_GNB_ID) {
  throw new Error('NOTION_DB_GNB_ID is not defined in environment variables');
}
