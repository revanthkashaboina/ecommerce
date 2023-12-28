import OpengraphImage from 'components/opengraph-image';

// export const runtime = 'edge';
export const runtime = 'nodejs';

export default async function Image() {
  return await OpengraphImage();
}
