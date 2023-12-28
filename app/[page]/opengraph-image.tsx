import OpengraphImage from 'components/opengraph-image';
// import { getPage } from 'lib/shopify';
// import { getPage } from 'lib/backendUtils';
import { getPage } from 'lib/cwcommerce';

// export const runtime = 'edge';
export const runtime = 'nodejs';

export default async function Image({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);
  const title = page.seo?.title || page.title;
  return await OpengraphImage({ title });
}
