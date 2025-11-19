import { getGnb } from '@/features/navigation/lib/getGnb';
import { withApiHandler } from '@/shared/lib/api/response';

export async function GET() {
  return withApiHandler(() => getGnb(), 'Failed to fetch GNB data');
}
