import { NotionUtils } from '@/utils/notion';
import { GnbItem } from '@/types/api';
import { getNotionQuery } from '@/lib/notion/client';
import { NOTION_DB_GNB_ID } from '@/lib/notion/config';

/**
 * GNB 데이터를 가져오는 함수
 */
export async function getGnb(): Promise<GnbItem[]> {
  if (!NOTION_DB_GNB_ID) {
    return [];
  }

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

    return data;
  } catch (error) {
    console.error('Error fetching GNB data:', error);
    return [];
  }
}

