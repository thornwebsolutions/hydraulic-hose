// Centralized product data
// This is the single source of truth for all products
// Will be replaced with Shopify data once connected

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  priceUnit: 'per foot' | 'each'
  image: string | null
  category: string
  specs: ProductSpec[]
  relatedIds: string[]
}

// All products in the system
export const allProducts: Product[] = [
  {
    id: '1',
    name: 'SAE 100R2AT Hydraulic Hose',
    description: 'Two-wire braided hose for high-pressure applications. Suitable for hydraulic systems in construction, agriculture, and industrial equipment.',
    longDescription: `
      The SAE 100R2AT is a premium two-wire braided hydraulic hose designed for medium to high-pressure hydraulic systems.
      Features a synthetic rubber inner tube, two layers of high-tensile steel wire braid reinforcement, and a durable synthetic rubber cover.

      Ideal for use in mobile equipment, agricultural machinery, construction vehicles, and industrial hydraulic systems where reliability is critical.
    `,
    price: 12.99,
    priceUnit: 'per foot',
    image: null,
    category: 'hydraulic-hoses',
    specs: [
      { label: 'Working Pressure', value: 'Up to 5,000 PSI' },
      { label: 'Temperature Range', value: '-40°F to +250°F' },
      { label: 'Inner Tube', value: 'Synthetic rubber' },
      { label: 'Reinforcement', value: 'Two-wire braid' },
      { label: 'Cover', value: 'Synthetic rubber, abrasion resistant' },
      { label: 'Available Sizes', value: '1/4" to 1" ID' },
    ],
    relatedIds: ['2', '3'],
  },
  {
    id: '2',
    name: 'JIC Female Swivel Fitting',
    description: '37-degree flare fitting, steel construction',
    longDescription: `
      High-quality JIC (Joint Industry Council) female swivel fitting with 37-degree flare design.
      Made from zinc-plated carbon steel for excellent corrosion resistance and durability.

      The swivel design allows for easy alignment during installation and helps prevent hose twist.
      Compatible with all standard JIC male fittings and ports.
    `,
    price: 8.50,
    priceUnit: 'each',
    image: null,
    category: 'fittings',
    specs: [
      { label: 'Thread Type', value: 'JIC 37° Flare' },
      { label: 'Material', value: 'Carbon Steel' },
      { label: 'Finish', value: 'Zinc Plated' },
      { label: 'Pressure Rating', value: 'Up to 5,000 PSI' },
      { label: 'Style', value: 'Female Swivel' },
    ],
    relatedIds: ['1', '4'],
  },
  {
    id: '3',
    name: 'ISO 16028 Quick Coupler',
    description: 'Skid steer style flat-face quick disconnect',
    longDescription: `
      ISO 16028 compliant flat-face quick coupler designed for skid steer and compact equipment applications.
      The flat-face design minimizes fluid loss and air inclusion during connection/disconnection.

      Features a push-to-connect design with automatic locking for secure, leak-free connections.
    `,
    price: 24.99,
    priceUnit: 'each',
    image: null,
    category: 'quick-disconnects',
    specs: [
      { label: 'Standard', value: 'ISO 16028' },
      { label: 'Style', value: 'Flat Face' },
      { label: 'Material', value: 'Carbon Steel' },
      { label: 'Pressure Rating', value: 'Up to 4,000 PSI' },
      { label: 'Connection', value: 'Push-to-Connect' },
    ],
    relatedIds: ['1', '2'],
  },
  {
    id: '4',
    name: 'NPT to JIC Adapter',
    description: 'Steel adapter, male NPT to female JIC',
    longDescription: `
      High-quality thread adapter for connecting NPT (National Pipe Thread) ports to JIC fittings.
      Made from zinc-plated carbon steel for durability and corrosion resistance.

      Essential for system conversions and mixed-standard hydraulic connections.
    `,
    price: 6.75,
    priceUnit: 'each',
    image: null,
    category: 'adapters',
    specs: [
      { label: 'Male Thread', value: 'NPT (Tapered)' },
      { label: 'Female Thread', value: 'JIC 37° Flare' },
      { label: 'Material', value: 'Carbon Steel' },
      { label: 'Finish', value: 'Zinc Plated' },
      { label: 'Pressure Rating', value: 'Up to 5,000 PSI' },
    ],
    relatedIds: ['2', '3'],
  },
]

// Composable for accessing products
export const useProducts = () => {
  const products = allProducts

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id)
  }

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(p => p.category === category)
  }

  const getRelatedProducts = (productId: string): Product[] => {
    const product = getProductById(productId)
    if (!product) return []
    return products.filter(p => product.relatedIds.includes(p.id))
  }

  const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase().trim()
    if (!lowerQuery || lowerQuery.length < 2) return []

    return products.filter(product => {
      return (
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
      )
    })
  }

  return {
    products,
    getProductById,
    getProductsByCategory,
    getRelatedProducts,
    searchProducts,
  }
}
