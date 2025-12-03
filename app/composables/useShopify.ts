// Shopify Composable
// Provides reactive access to Shopify products and collections

import type { ShopifyProduct, ShopifyCollection } from '~/types/shopify'
import { shopifyFetch } from '~/utils/shopify'
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE, GET_COLLECTION_BY_HANDLE } from '~/utils/queries'

interface ProductsResponse {
  products: {
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
    edges: Array<{ node: ShopifyProduct }>
  }
}

interface ProductResponse {
  productByHandle: ShopifyProduct | null
}

interface CollectionResponse {
  collectionByHandle: ShopifyCollection | null
}

export function useShopify() {
  const config = useRuntimeConfig()
  const isConfigured = computed(() => {
    return !!(config.public.shopifyStoreDomain && config.public.shopifyStorefrontToken)
  })

  async function getProducts(options: {
    first?: number
    after?: string
    query?: string
  } = {}): Promise<{ products: ShopifyProduct[]; hasNextPage: boolean; endCursor: string | null }> {
    if (!isConfigured.value) {
      console.warn('Shopify is not configured. Returning empty products.')
      return { products: [], hasNextPage: false, endCursor: null }
    }

    const { first = 20, after, query } = options
    const data = await shopifyFetch<ProductsResponse>(GET_PRODUCTS, { first, after, query })

    return {
      products: data.products.edges.map(edge => edge.node),
      hasNextPage: data.products.pageInfo.hasNextPage,
      endCursor: data.products.pageInfo.endCursor,
    }
  }

  async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
    if (!isConfigured.value) {
      console.warn('Shopify is not configured. Returning null.')
      return null
    }

    const data = await shopifyFetch<ProductResponse>(GET_PRODUCT_BY_HANDLE, { handle })
    return data.productByHandle
  }

  async function getCollectionByHandle(handle: string, first: number = 20): Promise<ShopifyCollection | null> {
    if (!isConfigured.value) {
      console.warn('Shopify is not configured. Returning null.')
      return null
    }

    const data = await shopifyFetch<CollectionResponse>(GET_COLLECTION_BY_HANDLE, { handle, first })
    return data.collectionByHandle
  }

  return {
    isConfigured,
    getProducts,
    getProductByHandle,
    getCollectionByHandle,
  }
}
