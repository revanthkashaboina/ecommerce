import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        // <Grid.Item key={product.handle} className="animate-fadeIn">
        //   <Link className="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
        //     <GridTileImage
        //       alt={product.title}
        //       label={{
        //         title: product.title,
        //         amount: product.priceRange.maxVariantPrice.amount,
        //         currencyCode: product.priceRange.maxVariantPrice.currencyCode
        //       }}
        //       src={product.featuredImage?.url}
        //       fill
        //       sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        //     />
        //   </Link>
        // </Grid.Item>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
          <article className="product-card cart-type-xenon border-border-200 bg-light h-full transform overflow-hidden rounded border border-opacity-70 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow">
            <div className="relative flex h-48 w-auto cursor-pointer items-center justify-center sm:h-64">
              <span className="sr-only">Product Image</span>
              <Link
                className="relative block aspect-square h-full w-full"
                href={`/product/${product.handle}`}
              >
                <Image
                  src={product.featuredImage.url}
                  // src="https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/115/FOREVER_21.jpg"
                  sizes="(max-width: 768px) 100vw"
                  className="product-image object-contain"
                  // priority={priority}
                  alt={product.title}
                  fill
                />
                <div className="absolute top-3 rounded bg-[#009F7F] px-1.5 text-xs font-semibold leading-6 text-[#FFFFFF] ltr:left-3 rtl:right-3 md:top-4 md:px-2 ltr:md:left-4 rtl:md:right-4 lg:px-2.5">
                  13%
                </div>
              </Link>
            </div>
            <header className="p-3 md:p-6">
              <h3 className="text-body cursor-pointer truncate text-xs text-[#6B7280] md:text-sm">
                {product.title as string}
              </h3>
              <div className="mt-2 flex items-center justify-between text-[#1F2937]">
                <div>
                  <span className="text-heading text-sm font-semibold md:text-base">
                    {product.priceRange.maxVariantPrice.amount}
                  </span>
                  <span className="text-heading text-sm font-semibold md:text-base">
                    {product.priceRange.maxVariantPrice.currencyCode}
                  </span>
                </div>
              </div>
            </header>
          </article>
        </div>
      ))}
    </>
  );
}
