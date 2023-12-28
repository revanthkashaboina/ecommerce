let backendFunctions: any;
if (process.env.BACKEND_LIBRARY === 'Shopify') {
  backendFunctions = require('lib/shopify');
} else if (process.env.BACKEND_LIBRARY === 'Medusa') {
  backendFunctions = require('lib/medusa');
} else if (process.env.BACKEND_LIBRARY === 'Cwcommerce') {
  backendFunctions = require('lib/cwcommerce');
}
// else{
//   throw new Error('Invalid backend library configuration');
// }
console.log('process.env.BACKEND_LIBRARY===============>', process.env.BACKEND_LIBRARY);
console.log('backendFunctions===========================>', backendFunctions);
export const getProduct = backendFunctions?.getProduct;
export const getProducts = backendFunctions?.getProducts;
export const createCart = backendFunctions?.createCart;
export const addToCart = backendFunctions?.addToCart;
export const removeFromCart = backendFunctions?.removeFromCart;
export const updateCart = backendFunctions?.updateCart;
export const getCart = backendFunctions?.getCart;
export const getCollection = backendFunctions?.getCollection || backendFunctions?.getCategory;
export const getCollectionProducts =
  backendFunctions?.getCollectionProducts || backendFunctions?.getCategoryProducts;
export const getCollections = backendFunctions?.getCollections || backendFunctions?.getCategories;
export const getMenu = backendFunctions?.getMenu;
export const getPage = backendFunctions?.getPage;
export const getPages = backendFunctions?.getPages;
export const getProductRecommendations = backendFunctions?.getProductRecommendations;
export const revalidate = backendFunctions?.revalidate;
