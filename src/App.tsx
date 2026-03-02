import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Header, Footer } from './components/layout'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { CartPage } from './pages/CartPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header cartCount={0} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
