import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Header, Footer } from "./components/layout";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { DealsPage } from "./pages/DealsPage";
import { CartPage } from "./pages/CartPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { ContactUsPage } from "./pages/ContactUsPage";
import { CareersPage } from "./pages/CareersPage";
import { PressPage } from "./pages/PressPage";
import { BlogPage } from "./pages/BlogPage";
import { HelpCenterPage } from "./pages/HelpCenterPage";
import { ReturnsPage } from "./pages/ReturnsPage";
import { TrackOrderPage } from "./pages/TrackOrderPage";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { CartProvider, useCart } from "@/features/cart";
import { Toaster } from "@/components/ui/sonner";

function AppShell() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { items, totalItems, updateItemQuantityByDelta, removeItem, clearCart } = useCart();

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate("/cart");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Header onOpenCart={() => setIsCartOpen(true)} cartCount={totalItems} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/cart" element={<CartPage />} />

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
      </main>
      <Footer />
      <CartDrawer
        items={items}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateItemQuantityByDelta}
        onRemove={removeItem}
        onViewCart={handleViewCart}
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
