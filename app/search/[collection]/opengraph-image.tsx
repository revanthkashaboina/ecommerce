import OpengraphImage from 'components/opengraph-image';
// import { getCollection } from 'lib/shopify';
// import { getCollection } from 'lib/backendUtils';
import { getCollection } from 'lib/cwcommerce';

// export const runtime = 'edge';
export const runtime = 'nodejs';

export default async function Image({ params }: { params: { collection: string } }) {
  const collection = await getCollection(params.collection);
  const title = collection?.seo?.title || collection?.title;
  return await OpengraphImage({ title });
}
