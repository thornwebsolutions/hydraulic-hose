// Local Cart Store
// Stores cart items in Pinia + localStorage
// Works without Shopify connection

import { defineStore } from 'pinia'

export interface LocalCartItem {
  id: string // Unique cart item ID
  productId: string
  name: string
  price: number // Price per unit
  priceUnit: 'per foot' | 'each'
  quantity: number // For 'each' items
  length?: number // For 'per foot' items (in feet)
  totalPrice: number
}

interface LocalCartState {
  items: LocalCartItem[]
}

const STORAGE_KEY = 'hydraulic-hose-cart'

export const useLocalCart = defineStore('localCart', {
  state: (): LocalCartState => ({
    items: [],
  }),

  getters: {
    totalItems: (state): number => {
      return state.items.reduce((sum, item) => {
        if (item.priceUnit === 'per foot') {
          return sum + 1 // Count per-foot items as 1 line item
        }
        return sum + item.quantity
      }, 0)
    },

    itemCount: (state): number => state.items.length,

    subtotal: (state): number => {
      return state.items.reduce((sum, item) => sum + item.totalPrice, 0)
    },

    isEmpty: (state): boolean => state.items.length === 0,
  },

  actions: {
    // Initialize cart from localStorage
    initCart() {
      if (import.meta.client) {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          try {
            const data = JSON.parse(stored)
            this.items = data.items || []
          } catch {
            this.items = []
          }
        }
      }
    },

    // Save cart to localStorage
    saveCart() {
      if (import.meta.client) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: this.items }))
      }
    },

    // Add item to cart
    addItem(product: {
      id: string
      name: string
      price: number
      priceUnit: 'per foot' | 'each'
    }, quantity: number = 1, length?: number) {
      const cartItemId = `${product.id}-${Date.now()}`

      let totalPrice: number
      if (product.priceUnit === 'per foot' && length) {
        totalPrice = product.price * length
      } else {
        totalPrice = product.price * quantity
      }

      // Check if similar item exists (same product, same length for per-foot items)
      const existingIndex = this.items.findIndex(item => {
        if (item.productId !== product.id) return false
        if (product.priceUnit === 'per foot') {
          return item.length === length
        }
        return true
      })

      if (existingIndex > -1 && product.priceUnit === 'each') {
        // Update quantity for 'each' items
        this.items[existingIndex].quantity += quantity
        this.items[existingIndex].totalPrice = this.items[existingIndex].price * this.items[existingIndex].quantity
      } else {
        // Add new item
        this.items.push({
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          priceUnit: product.priceUnit,
          quantity: product.priceUnit === 'each' ? quantity : 1,
          length: product.priceUnit === 'per foot' ? length : undefined,
          totalPrice,
        })
      }

      this.saveCart()
    },

    // Update item quantity
    updateQuantity(itemId: string, quantity: number) {
      const item = this.items.find(i => i.id === itemId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(itemId)
          return
        }
        item.quantity = quantity
        if (item.priceUnit === 'each') {
          item.totalPrice = item.price * quantity
        }
        this.saveCart()
      }
    },

    // Update item length (for per-foot items)
    updateLength(itemId: string, length: number) {
      const item = this.items.find(i => i.id === itemId)
      if (item && item.priceUnit === 'per foot') {
        if (length <= 0) {
          this.removeItem(itemId)
          return
        }
        item.length = length
        item.totalPrice = item.price * length
        this.saveCart()
      }
    },

    // Remove item from cart
    removeItem(itemId: string) {
      const index = this.items.findIndex(i => i.id === itemId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveCart()
      }
    },

    // Clear entire cart
    clearCart() {
      this.items = []
      this.saveCart()
    },
  },
})
