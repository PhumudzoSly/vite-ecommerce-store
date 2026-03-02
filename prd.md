# 🧾 Product Requirements Document

## Wamly Storefront Challenge

## 1. Overview

### Product Name

**Wamly Store**

### Purpose

Build a responsive React storefront that allows users to browse products, filter/search, and manage a shopping cart.

### Business Goal

Demonstrate strong frontend engineering practices including:

- React fundamentals & architecture
- Async data handling
- UI/UX polish
- Performance & accessibility
- Testing & code quality

---

## 2. Objectives

### Primary Objectives

✅ Display products from API
✅ Allow filtering & searching
✅ Enable cart functionality
✅ Provide responsive & accessible UI
✅ Handle loading, error, and empty states

### Secondary Objectives (Bonus / Differentiators)

⭐ Persist cart
⭐ Skeleton loading states
⭐ Smooth micro-interactions
⭐ Theme tokens & design consistency
⭐ Lazy loading & performance optimizations
⭐ Unit tests for key logic

---

## 3. Target Users

### Primary User

Online shopper browsing and purchasing products.

### User Needs

- Quickly view products
- Filter to find items
- Add/remove items from cart
- View totals clearly
- Use mobile or desktop easily

---

## 4. Success Metrics

The solution succeeds if:

- App loads & functions without errors
- UI is responsive and polished
- Async states handled gracefully
- Cart logic is accurate
- Code is clean & maintainable
- Performance is optimized
- Key functionality is tested

---

## 5. Technical Stack

### Core

- **React + TypeScript**
- **Vite** (fast build & dev)

### Data Fetching

- **Tanstack Query (React Query)**

### State Management

- Context + useReducer
  _(or Zustand if preferred)_

### Routing

- React Router

### Styling

- Tailwind CSS
- CSS variables (design tokens)

### Testing

- Jest + React Testing Library

---

## 6. Functional Requirements

## 6.1 Product Listing

### Description

Display products fetched from the API.

### Requirements

- Fetch products asynchronously
- Show loading state
- Show error state
- Display product image, title, price, category

---

## 6.2 Filtering & Search

### Requirements

- Filter by category
- Search by product name
- Filters update results instantly
- Clear filter option

---

## 6.3 Product Details (Optional Enhancement)

- Quick view modal OR dedicated page

---

## 6.4 Cart System

### Requirements

- Add to cart
- Remove from cart
- Update quantity
- Prevent negative quantities
- Display cart total
- Show empty cart state

### Bonus

- Persist cart (localStorage)

---

## 6.5 Navigation

### Requirements

- Product list page
- Cart page / drawer
- Cart item count indicator

---

## 7. UI / UX Requirements

## 7.1 Layout

- Mobile-first responsive design
- Grid layout for products
- Clean spacing & alignment

## 7.2 States

Must handle:

- Loading
- Error
- Empty results
- Empty cart

## 7.3 Accessibility

- Keyboard navigation
- Proper button semantics
- Accessible labels
- Adequate color contrast

---

## 8. Performance Requirements

- Lazy load routes
- Memoize expensive renders
- Optimize images
- Avoid unnecessary re-renders

---

## 9. Design Guidelines

### Visual Style

- Clean modern UI
- Consistent spacing & radius
- Soft shadows & hover states
- Clear CTA buttons

### Micro-interactions (High Impact)

- Add-to-cart feedback
- Button hover effects
- Smooth cart transitions

---

## 10. Testing Requirements

### Must Test

- Adding item to cart
- Quantity update logic
- Total price calculation
- Error state rendering

---

## 11. Suggested Folder Structure

```
src/
 ├── api/
 ├── components/
 ├── features/
 │    ├── products/
 │    └── cart/
 ├── hooks/
 ├── pages/
 ├── store/
 ├── utils/
 └── tests/
```

---

## 12. Implementation Phases

### Phase 1 — Foundation

✔ Setup project
✔ API integration
✔ Product listing

### Phase 2 — Core Features

✔ Filtering & search
✔ Cart functionality
✔ Routing

### Phase 3 — UX & Polish

✔ Loading skeletons
✔ Empty/error states
✔ Responsive design

### Phase 4 — Performance & Quality

✔ Memoization & lazy loading
✔ Accessibility pass
✔ Unit tests

### Phase 5 — Final Polish

✔ Animations & micro-interactions
✔ Design consistency
✔ README & documentation

---

## 13. Risks & Mitigation

| Risk             | Mitigation                        |
| ---------------- | --------------------------------- |
| Overengineering  | Focus on core functionality       |
| Time constraints | Implement bonuses only after core |
| UI inconsistency | Use design tokens                 |
| Async bugs       | Use React Query                   |

---

## 14. README Deliverables

Include:

- Setup instructions
- Tech stack choices & rationale
- Tradeoffs & assumptions
- Possible future improvements

_(This alone signals senior-level thinking.)_

---

## 15. Future Enhancements (Not required)

- Wishlist
- Checkout simulation
- Dark mode
- Product detail page
- Offline support

---
