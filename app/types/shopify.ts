// Shopify Types

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  featuredImage: ShopifyImage | null
  images: {
    edges: Array<{ node: ShopifyImage }>
  }
  priceRange: {
    minVariantPrice: ShopifyMoney
    maxVariantPrice: ShopifyMoney
  }
  variants: {
    edges: Array<{ node: ShopifyProductVariant }>
  }
  metafields: ShopifyMetafield[]
  productType: string
  tags: string[]
}

export interface ShopifyProductVariant {
  id: string
  title: string
  price: ShopifyMoney
  compareAtPrice: ShopifyMoney | null
  availableForSale: boolean
  selectedOptions: Array<{
    name: string
    value: string
  }>
  image: ShopifyImage | null
}

export interface ShopifyImage {
  id: string
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyMoney {
  amount: string
  currencyCode: string
}

export interface ShopifyMetafield {
  key: string
  value: string
  type: string
  namespace: string
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: ShopifyMoney
    totalAmount: ShopifyMoney
    totalTaxAmount: ShopifyMoney | null
  }
  lines: {
    edges: Array<{ node: ShopifyCartLine }>
  }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: {
      id: string
      title: string
      handle: string
      featuredImage: ShopifyImage | null
    }
  }
  attributes: Array<{
    key: string
    value: string
  }>
  cost: {
    totalAmount: ShopifyMoney
  }
}

export interface ShopifyCollection {
  id: string
  handle: string
  title: string
  description: string
  image: ShopifyImage | null
  products: {
    edges: Array<{ node: ShopifyProduct }>
  }
}

// Cart Input Types
export interface CartLineInput {
  merchandiseId: string
  quantity: number
  attributes?: Array<{
    key: string
    value: string
  }>
}

// Configurator Types
export interface HoseConfiguration {
  hoseType: HoseType | null
  diameter: HoseDiameter | null
  length: number
  fittingA: FittingType | null
  fittingB: FittingType | null
}

export interface HoseType {
  id: string
  name: string
  description: string
  pricePerFoot: number
  maxPressure: number
  temperatureRange: string
}

export interface HoseDiameter {
  id: string
  name: string
  innerDiameter: number
  multiplier: number
}

export interface FittingType {
  id: string
  name: string
  description: string
  price: number
  compatibleDiameters: string[]
}
