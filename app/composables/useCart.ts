// Cart Composable
// Manages shopping cart state with Shopify Storefront API

import type { ShopifyCart, CartLineInput } from '~/types/shopify'
import { shopifyFetch } from '~/utils/shopify'
import { CREATE_CART, ADD_TO_CART, UPDATE_CART_LINES, REMOVE_FROM_CART, GET_CART } from '~/utils/queries'

interface CartCreateResponse {
  cartCreate: {
    cart: ShopifyCart | null
    userErrors: Array<{ field: string; message: string }>
  }
}

interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: ShopifyCart | null
    userErrors: Array<{ field: string; message: string }>
  }
}

interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: ShopifyCart | null
    userErrors: Array<{ field: string; message: string }>
  }
}

interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: ShopifyCart | null
    userErrors: Array<{ field: string; message: string }>
  }
}

interface CartResponse {
  cart: ShopifyCart | null
}

const CART_ID_KEY = 'shopify_cart_id'

export function useCart() {
  const cart = useState<ShopifyCart | null>('cart', () => null)
  const isLoading = useState('cart-loading', () => false)
  const error = useState<string | null>('cart-error', () => null)

  const config = useRuntimeConfig()
  const isConfigured = computed(() => {
    return !!(config.public.shopifyStoreDomain && config.public.shopifyStorefrontToken)
  })

  const cartId = useCookie<string | null>(CART_ID_KEY, {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  const totalQuantity = computed(() => cart.value?.totalQuantity ?? 0)
  const checkoutUrl = computed(() => cart.value?.checkoutUrl ?? '')
  const cartLines = computed(() => cart.value?.lines.edges.map(e => e.node) ?? [])
  const subtotal = computed(() => cart.value?.cost.subtotalAmount.amount ?? '0')
  const total = computed(() => cart.value?.cost.totalAmount.amount ?? '0')

  async function initCart() {
    if (!isConfigured.value) return

    if (cartId.value) {
      try {
        await fetchCart()
      } catch {
        // Cart may have expired, clear it
        cartId.value = null
        cart.value = null
      }
    }
  }

  async function fetchCart() {
    if (!cartId.value || !isConfigured.value) return

    isLoading.value = true
    error.value = null

    try {
      const data = await shopifyFetch<CartResponse>(GET_CART, { cartId: cartId.value })
      cart.value = data.cart
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch cart'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function createCart(lines: CartLineInput[]) {
    if (!isConfigured.value) {
      console.warn('Shopify is not configured. Cannot create cart.')
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const data = await shopifyFetch<CartCreateResponse>(CREATE_CART, { lines })

      if (data.cartCreate.userErrors.length > 0) {
        throw new Error(data.cartCreate.userErrors.map(e => e.message).join(', '))
      }

      if (data.cartCreate.cart) {
        cart.value = data.cartCreate.cart
        cartId.value = data.cartCreate.cart.id
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create cart'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function addToCart(lines: CartLineInput[]) {
    if (!isConfigured.value) {
      console.warn('Shopify is not configured. Cannot add to cart.')
      return
    }

    // Create cart if it doesn't exist
    if (!cartId.value) {
      await createCart(lines)
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const data = await shopifyFetch<CartLinesAddResponse>(ADD_TO_CART, {
        cartId: cartId.value,
        lines,
      })

      if (data.cartLinesAdd.userErrors.length > 0) {
        throw new Error(data.cartLinesAdd.userErrors.map(e => e.message).join(', '))
      }

      cart.value = data.cartLinesAdd.cart
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to add to cart'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function updateCartLine(lineId: string, quantity: number) {
    if (!cartId.value || !isConfigured.value) return

    isLoading.value = true
    error.value = null

    try {
      const data = await shopifyFetch<CartLinesUpdateResponse>(UPDATE_CART_LINES, {
        cartId: cartId.value,
        lines: [{ id: lineId, quantity }],
      })

      if (data.cartLinesUpdate.userErrors.length > 0) {
        throw new Error(data.cartLinesUpdate.userErrors.map(e => e.message).join(', '))
      }

      cart.value = data.cartLinesUpdate.cart
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update cart'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function removeFromCart(lineId: string) {
    if (!cartId.value || !isConfigured.value) return

    isLoading.value = true
    error.value = null

    try {
      const data = await shopifyFetch<CartLinesRemoveResponse>(REMOVE_FROM_CART, {
        cartId: cartId.value,
        lineIds: [lineId],
      })

      if (data.cartLinesRemove.userErrors.length > 0) {
        throw new Error(data.cartLinesRemove.userErrors.map(e => e.message).join(', '))
      }

      cart.value = data.cartLinesRemove.cart
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to remove from cart'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  function goToCheckout() {
    if (checkoutUrl.value) {
      // Use navigateTo with external:true for proper external redirect
      navigateTo(checkoutUrl.value, { external: true })
    }
  }

  return {
    cart,
    isLoading,
    error,
    totalQuantity,
    checkoutUrl,
    cartLines,
    subtotal,
    total,
    initCart,
    addToCart,
    updateCartLine,
    removeFromCart,
    goToCheckout,
  }
}
