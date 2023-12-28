import { kv } from '@vercel/kv';
import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { revalidateTag } from 'next/cache';
import Typesense from 'typesense';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
import { getMenuQuery } from './queries/menu';
import { getPageQuery, getPagesQuery } from './queries/page';
import { getProductRecommendationsQuery } from './queries/product';
import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductRecommendationsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from './types';

const domain = `https://${process.env.SHOPIFY_STORE_DOMAIN!}`;
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

// CW Commerce Related code

export async function getProducts(data: any) {
  console.log('called=====>');
  const endpoint = 'https://dev-services.cwcloud.in/retail/graphql';
  const query = `
  query {
    getProducts1(bUnit:"6C3C32C267534614973DFCFE3C43D209" from:0 limit:10) {
      mProductId
      csClientId
      csBunitId
      created
      createdby
      updated
      isactive
      updatedby
      sunitprice
      slistprice
      onhandQty
      description
      isVirtual
      isBestSeller
      cTaxId
      taxRate
      isPromoApplicable
      isavailable
      ismonday
      istuesday
      iswednesday
      isthursday
      isfriday
      issaturday
      issunday
      colorcode
      cwrMenuTimeslot {
        cwrMenuTimeslotId
        name
        startTime
        endTime
      }
      mProduct {
        value
        name
        csTaxcategoryId
        mProductCategoryId
        productCategoryName
        csUomId
        uomName
        upc
        batchedProduct
        isManualQty
        isDecimal
        imageurl
        shortDescription
        hsncode
        returnable
        returnDays
        description
        batchedForSale
        batchedForStock
        multiPrice
        shelfLife
        isBag
        taxCategory {
          csTaxcategoryID
          name
          overRideTax
          overRideCondition
          contraTaxCategoryId
          contraTaxCategory
          {
            contraTaxCategoryName
            contraTaxId
            contraTaxName
            contraRate
          }
        }
        mBatch {
          mBatchId
          batchno
          upc
          price
          listPrice
          startdate
          enddate
          life
        }
        productGroup {
          mProductGroupId
          name
          value
          description
        }
        productAddons {
          mProductAddOnId
          name
          price
          mAddonGroup {
            mAddonGroupId
            name
            maxqty
            minqty
            type
          }
          mAddonProduct {
            mProductId
            name
          }
        }
        productAttributes {
          mProductAttributeId
          value
          mAttributeGroup {
            mAttributeGroupId
            name
          }
          mAttribute {
            mAttributeId
            name
          }
        }
        productManufacturer {
          mProductManufacturerId
          name
          value
          description
        }
        productBrand {
          brandId
          name
          value
          description
        }
      }
    }
  }
  `;

  const headers = {
    'Content-Type': 'application/json',
    X_API_KEY: 'a1b2c33d4e5f6g7h8i9jakblc',
    tenantId: '8C5195811F3F493083C2272BA921001B'
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    const responseData = data.data.getProducts1;
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    console.log('responseData==============>', responseData);
    return formatProductsData(responseData);
  } catch (error: any) {
    console.error('Error fetching products:', error.message);
    throw error;
  }
}

// export async function getProducts(data:any) {
//   const endpoint1 = "http://localhost:3000/catalog/products?bUnit=6C3C32C267534614973DFCFE3C43D209&from=0&limit=40"
//   const headers = {
//     'api_key':'a1b2c33d4e5f6g7h8i9jakblc',
//     'tenant_id': '8C5195811F3F493083C2272BA921001B',
//     'app_id':'1012'
//   };

//   try {
//     const response = await fetch(endpoint1, {
//       method: 'GET',
//       headers,
//     });
//         const data = await response.json();
//         const responseData:[]  = data.data
//     if (response.status !== 200) {
//       throw new Error(`Failed to fetch data. Status: ${response.status}`);
//     }
//    return responseData;
//   } catch (error:any) {
//     console.error('Error fetching products:', error.message);
//     throw error;
//   }
// }

