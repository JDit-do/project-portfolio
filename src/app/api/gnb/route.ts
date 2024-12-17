import { NextResponse } from 'next/server';

import { NotionUtils } from '@/utils/notion';
import { APIResponse, GnbItem } from '@/types/api';
import { getNotionQuery } from '@/lib/notion/client';
import { NOTION_DB_GNB_ID } from '@/lib/notion/config';
import { API_STATUS } from '@/constants/status';

export async function GET() {
  try {
    const response = await getNotionQuery(NOTION_DB_GNB_ID);
    const data: GnbItem[] = response.map((item) => ({
      id: item.id,
      langKey: NotionUtils.getString(item.properties.key),
      url: NotionUtils.getString(item.properties.url),
      order: NotionUtils.getNumber(item.properties.order)
    }));
    const responseData: APIResponse<GnbItem[]> = {
      code: 200,
      data,
      status: API_STATUS.SUCCESS
    };

    return NextResponse.json(responseData, { status: responseData.code });
  } catch (error) {
    console.error('Error fetching GNB data:', error);

    const responseData: APIResponse<null> = {
      data: null,
      code: 500,
      status: API_STATUS.ERROR,
      message: 'Failed to fetch Notion data'
    };
    return NextResponse.json(responseData, { status: responseData.code });
  }
}
