// import { Carousel } from 'components/carousel';
// // import { ThreeItemGrid } from 'components/grid/three-items';
// import Footer from 'components/layout/footer';
// import ProductsPage from "components/products/index";
// import { Suspense } from 'react';

// // export const runtime = 'edge';
// export const runtime = 'nodejs'

// export const metadata = {
//   description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
//   openGraph: {
//     type: 'website'
//   }
// };

// export default async function HomePage() {
//   return (
//     <>
//       {/* <ThreeItemGrid /> */}
//       <ProductsPage />
//       <Suspense>
//         <Carousel />
//         <Suspense>
//           <Footer />
//         </Suspense>
//       </Suspense>
//     </>
//   );
// }

//=======================================================================

// 'use client'
// import Navbar from 'components/layout/navbar';
// import { Inter } from 'next/font/google';
// import { ReactNode, Suspense } from 'react';
// import './globals.css';
// import ProductsPage from "components/products/index";
// import { ThreeItemGridItem } from 'components/products';
// import {
//   InstantSearch,
//   Configure,
//   Hits,
//   Pagination,
//   InfiniteHits
// } from 'react-instantsearch-dom';

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

// const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
// const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
//   ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
//   : 'http://localhost:3000';

// export const metadata = {
//   metadataBase: new URL(baseUrl),
//   title: {
//     default: SITE_NAME!,
//     template: `%s | ${SITE_NAME}`
//   },
//   robots: {
//     follow: true,
//     index: true
//   },
//   ...(TWITTER_CREATOR &&
//     TWITTER_SITE && {
//     twitter: {
//       card: 'summary_large_image',
//       creator: TWITTER_CREATOR,
//       site: TWITTER_SITE
//     }
//   })
// };

// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter'
// });

// export default async function HomePage() {
//   return (
//     <html lang="en" className={inter.variable}>
//       <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
//         {/* <InstantSearch indexName="Products" searchClient={typesenseInstantsearchAdapter.searchClient}>
//           <Navbar />
//         </InstantSearch> */}
//           {/* <Navbar /> */}
//         {/* <InstantSearch indexName="Products" searchClient={typesenseInstantsearchAdapter.searchClient}> */}
//           {/* <Navbar /> */}
//           {/* <Hits hitComponent={({ hit }: { hit: any }) => <ThreeItemGridItem item={hit} size="half" priority={true} />} /> */}
//           {/* <Configure hitsPerPage={100} /> */}
//           {/* <Pagination /> */}

//         {/* </InstantSearch> */}

//         {/* <Suspense>
//           <main>{children}</main>
//         </Suspense> */}
//       </body>
//     </html>
//   );
// }

//============================================================================

import PageProducts from './pageProducts';
import { Carousel } from 'components/carousel';
// import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
// import ProductsPage from "components/products/index";
import { Suspense } from 'react';

// export const runtime = 'edge';
export const runtime = 'nodejs';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      {/* <ThreeItemGrid /> */}
      {/* <ProductsPage /> */}
      <PageProducts />
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
