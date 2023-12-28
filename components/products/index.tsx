// 'use client'
// import 'instantsearch.css/themes/satellite.css';
// import type { Product } from 'lib/medusa/types';
// import './index.css'
// import Link from 'next/link';
// import {
//   InstantSearch,
//   SearchBox,
//   Configure,
//   Hits,
//   Pagination,
//   InfiniteHits,
//   connectAutoComplete
// } from 'react-instantsearch-dom';
// import Autocomplete from './Autocomplete';
// // import { GridTileImage } from './tile';
// import Image from 'next/image';

// import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
// const TYPESENSE_SERVER_CONFIG = {
//   apiKey: 'exceloid-test',
//   nodes: [
//     {
//       host: '95.216.171.30',
//       port: 8108,
//       protocol: 'http',
//     },
//   ],
// };

// const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
//   server: TYPESENSE_SERVER_CONFIG,
//   additionalSearchParameters: {
//     query_by: 'title,description',
//     num_typos: 1,
//     typo_tokens_threshold: 1,
//   },
// });

// // Connect Autocomplete  with Typesense InstantSearch adapter
// const CustomAutocomplete = connectAutoComplete(Autocomplete);

// export default function TypesenseSearch() {
//   function ThreeItemGridItem({
//     item,
//     size,
//     priority,
//   }: {
//     item: Product;
//     size: 'full' | 'half';
//     priority?: boolean;
//   })
//    {
//     const featuredImage1 = item.featuredImage?.url || '';
//     const featuredImage2 =
//       new URL(featuredImage1).host === 'm.media-amazon.com' ||
//       new URL(featuredImage1).host === 'exceloid-image-master.s3.us-east-1.amazonaws.com' ||
//       new URL(featuredImage1).host === 'www.urbanwardrobe.in' ||
//       new URL(featuredImage1).host === 'wolfiekids.com' ||
//       new URL(featuredImage1).host === 'www.wrangler.in' ||
//       new URL(featuredImage1).host === 'www.uniprints.in' ||
//       new URL(featuredImage1).host === 'images.glowroad.com' ||
//       new URL(featuredImage1).host === 'laxmipati.com'
//         ? featuredImage1
//         : 'https://m.media-amazon.com/images/I/714zCgmX+JL._UX569_.jpg';

//     return (

//       <article className="hit product-card cart-type-xenon h-full transform overflow-hidden rounded border border-border-200 border-opacity-70 bg-light transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow">
//         <div className="relative flex h-48 w-auto cursor-pointer items-center justify-center sm:h-64">
//           <span className="sr-only">Product Image</span>
//           <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}>
//             <Image
//               src={featuredImage2}
//               sizes="(max-width: 768px) 100vw"
//               className="product-image object-contain"
//               priority={priority}
//               alt="test1"
//               fill
//             />
//             <div className="absolute top-3 rounded bg-[#009F7F] px-1.5 text-xs font-semibold leading-6 text-[#FFFFFF] ltr:left-3 rtl:right-3 md:top-4 md:px-2 ltr:md:left-4 rtl:md:right-4 lg:px-2.5">
//               13%
//             </div>
//           </Link>
//         </div>
//         <header className="p-3 md:p-6">
//           <h3 className="cursor-pointer truncate text-xs text-body md:text-sm text-[#6B7280]">{item.title as string}</h3>
//           <div className="mt-2 flex items-center justify-between text-[#1F2937]">
//             <div>
//               <span className="text-sm font-semibold text-heading md:text-base">{item.priceRange.maxVariantPrice.amount}</span>
//               <span className="text-sm font-semibold text-heading md:text-base">{item.priceRange.maxVariantPrice.currencyCode}</span>
//             </div>
//           </div>
//         </header>
//       </article>
//     //   <div className="hit bg-white p-4 box-border shadow-md">
//     //   <div className="hit-image text-center">
//     //     <img src={featuredImage2} alt={"test2"} className="max-h-32 mx-auto" />
//     //   </div>
//     //   <div>
//     //     <h2 className="text-lg font-semibold">{item.title}</h2>
//     //     <div>
//     //       {/* By <strong>{item}</strong> in <strong>{hit.categories[0]}</strong> */}
//     //     </div>
//     //   </div>
//     // </div>
//     );
//   }

