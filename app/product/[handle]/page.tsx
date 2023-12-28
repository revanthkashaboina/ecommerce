import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { GridTileImage } from 'components/grid/tile';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
// import { getProduct, getProductRecommendations } from 'lib/shopify';
// import { getProduct } from 'lib/backendUtils';
import { getProduct } from 'lib/cwcommerce';
import { Image } from 'lib/shopify/types';
import Link from 'next/link';
let domain = process.env.BACKEND_LIBRARY;
// export const runtime = 'edge';
export const runtime = 'nodejs';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product?.seo?.title || product.title,
    description: product?.seo?.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);
  // console.log("product id for showing data===========>",params.handle)
  // console.log("product------------->",product)
  if (!product) return notFound();

  let proddetails: any;
  if (domain === 'Shopify') {
    proddetails = {
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    };
  } else {
    proddetails = {
      priceCurrency: product.priceRange.maxVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount
    };
  }
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      proddetails
      // modified by Avinash //

      // priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      // highPrice: product.priceRange.maxVariantPrice.amount,
      // lowPrice: product.priceRange.minVariantPrice.amount
      // priceCurrency: product.priceRange.maxVariantPrice.currencyCode,
      // highPrice: product.priceRange.maxVariantPrice.amount,
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="bg-light min-h-screen">
        <article className="bg-light rounded-lg">
          <div className="border-border-200 flex flex-col border-b border-opacity-70 md:flex-row">
            <div className="p-6 pt-10 md:w-1/2 lg:p-14 xl:p-16">
              <div className="mb-8 flex items-center justify-between lg:mb-10">
                {/* {backBtn && <BackButton />}
            {discount && ( */}
                <div className="text-light rounded-full bg-yellow-500 px-3 text-xs font-semibold leading-6 ltr:ml-auto rtl:mr-auto">
                  13%
                </div>
                {/* )} */}
              </div>

              <div className="product-gallery h-full">
                <Gallery
                  images={product.images.map((image: Image) => ({
                    src: image.url,
                    altText: image.altText
                  }))}
                />
                {/* <ThumbsCarousel
              gallery={previewImages}
              video={video}
              hideThumbs={
                previewImages.length && video?.length
                  ? false
                  : previewImages.length <= 1
              }
            /> */}
              </div>
            </div>
            <div className="flex flex-col items-start p-5 pt-10 md:w-1/2 lg:p-14 xl:p-16">
              <ProductDescription product={product} />
            </div>
          </div>
        </article>
      </div>
      {/* <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery
              images={product.images.map((image: Image) => ({
                src: image.url,
                altText: image.altText
              }))}
            />
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts id={product.id} />
        </Suspense>
      </div> */}
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  // const relatedProducts = await getProductRecommendations(id);
  const relatedProducts: any[] = [];

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link className="relative h-full w-full" href={`/product/${product.handle}`}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
