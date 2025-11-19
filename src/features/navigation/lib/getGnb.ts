import { NotionUtils } from '@/shared/lib/notion/utils';
import { GnbItem } from '@/shared/types/api';
import { getNotionQuery } from '@/shared/lib/notion/client';
import { NOTION_DB_GNB_ID } from '@/shared/lib/notion/config';

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
      .map((item) => {
        const url = NotionUtils.getString(item.properties.url);
        const menuKo = NotionUtils.getString(item.properties.menu_ko);
        const menuEn = NotionUtils.getString(item.properties.menu_en);

        if (!url || !menuKo || !menuEn) {
          return null;
        }

        return {
          id: item.id,
          order: NotionUtils.getNumber(item.properties.order),
          isActive: NotionUtils.getBoolean(item.properties.is_active),
          url,
          menu: {
            ko: menuKo,
            en: menuEn
          }
        };
      })
      .filter((item): item is GnbItem => item !== null && item.isActive)
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