//   return (
//     <div>
//       <InstantSearch indexName="Products" searchClient={typesenseInstantsearchAdapter.searchClient}>
//         {/* <CustomAutocomplete  /> */}
//           <Hits hitComponent={({ hit }: { hit: any }) => <ThreeItemGridItem item={hit} size="half" priority={true} />} />
//         <Configure hitsPerPage={100} />
//         <Pagination />
//       </InstantSearch>
//     </div>
//   );
// }

// 'use client'
// import 'instantsearch.css/themes/satellite.css';
// import type { Product } from 'lib/medusa/types';
// import Link from 'next/link';
// import Image from 'next/image';

// Hit component
// export function Hit({ hit }: { hit: Product }) {
//   const featuredImage1 = hit.featuredImage?.url || '';
//   const featuredImage2 =
//     new URL(featuredImage1).host === 'm.media-amazon.com' ||
//     new URL(featuredImage1).host === 'exceloid-image-master.s3.us-east-1.amazonaws.com' ||
//     new URL(featuredImage1).host === 'www.urbanwardrobe.in' ||
//     new URL(featuredImage1).host === 'wolfiekids.com' ||
//     new URL(featuredImage1).host === 'www.wrangler.in' ||
//     new URL(featuredImage1).host === 'www.uniprints.in' ||
//     new URL(featuredImage1).host === 'images.glowroad.com' ||
//     new URL(featuredImage1).host === 'laxmipati.com'
//       ? featuredImage1
//       : 'https://m.media-amazon.com/images/I/714zCgmX+JL._UX569_.jpg';

//   return (
//     <article className="hit product-card cart-type-xenon h-full transform overflow-hidden rounded border border-border-200 border-opacity-70 bg-light transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow">
//       <div className="relative flex h-48 w-auto cursor-pointer items-center justify-center sm:h-64">
//         <span className="sr-only">Product Image</span>
//         <Link className="relative block aspect-square h-full w-full" href={`/product/${hit.handle}`}>
//           <Image
//             src={featuredImage2}
//             sizes="(max-width: 768px) 100vw"
//             className="product-image object-contain"
//             priority={true}
//             alt="test1"
//             fill
//           />
//           <div className="absolute top-3 rounded bg-[#009F7F] px-1.5 text-xs font-semibold leading-6 text-[#FFFFFF] ltr:left-3 rtl:right-3 md:top-4 md:px-2 ltr:md:left-4 rtl:md:right-4 lg:px-2.5">
//             13%
//           </div>
//         </Link>
//       </div>
//       <header className="p-3 md:p-6">
//         <h3 className="cursor-pointer truncate text-xs text-body md:text-sm text-[#6B7280]">{hit.title as string}</h3>
//         <div className="mt-2 flex items-center justify-between text-[#1F2937]">
//           <div>
//             <span className="text-sm font-semibold text-heading md:text-base">{hit.priceRange.maxVariantPrice.amount}</span>
//             <span className="text-sm font-semibold text-heading md:text-base">{hit.priceRange.maxVariantPrice.currencyCode}</span>
//           </div>
//         </div>
//       </header>
//     </article>
//   );
// }
//=============================================================================================
// ThreeItemGridItem component

// 'use client'
import 'instantsearch.css/themes/satellite.css';
import type { Product } from 'lib/medusa/types';
import Link from 'next/link';
import Image from 'next/image';

export function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  const featuredImage1 = item.featuredImage?.url || '';
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
    <article className="hit product-card cart-type-xenon border-border-200 bg-light h-full transform overflow-hidden rounded border border-opacity-70 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow">
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
            priority={priority}
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
  );
}

export default function TypesenseSearch() {
  // ... (other code)
}
