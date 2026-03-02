import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={0} />
      <main className="flex-1">
        {/* Page content will go here */}
      </main>
      <Footer />
    </div>
  )
}

export default App
