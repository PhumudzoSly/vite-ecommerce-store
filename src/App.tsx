import { Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Header, Footer } from "./components/layout";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { CartProvider, useCart } from "@/features/cart";
import { Toaster } from "@/components/ui/sonner";

const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));
const ProductsPage = lazy(() =>
  import("./pages/ProductsPage").then((module) => ({ default: module.ProductsPage })),
);
const DealsPage = lazy(() => import("./pages/DealsPage").then((module) => ({ default: module.DealsPage })));
const CartPage = lazy(() => import("./pages/CartPage").then((module) => ({ default: module.CartPage })));
const CheckoutPage = lazy(() =>
  import("./pages/CheckoutPage").then((module) => ({ default: module.CheckoutPage })),
);
const CategoriesPage = lazy(() =>
  import("./pages/CategoriesPage").then((module) => ({ default: module.CategoriesPage })),
);
const AboutUsPage = lazy(() =>
  import("./pages/AboutUsPage").then((module) => ({ default: module.AboutUsPage })),
);
const ContactUsPage = lazy(() =>
  import("./pages/ContactUsPage").then((module) => ({ default: module.ContactUsPage })),
);
const CareersPage = lazy(() =>
  import("./pages/CareersPage").then((module) => ({ default: module.CareersPage })),
);
const PressPage = lazy(() => import("./pages/PressPage").then((module) => ({ default: module.PressPage })));
const BlogPage = lazy(() => import("./pages/BlogPage").then((module) => ({ default: module.BlogPage })));
const HelpCenterPage = lazy(() =>
  import("./pages/HelpCenterPage").then((module) => ({ default: module.HelpCenterPage })),
);
const ReturnsPage = lazy(() =>
  import("./pages/ReturnsPage").then((module) => ({ default: module.ReturnsPage })),
);
const TrackOrderPage = lazy(() =>
  import("./pages/TrackOrderPage").then((module) => ({ default: module.TrackOrderPage })),
);

function AppShell() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { items, totalItems, updateItemQuantityByDelta, removeItem, clearCart } = useCart();

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate("/cart");
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Header onOpenCart={() => setIsCartOpen(true)} cartCount={totalItems} />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="mx-auto flex min-h-[320px] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
              <p className="text-sm text-muted-foreground">Loading page...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/blog" element={<BlogPage />} />

            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/track" element={<TrackOrderPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer
        items={items}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateItemQuantityByDelta}
        onRemove={removeItem}
        onViewCart={handleViewCart}
        onCheckout={handleCheckout}
        onClearCart={clearCart}
      />
      <Toaster position="top-center" />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
