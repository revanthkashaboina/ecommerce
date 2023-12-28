import { defaultSort, sorting } from 'lib/constants';
// import { getProducts } from 'lib/medusa';
// import type { Product } from 'lib/shopify/types';
// import { getProducts } from 'lib/backendUtils';
// import { getProducts } from 'lib/shopify';
import type { Product } from 'lib/medusa/types';
import Link from 'next/link';
// import { GridTileImage } from './tile';
import Image from 'next/image';

const domain: any = process.env.BACKEND_LIBRARY;
let seacrKKy: any;
if (domain === 'Shopify') {
  seacrKKy = '2';
} else if (domain === 'Cwcommerce') {
  seacrKKy = '2';
} else {
  seacrKKy = 'medusa';
}

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  console.log('item=============>', item);

  const featuredImage1: any = item.featuredImage?.url || '';
  const featuredImage2 =
    new URL(featuredImage1).host === 'm.media-amazon.com' ||
    new URL(featuredImage1).host === 'exceloid-image-master.s3.us-east-1.amazonaws.com' ||
    new URL(featuredImage1).host === 'www.urbanwardrobe.in' ||
    new URL(featuredImage1).host === 'wolfiekids.com' ||
    new URL(featuredImage1).host === 'www.wrangler.in' ||
    new URL(featuredImage1).host === 'www.uniprints.in' ||
    new URL(featuredImage1).host === 'images.glowroad.com' ||
    new URL(featuredImage1).host === 'laxmipati.com'
      ? featuredImage1
      : 'https://m.media-amazon.com/images/I/714zCgmX+JL._UX569_.jpg';
  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
        <article className="product-card cart-type-xenon border-border-200 bg-light h-full transform overflow-hidden rounded border border-opacity-70 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow">
          <div className="relative flex h-48 w-auto cursor-pointer items-center justify-center sm:h-64">
            <span className="sr-only">Product Image</span>
            <Link
              className="relative block aspect-square h-full w-full"
              href={`/product/${item.handle}`}
            >
              <Image
                src={featuredImage2}
                sizes="(max-width: 768px) 100vw"
                className="product-image object-contain"
                // priority={priority}
                priority={priority}
                // alt={item.title}
                alt="test1"
                fill
              />
              <div className="absolute top-3 rounded bg-[#009F7F] px-1.5 text-xs font-semibold leading-6 text-[#FFFFFF] ltr:left-3 rtl:right-3 md:top-4 md:px-2 ltr:md:left-4 rtl:md:right-4 lg:px-2.5">
                13%
              </div>
            </Link>
          </div>
          <header className="p-3 md:p-6">
            <h3 className="text-body cursor-pointer truncate text-xs text-[#6B7280] md:text-sm">
              {item.title as string}
            </h3>
            <div className="mt-2 flex items-center justify-between text-[#1F2937]">
              <div>
                <span className="text-heading text-sm font-semibold md:text-base">
                  {item.priceRange.maxVariantPrice.amount}
                </span>
                <span className="text-heading text-sm font-semibold md:text-base">
                  {item.priceRange.maxVariantPrice.currencyCode}
                </span>
              </div>
            </div>
          </header>
        </article>
      </div>
    </section>
  );
}

export async function ThreeItemGrid() {
  let searchParams: any = 'medusa';
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  // const homepageItems =  await getProducts({ sortKey, reverse, query: seacrKKy });
  const homepageItems: [] = [];

  return (
    // <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-5 md:grid-rows-2">
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {homepageItems?.map((product: any) => (
        <ThreeItemGridItem size="half" item={product} priority={true} />
      ))}
    </section>
  );
}
