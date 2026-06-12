import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import StoreFinder from './pages/StoreFinder';
import AdminOrders from './pages/AdminOrders';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <CartProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: '#3E1014',
            color: '#FAF6F0',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontFamily: "'Outfit', sans-serif",
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 8px 24px rgba(44, 20, 23, 0.25)',
            padding: '12px 18px',
          },
          iconTheme: {
            primary: '#D4AF37',
            secondary: '#3E1014',
          },
        }}
      />
      <CartDrawer />
      <div className="flex flex-col" style={{ minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/"            element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about"       element={<PageTransition><About /></PageTransition>} />
              <Route path="/shop"        element={<PageTransition><Shop /></PageTransition>} />
              <Route path="/store-finder" element={<PageTransition><StoreFinder /></PageTransition>} />
              <Route path="/checkout"    element={<PageTransition><Checkout /></PageTransition>} />
              <Route path="/admin/orders" element={<PageTransition><AdminOrders /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;