const formatProductsData = async (Data: any) => {
  return Data.map((item: any) => {
    const featuredImage1: any = item.mProduct?.imageurl || '';
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
    return {
      id: item.mProductId,
      handle: item.mProductId,
      availableForSale: true,
      title: item.mProduct.name,
      description: item.description || '',
      descriptionHtml: '',
      options: [
        // {
        //   id: 'gid://shopify/ProductOption/8554919657681',
        //   name: 'Delivery Date',
        //   values: ['2 Jul', '9 Jul', '16 Jul', '23 Jul', '30 Jul'],
        // },
      ],
      priceRange: {
        maxVariantPrice: { amount: item.slistprice, currencyCode: 'INR' },
        minVariantPrice: { amount: item.slistprice, currencyCode: 'INR' }
      },
      variants: [
        // {
        //   id: 'gid://shopify/ProductVariant/39788148883665',
        //   title: '2 Jul',
        //   availableForSale: true,
        //   selectedOptions: [{ name: 'Delivery Date', value: '2 Jul' }],
        //   price: { amount: item.slistprice, currencyCode: 'INR' },
        // },
      ],
      featuredImage: {
        url: featuredImage2,
        altText: 'test1',
        width: 1080,
        height: 1080
      },
      images: [
        {
          url: featuredImage2,
          altText: 'test1',
          width: 1080,
          height: 1080
        }
      ],
      seo: { description: item.description || '', title: item.mProduct.name },
      tags: [],
      updatedAt: item.updated
    };
  });
};

// getProduct -cw commerce //

// export async function getProduct(handle: string): Promise<Product | undefined> {
//   const endpoint = 'https://dev-services.cwcloud.in/retail/graphql';
//   const query = `
//   query {
//     getAllProducts2(name:null,
//       value:null,mProductId:"${handle}",
//       bUnit:"6C3C32C267534614973DFCFE3C43D209" from:0 limit:1000 ){
//       mProductId
//       csClientId
//       csBunitId
//       created
//       createdby
//       updated
//       isactive
//       updatedby
//       sunitprice
//       slistprice
//       onhandQty
//       description
//       isVirtual
//       isBestSeller
//       cTaxId
//       taxRate
//       isPromoApplicable
//       isavailable
//       ismonday
//       istuesday
//       iswednesday
//       isthursday
//       isfriday
//       issaturday
//       issunday
//       colorcode
//       productionCenter
//       cwrMenuTimeslot{
//       cwrMenuTimeslotId
//       name
//       startTime
//       endTime
//       }
//       mProduct{
//       value
//       name
//       csTaxcategoryId
//       mProductCategoryId
//       productCategoryName
//       csUomId
//       uomName
//       purchasePrice
//       listPrice
//       salePrice
//       upc
//       batchedProduct
//       isManualQty
//       isDecimal
//       imageurl
//       shortDescription
//       hsncode
//       returnable
//       returnDays
//       description
//       batchedForSale
//       batchedForStock
//       multiPrice
//       shelfLife
//       name2
//       isBag
//       taxCategory{
//       csTaxcategoryID
//       name
//       overRideTax
//       overRideCondition
//       contraTaxCategoryId
//       contraTaxCategory
//       {
//       contraTaxCategoryName
//       contraTaxId
//       contraTaxName
//       contraRate
//       }
//       }
//       mBatch{
//       mBatchId
//       batchno
//       upc
//       price
//       startdate
//       enddate
//       life
//       description
//       }
//       productGroup{
//       mProductGroupId
//       name
//       value
//       description
//       }
//       productAddons{
//       mProductAddOnId
//       name
//       price
//       mAddonGroup{
//       mAddonGroupId
//       name
//       maxqty
//       minqty
//       type
//       }
//       mAddonProduct{
//       mProductId
//       name
//       }
//       }
//       productAttributes{
//       mProductAttributeId
//       value
//       mAttributeGroup{
//       mAttributeGroupId
//       name
//       }
//       mAttribute{
//       mAttributeId
//       name
//       }
//       }
//       productManufacturer{
//       mProductManufacturerId
//       name
//       value
//       description
//       }
//       productBrand{
//       brandId
//       name
//       value
//       description
//       }
//       }
//   }
//   }
//   `;

