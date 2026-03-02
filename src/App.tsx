import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header, Footer } from "./components/layout";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
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
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Temporary mock cart state for the Drawer (to be replaced by global state)
  const cartItems: any[] = [];
  const updateQuantity = () => {};
  const removeItem = () => {};
  const handleCheckout = () => {
    setIsCartOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <Header
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={cartItems.length}
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/blog" element={<BlogPage />} />

            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer
          items={cartItems}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
          onCheckout={handleCheckout}
        />
        <Toaster position="top-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;
