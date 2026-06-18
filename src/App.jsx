import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import About from './pages/About';

const COOKIES_MENU = [
  { 
    id: 'choc_chip', 
    name: 'Belgian Chocolate Chip', 
    description: 'Gooey core, loaded with premium Belgian dark chocolate chunks, finished with Maldon sea salt.', 
    price: 3.50, 
    rating: '4.9', 
    category: 'Classic',
    color: 'bg-amber-950/20 border-amber-800/30'
  },
  { 
    id: 'red_velvet', 
    name: 'Red Velvet & Cream Cheese', 
    description: 'Vibrant red velvet dough stuffed with a rich, molten cream cheese center.', 
    price: 4.25, 
    rating: '4.8', 
    category: 'Stuffed',
    color: 'bg-red-950/20 border-red-800/30'
  },
  { 
    id: 'macadamia', 
    name: 'White Chocolate Macadamia', 
    description: 'Buttery cookie base packed with toasted macadamia nuts and sweet white chocolate chips.', 
    price: 3.75, 
    rating: '4.7', 
    category: 'Nutty',
    color: 'bg-yellow-950/20 border-yellow-800/30'
  },
  { 
    id: 'double_fudge', 
    name: 'Salted Double Fudge', 
    description: 'Decadent Dutch cocoa dough packed with milk chocolate chunks and soft fudge ribbons.', 
    price: 4.00, 
    rating: '4.9', 
    category: 'Decadent',
    color: 'bg-orange-950/20 border-orange-850/30'
  },
  { 
    id: 'pistachio', 
    name: 'Matcha Pistachio Crunch', 
    description: 'Ceremonial grade Uji matcha cookie studded with roasted Sicilian pistachios.', 
    price: 4.50, 
    rating: '4.6', 
    category: 'Artisanal',
    color: 'bg-emerald-950/20 border-emerald-800/30'
  }
];

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'menu' | 'cart' | 'about'
  
  // Initialize with some items in the cart
  const [cart, setCart] = useState([
    { ...COOKIES_MENU[0], quantity: 2 },
    { ...COOKIES_MENU[3], quantity: 1 }
  ]);

  // Cart Handlers
  const updateQuantity = (id, delta) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          // Fix: Ensure quantity is non-negative, but keep item in cart even if quantity is 0
          return { ...item, quantity: Math.max(0, newQty) };
        }
        return item;
      })
      // No .filter(Boolean) here anymore, to keep items with quantity 0
    );
  };

  const addToCart = (cookie) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === cookie.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === cookie.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...cookie, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        cartItemsCount={cartItemsCount} 
      />

      {/* Main Pages Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col justify-center">
        {activePage === 'home' && (
          <Home 
            setActivePage={setActivePage} 
            featuredCookies={COOKIES_MENU.slice(0, 3)} 
            onAddToBag={addToCart} 
          />
        )}
        
        {activePage === 'menu' && (
          <Menu 
            cookies={COOKIES_MENU} 
            onAddToBag={addToCart} 
          />
        )}
        
        {activePage === 'cart' && (
          <Cart 
            cart={cart} 
            updateQuantity={updateQuantity} 
            removeFromBag={removeFromCart} 
          />
        )}
        
        {activePage === 'about' && (
          <About />
        )}
      </main>

      {/* Page Footer */}
      <Footer setActivePage={setActivePage} />
      
    </div>
  );
}