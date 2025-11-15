import { getGnb } from '@/lib/navigation/getGnb';
import { withApiHandler } from '@/lib/api/response';


export async function GET() {
  return withApiHandler(() => getGnb(), 'Failed to fetch GNB data');
}
