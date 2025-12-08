# Hydraulic Hose Co. - Project TODO

## Completed

### Phase 1: Project Foundation
- [x] Nuxt 3 project setup with TypeScript
- [x] Tailwind CSS configuration
- [x] Pinia state management setup
- [x] Base styling and design system

### Phase 2: Core Pages
- [x] Homepage with hero, features, CTA sections
- [x] Products listing page with category filtering
- [x] Product detail page (`/products/[id]`)
- [x] About page
- [x] Contact page
- [x] Cart page (responsive mobile layout)

### Phase 3: Product Configurator
- [x] 4-step custom hose assembly wizard
- [x] Visual hose preview (SVG-based)
- [x] Dynamic pricing calculation
- [x] Add to cart integration

### Phase 4: E-commerce Features
- [x] Centralized product data store (`app/composables/useProducts.ts`)
- [x] Local cart with localStorage persistence (`app/stores/localCart.ts`)
- [x] Length selector for per-foot products
- [x] Quantity selector for per-item products
- [x] Cart badge in header

### Phase 5: UX Improvements
- [x] Search functionality with autocomplete
- [x] Toast notification system
- [x] Responsive mobile design
- [x] Header/Footer components

### Phase 6: Deployment
- [x] Vercel configuration (`vercel.json`)
- [x] GitHub repository setup

---

## In Progress

### Vercel Deployment
- [ ] Complete initial deployment to Vercel
- [ ] Share preview URL with business partner

---

## Upcoming

### Shopify Integration (Priority: High)
- [ ] Create Shopify development store
- [ ] Enable Storefront API access
- [ ] Generate storefront access token
- [ ] Add credentials to environment variables
- [ ] Connect existing Shopify client utilities to real API
- [ ] Migrate local cart to Shopify cart
- [ ] Implement Shopify checkout redirect

### Product Data (Priority: High)
- [ ] Define complete product catalog with business partner
- [ ] Add additional hose types
- [ ] Add additional fitting types
- [ ] Define compatibility rules (which fittings work with which hoses)
- [ ] Set up pricing structure in Shopify

### Thread ID Guide (Priority: Medium)
- [ ] Create `/thread-guide` page
- [ ] Visual thread identification tool
- [ ] Thread specification tables
- [ ] Comparison charts

### User Accounts (Priority: Low)
- [ ] Shopify customer authentication
- [ ] Order history page
- [ ] Saved configurations
- [ ] Account settings

### Future Enhancements
- [ ] Product images (replace placeholders)
- [ ] Email notifications
- [ ] Inventory management
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Performance optimization

---

## Notes

### Tech Stack
- **Frontend**: Nuxt 3 + Vue 3 (Composition API) + TypeScript
- **Styling**: Tailwind CSS
- **State**: Pinia + localStorage
- **E-commerce**: Shopify Storefront API (pending connection)
- **Deployment**: Vercel

### Key Files
- `app/composables/useProducts.ts` - Product data
- `app/stores/localCart.ts` - Cart state
- `app/composables/useToast.ts` - Toast notifications
- `app/pages/products/custom-hose.vue` - Hose configurator
- `app/components/configurator/HosePreview.vue` - Visual preview
