# CLAUDE.md - Project Context for AI Assistant

## Project Overview
E-commerce website for Hydraulic Hose Co., a hydraulic hose manufacturing company. Features a custom hose assembly configurator and standard product catalog.

## Tech Stack
- **Framework**: Nuxt 3 with Vue 3 Composition API
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **E-commerce Backend**: Shopify (Storefront API) - not yet connected
- **Deployment**: Vercel

## Project Structure
```
app/
├── components/
│   ├── configurator/     # Hose configurator components
│   │   └── HosePreview.vue  # SVG visual preview
│   ├── layout/           # Header, Footer
│   └── ui/               # Reusable UI components (Toast, SearchBar)
├── composables/
│   ├── useProducts.ts    # Centralized product data
│   ├── useSearch.ts      # Search functionality
│   ├── useToast.ts       # Toast notification state
│   └── useShopify.ts     # Shopify client (placeholder)
├── pages/
│   ├── index.vue         # Homepage
│   ├── about.vue         # About page
│   ├── contact.vue       # Contact page
│   ├── cart.vue          # Shopping cart
│   └── products/
│       ├── index.vue     # Product listing
│       ├── [id].vue      # Product detail
│       └── custom-hose.vue  # Hose configurator wizard
├── stores/
│   └── localCart.ts      # Pinia cart store with localStorage
└── layouts/
    └── default.vue       # Main layout with header/footer
```

## Key Implementation Details

### Product Data
Products are defined in `app/composables/useProducts.ts`. This is the single source of truth for all product information including:
- Basic info (id, name, description, price)
- Price unit ('per foot' or 'each')
- Technical specifications
- Related product IDs

### Local Cart System
The cart (`app/stores/localCart.ts`) uses Pinia with localStorage persistence:
- Works offline/without Shopify connection
- Supports both per-foot (length-based) and per-item (quantity-based) products
- Will be migrated to Shopify cart when API is connected

### Custom Hose Configurator
Located at `/products/custom-hose`, a 4-step wizard:
1. **Hose Type** - Select hose material/rating
2. **Dimensions** - Choose diameter and length
3. **Fittings** - Select fitting for each end
4. **Review** - Summary and add to cart

Includes real-time SVG preview showing configured hose assembly.

### Toast Notifications
Global toast system using `useToast()` composable:
- `toast.success(message)`
- `toast.error(message)`
- `toast.info(message)`
- `toast.warning(message)`

### Styling Conventions
- Use Tailwind utility classes
- Custom classes defined in `app/assets/css/main.css`:
  - `.container-custom` - Centered container with padding
  - `.btn-primary`, `.btn-secondary`, `.btn-accent` - Button styles
  - `.card` - Card component
  - `.input` - Form input styling
  - `.link` - Link styling

## Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Environment Variables
Copy `.env.example` to `.env` and configure:
```
SHOPIFY_STOREFRONT_TOKEN=your_token_here
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
```

## Current Status
- Core UI complete and functional
- Local cart working with localStorage
- Deployed to Vercel (pending)
- Shopify integration pending (needs store setup)

## Next Steps
1. Connect Shopify Storefront API
2. Add real product images
3. Build Thread ID Guide page
4. Implement user accounts

## Design Principles
- Clean, modern aesthetic (opposite of cluttered industrial competitors)
- Mobile-first responsive design
- Step-by-step guided configurator (not overwhelming forms)
- Generous whitespace and clear hierarchy