//   const headers = {
//     'Content-Type': 'application/json',
//     'X_API_KEY':'a1b2c33d4e5f6g7h8i9jakblc',
//     'tenantId': '8C5195811F3F493083C2272BA921001B',
//   };

//   try {
//     const response = await fetch(endpoint, {
//       method: 'POST',
//       headers,
//       body:JSON.stringify({query}),
//     });
//         const data = await response.json();
//         const product  = data.data.getAllProducts2[0]
//     if (!response.ok) {
//       throw new Error(`Failed to fetch data. Status: ${response.status}`);
//     }

//     const featuredImage1:any = product.mProduct?.imageurl || '';
//     const featuredImage2 = new URL(featuredImage1).host === "m.media-amazon.com" || new URL(featuredImage1).host === "exceloid-image-master.s3.us-east-1.amazonaws.com" ||
//     new URL(featuredImage1).host === "www.urbanwardrobe.in" ||
//     new URL(featuredImage1).host === "wolfiekids.com" || new URL(featuredImage1).host === "www.wrangler.in" ||
//     new URL(featuredImage1).host === "www.uniprints.in" || new URL(featuredImage1).host === "images.glowroad.com" || new URL(featuredImage1).host === "laxmipati.com"  ? featuredImage1 : "https://m.media-amazon.com/images/I/714zCgmX+JL._UX569_.jpg"
//     const obj = {
//       id: product.mProductId,
//       handle: product.mProductId,
//       availableForSale: true,
//       title:product.mProduct.name,
//       description:product.mProduct.description,
//       descriptionHtml:product.mProduct.description,
//       options: [
//       //   {
//       //   id: 'gid://shopify/ProductOption/8554919657681',
//       //   name: 'Delivery Date',
//       //   values: [ '2 Jul', '9 Jul', '16 Jul', '23 Jul', '30 Jul' ]
//       // }
//     ],
//       priceRange: { maxVariantPrice: { amount: product.slistprice, currencyCode: 'INR' }, minVariantPrice: { amount: product.slistprice, currencyCode: 'INR' } },
//       variants: [
//         {
//           // id: 'gid://shopify/ProductVariant/39788148883665',
//           id: product.mProductId,
//           title: '2 Jul',
//           availableForSale: true,
//           selectedOptions: [ { name: 'Delivery Date', value: '2 Jul' } ],
//           price: { amount: product.slistprice, currencyCode: 'INR' }
//         },
//       ],
//       featuredImage: {
//         url:featuredImage2,
//         altText:`test1${product.mProductId}`,
//         width: 1080,
//         height: 1080
//       },
//       images: [
//         {
//           url: featuredImage2,
//           altText: `test1${product.mProductId}`,
//           width: 1080,
//           height: 1080
//         }
//       ],
//       seo: { description:product.mProduct.name, title: product.mProduct.name },
//       tags: [],
//       updatedAt:product.updated
//         }
//         return obj
//   } catch (error:any) {
//     console.error('Error fetching products:', error.message);
//     throw error;
//   }
// }

