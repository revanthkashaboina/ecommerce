// import { getCollections, getPages, getProducts } from 'lib/shopify';
// import { getCollections, getPages, getProducts } from 'lib/backendUtils';

import { MetadataRoute } from 'next';

type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString()
  }));

  // const collectionsPromise = getCollections().then((collections:any) =>
  //   collections.map((collection:any) => ({
  //     url: `${baseUrl}${collection.path}`,
  //     lastModified: collection.updatedAt
  //   }))
  // );

  // const productsPromise = getProducts({}).then((products:any) =>
  //   products.map((product:any) => ({
  //     url: `${baseUrl}/product/${product.handle}`,
  //     lastModified: product.updatedAt
  //   }))
  // );

  // const pagesPromise = getPages().then((pages:any) =>
  //   pages.map((page:any) => ({
  //     url: `${baseUrl}/${page.handle}`,
  //     lastModified: page.updatedAt
  //   }))
  // );

  let fetchedRoutes: Route[] = [];

  // try {
  //   fetchedRoutes = (await Promise.all([collectionsPromise, productsPromise, pagesPromise])).flat();
  // } catch (error) {
  //   throw JSON.stringify(error, null, 2);
  // }

  return [...routesMap, ...fetchedRoutes];
}
