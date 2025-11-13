import { NextResponse } from 'next/server';

import { NotionUtils } from '@/utils/notion';
import { APIResponse, GnbItem } from '@/types/api';
import { getNotionQuery } from '@/lib/notion/client';
import { NOTION_DB_GNB_ID } from '@/lib/notion/config';
import { API_STATUS } from '@/constants/status';

export async function GET() {
  try {
    const response = await getNotionQuery(NOTION_DB_GNB_ID);
    const data: GnbItem[] = response
      .map((item) => ({
        id: item.id,
        order: NotionUtils.getNumber(item.properties.order),
        isActive: NotionUtils.getBoolean(item.properties.is_active),
        url: NotionUtils.getString(item.properties.url),
        menu: {
          ko: NotionUtils.getString(item.properties.menu_ko),
          en: NotionUtils.getString(item.properties.menu_en)
        }
      }))
      .filter(({ isActive }) => isActive)
      .sort(
        ({ order: order1 }, { order: order2 }) =>
          +(order1 > order2) || +(order1 === order2) - 1
      );
    const responseData: APIResponse<GnbItem[]> = {
      code: 200,
      data,
      status: API_STATUS.SUCCESS
    };

    return NextResponse.json(responseData, {
      status: responseData.code,
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600'
      }
    });
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