// Function to fetch a product from Typesense based on handle
export async function getProduct(handle: string): Promise<any | undefined> {
  try {
    const client = new Typesense.Client({
      nodes: [
        {
          host: '95.216.171.30',
          port: 8108,
          protocol: 'http'
        }
      ],
      apiKey: 'exceloid-test'
    });

    const searchParameters = {
      q: handle,
      query_by: 'handle',
      // num_typos: 0,
      per_page: 1
    };
    // console.log(searchParameters)

    const searchResults = await client.collections('Products').documents().search(searchParameters);
    // console.log("searchResults===========================>", searchResults)

    if (searchResults && searchResults.hits.length > 0) {
      const product = searchResults.hits[0];
      // console.log("product====================================>", product)
      const obj = {
        id: product?.document.id,
        handle: product?.document.handle,
        availableForSale: product?.document.availableForSale,
        title: product?.document.title,
        description: product?.document.description,
        descriptionHtml: product?.document.descriptionHtml,
        featuredImage: product?.document.featuredImage,
        images: product?.document.images,
        priceRange: product?.document.priceRange,
        category: product?.document.category,
        options: product?.document.options,
        seo: product?.document.seo,
        tags: product?.document.tags,
        updatedAt: product?.document.updatedAt,
        variants: product?.document.variants,
        highlights: product.document.highlights
      };

      return obj;
    } else {
      throw new Error('Product not found'); // Handle case when product is not found in Typesense
    }
  } catch (error: any) {
    console.error('Error fetching product:', error.message);
    throw error;
  }
}

// getProducts2()

//CW Commerce End

export async function getCartId() {
  const cartId = cookies().get('cartId')?.value;
  return cartId;
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD'
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
  if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart2(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  });
  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function createCart() {
  const generatedId = uuidv4().toUpperCase();
  const uniqueId = generatedId.replace('-', '');

  const cartData = {
    id: uniqueId,
    checkoutUrl: 'localhost:3000/checkout',
    cost: {
      subtotalAmount: { amount: '0.0', currencyCode: 'INR' },
      totalAmount: { amount: '0.0', currencyCode: 'INR' },
      totalTaxAmount: { amount: '0.0', currencyCode: 'INR' }
    },
    lines: [],
    totalQuantity: 0
  };

  await kv.set(`cart:${uniqueId}`, cartData);
  const session = await kv.get(`cart:${uniqueId}`);
  return session;
}

export async function addToCart2(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
) {
  const lineId: any = lines[0]?.merchandiseId;
  const getProductToInsert: any = await getProduct(lineId);
  // console.log("newResponse=================>",newResponse)
  // const getProductToInsert:any = await kv.get(`product:${lineId}`)
  const generatedId = uuidv4().toUpperCase();
  const uniqueId = generatedId.replace('-', '');
  const existingCart: any = await kv.get(`cart:${cartId}`);

  const newAllLines = existingCart.lines;

  const cartLine = newAllLines.find((line: any) => line.merchandise.id === lineId);

  if (cartLine) {
    cartLine.quantity++;
    cartLine.cost = {
      totalAmount: {
        amount: getProductToInsert.priceRange.minVariantPrice.amount * cartLine.quantity,
        currencyCode: 'INR'
      }
    };
  } else {
    newAllLines.push({
      id: uniqueId,
      quantity: 1,
      cost: {
        totalAmount: {
          amount: getProductToInsert.priceRange.minVariantPrice.amount,
          currencyCode: 'INR'
        }
      },
      merchandise: {
        id: getProductToInsert.id,
        title: '2 Jul',
        selectedOptions: [{ name: 'Delivery Date', value: '2 Jul' }],
        product: {
          id: 'gid://shopify/Product/6661117706449',
          handle: getProductToInsert.id,
          availableForSale: true,
          title: getProductToInsert.title,
          description: getProductToInsert.description,
          descriptionHtml: getProductToInsert.description,
          options: [
            {
              id: 'gid://shopify/ProductOption/8554919657681',
              name: 'Delivery Date',
              values: ['2 Jul', '9 Jul', '16 Jul', '23 Jul', '30 Jul']
            }
          ],
          priceRange: getProductToInsert.priceRange,
          // variants: [
          //       {
          //         id: getProductToInsert.mProductId,
          //         title: '2 Jul',
          //         availableForSale: true,
          //         selectedOptions: [{ name: 'Delivery Date', value: '2 Jul' }],
          //         price: { amount: getProductToInsert.slistprice, currencyCode: 'INR' },
          //       },
          //     ],
          variants: getProductToInsert.variants,
          // featuredImage: {
          //   url: getProductToInsert.mProduct.imageurl,
          //   altText: `test1${getProductToInsert.mProductId}`,
          //   width: 1080,
          //   height: 1080
          // },
          featuredImage: getProductToInsert.featuredImage,
          // images:[
          //     {
          //       url:getProductToInsert.mProduct.imageurl,
          //       altText: `test1${getProductToInsert.mProductId}`,
          //       width: 1080,
          //       height: 1080
          //     }
          //   ],
          images: getProductToInsert.images,
          // seo: { description: getProductToInsert.mProduct.description, title: getProductToInsert.mProduct.name },
          seo: getProductToInsert.seo,
          // tags: [],
          tags: getProductToInsert.tags,
          // updatedAt: getProductToInsert.updated
          updatedAt: getProductToInsert.updatedAt
        }
      }
    });
  }
  // price and qty calculations //

  const totalQuantity = newAllLines.reduce(
    (total: any, cartLine: any) => total + cartLine.quantity,
    0
  );
  const totalAmount = newAllLines.reduce(
    (total: any, cartLine: any) => total + cartLine.cost.totalAmount.amount,
    0
  );
  const cartData = {
    id: cartId,
    checkoutUrl: '/checkout',
    cost: {
      subtotalAmount: { amount: totalAmount, currencyCode: 'INR' },
      totalAmount: { amount: totalAmount, currencyCode: 'INR' },
      totalTaxAmount: { amount: '0.0', currencyCode: 'INR' }
    },
    lines: newAllLines,
    totalQuantity: totalQuantity
  };

  await kv.set(`cart:${cartId}`, cartData);
  const session = await kv.get(`cart:${cartId}`);
  return session;
}

export async function removeFromCart2(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const getCartData: any = await kv.get(`cart:${cartId}`);

  // Filter out the cart lines with the specified lineIds.
  const filteredCartLines = getCartData.lines.filter((line: any) => !lineIds.includes(line.id));
  getCartData.lines = filteredCartLines;
  const totalQuantity = getCartData.lines.reduce(
    (total: any, cartLine: any) => total + cartLine.quantity,
    0
  );
  const totalAmount = getCartData.lines.reduce(
    (total: any, cartLine: any) => total + cartLine.cost.totalAmount.amount,
    0
  );
  getCartData.cost = {
    subtotalAmount: { amount: totalAmount, currencyCode: 'INR' },
    totalAmount: { amount: totalAmount, currencyCode: 'INR' },
    totalTaxAmount: { amount: '0.0', currencyCode: 'INR' }
  };
  getCartData.totalQuantity = totalQuantity;
  await kv.set(`cart:${cartId}`, getCartData);
  const sessionData: any = await kv.get(`cart:${cartId}`);
  return sessionData;
  // return {}
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });
  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart2(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store'
  });
  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCart(cartId: string) {
  const session = await kv.get(`cart:${cartId}`);
  if (!session) {
    return undefined;
  }
  return session;
}

// export async function createRadisOrder(data:any) {
//   return {}
// }

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });
  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
    }
  });
  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }
  return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections]
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      seo: {
        title: 'All',
        description: 'All products'
      },
      path: '/search',
      updatedAt: new Date().toISOString()
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith('hidden')
    )
  ];
  // console.log("collections==================>",collections)
  // return [];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });
  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', '')
    })) || []
  );
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  });
  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });
  return removeEdgesAndNodes(res.body.data.pages);
}

// export async function getProduct(handle: string): Promise<Product | undefined> {
//   const res = await shopifyFetch<ShopifyProductOperation>({
//     query: getProductQuery,
//     tags: [TAGS.products],
//     variables: {
//       handle
//     }
//   });
//   return reshapeProduct(res.body.data.product, false);
// }

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId
    }
  });
  return reshapeProducts(res.body.data.productRecommendations);
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];
  const topic = headers().get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);
  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
