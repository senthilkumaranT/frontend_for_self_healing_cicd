import React, { useState } from 'react';
import { ShoppingBag, Trash2, Tag, Plus, Minus, CreditCard, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { calculateCartTotal, formatPrice } from '../utils/cookieUtils';

export default function Cart({ cart, updateQuantity, removeFromBag }) {
  const [couponCode, setCouponCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState(0); // percent
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  
  // Checkout form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTotal = calculateCartTotal(cart, activeDiscount);
  const isBuggy = cartTotal < 0;

  const applyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    if (couponCode.toUpperCase() === 'SWEET10') {
      setActiveDiscount(10);
      setCouponSuccess('10% promo code applied successfully!');
    } else {
      setCouponError('Invalid coupon. Use code "SWEET10" for 10% off.');
    }
  };

  const removeCoupon = () => {
    setActiveDiscount(0);
    setCouponCode('');
    setCouponSuccess('');
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0 || isBuggy) return;
    setCheckoutComplete(true);
  };

  if (checkoutComplete) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-6 text-left glass-panel p-8 rounded-2xl border border-emerald-500/20 shadow-2xl relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none"></div>
        <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-black text-slate-100">Order Placed Successfully!</h2>
          <p className="text-xs text-slate-400 font-mono">Your gourmet cookies are headed to the oven.</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 space-y-2.5 font-mono text-[10px] text-slate-400">
          <div className="flex justify-between"><span>Order Reference</span><span className="text-slate-200">#COUTURE-9821</span></div>
          <div className="flex justify-between"><span>Delivery Address</span><span className="text-slate-200">{address || '452 Broadway, NY'}</span></div>
          <div className="flex justify-between"><span>Amount Paid</span><span className="text-emerald-400 font-bold">{formatPrice(cartTotal)}</span></div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer text-center block"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 text-left">
      
      {/* Page Header */}
      <section className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black">Your Checkout Bag</h2>
        <p className="text-slate-400 text-xs font-mono">Review your items and complete payment.</p>
      </section>

      {/* Cart Error Banner */}
      {isBuggy && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-950/20 text-red-400 text-xs flex items-start gap-3 shadow-lg shadow-red-950/10 animate-pulse">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
          <div>
            <strong className="text-red-300 font-semibold">CI/CD Production Error: Negative total calculation!</strong>
            <p className="mt-1 text-red-400/80 leading-5">
              The checkout formula contains a math logic bug. Applying the discount percent of {activeDiscount}% results in a negative total balance ({formatPrice(cartTotal)}). 
              Checkout operations have been frozen. The CI/CD agent has been triggered automatically on GitHub.
            </p>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="py-20 text-center text-slate-500 border border-dashed border-slate-850 rounded-2xl bg-slate-900/10 max-w-xl mx-auto">
          <ShoppingBag className="w-12 h-12 stroke-1 mb-2 text-slate-600 mx-auto" />
          <p className="text-sm font-mono">Your shopping cart is empty.</p>
          <p className="text-xs text-slate-650 mt-1">Browse our cookies list to add fresh baked goods.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Cart Items Table + Shipping Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Items Card */}
            <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl shadow-xl space-y-4">
              <h3 className="text-slate-200 text-xs font-semibold uppercase tracking-wider mb-2">Cart Items ({cart.length})</h3>
              
              <div className="divide-y divide-slate-850 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 flex items-center justify-between gap-4 text-xs">
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-250">{item.name}</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{formatPrice(item.price)} each</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-slate-850 bg-slate-950 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-slate-900 text-slate-400 hover:text-slate-200 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 font-mono text-slate-300 font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-slate-900 text-slate-400 hover:text-slate-200 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromBag(item.id)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Details Form */}
            <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl shadow-xl">
              <h3 className="text-slate-200 text-xs font-semibold uppercase tracking-wider mb-4">Delivery Details</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500">Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/50 outline-none rounded-lg p-2.5 text-slate-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/50 outline-none rounded-lg p-2.5 text-slate-300 text-xs"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] text-slate-500">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="452 Broadway, SoHo"
                    className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/50 outline-none rounded-lg p-2.5 text-slate-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500">Postal ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="10013"
                    className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/50 outline-none rounded-lg p-2.5 text-slate-300 text-xs"
                  />
                </div>
              </form>
            </div>

          </div>

          {/* Right Side: Total Summary + Coupon + Payment Form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Calculation Card */}
            <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl shadow-xl space-y-4">
              <h3 className="text-slate-200 text-xs font-semibold uppercase tracking-wider">Checkout Billing</h3>
              
              {/* Promo input */}
              <form onSubmit={applyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500/55 outline-none rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-slate-200 uppercase"
                    disabled={activeDiscount > 0}
                  />
                </div>
                {activeDiscount > 0 ? (
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="px-3 bg-red-950/20 text-red-400 border border-red-500/20 hover:bg-red-900/20 rounded-xl text-xs cursor-pointer font-semibold"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs cursor-pointer font-semibold border border-slate-750"
                  >
                    Apply
                  </button>
                )}
              </form>

              {couponError && <p className="text-[10px] text-red-400 font-mono pl-1">{couponError}</p>}
              {couponSuccess && <p className="text-[10px] text-emerald-400 font-mono pl-1">{couponSuccess}</p>}

              <div className="border-t border-slate-850 pt-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between text-slate-450">
                  <span>Cart Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                {activeDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount ({activeDiscount}%)</span>
                    <span>-{formatPrice(subtotal * (activeDiscount / 100))}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-slate-450">
                  <span>Fresh Express Shipping</span>
                  <span>Free</span>
                </div>

                <div className="flex justify-between items-center text-sm border-t border-slate-850 pt-3">
                  <span className="font-sans font-bold text-slate-200">Total Price</span>
                  <span className={`font-mono font-extrabold text-base ${isBuggy ? 'text-red-400 animate-pulse' : 'text-slate-100'}`}>
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Info Card */}
            <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl shadow-xl text-xs space-y-4">
              <h3 className="text-slate-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-amber-500" />
                Credit Card Payment
              </h3>
              
              <form onSubmit={handleCheckoutSubmit} className="space-y-3 font-mono">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500">Cardholder Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/50 outline-none rounded-lg p-2.5 text-slate-350 text-xs"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">Expiry MM/YY</label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/50 outline-none rounded-lg p-2.5 text-slate-350 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">Security CVV</label>
                    <input
                      type="text"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="415"
                      className="w-full bg-slate-950 border border-slate-850 focus:border-amber-500/50 outline-none rounded-lg p-2.5 text-slate-350 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0 || isBuggy}
                  className={`w-full py-3 mt-4 rounded-xl font-extrabold text-xs text-center flex items-center justify-center gap-1.5 shadow-lg transition-all duration-300 cursor-pointer ${
                    cart.length === 0 || isBuggy
                      ? 'bg-slate-800 text-slate-500 border border-slate-750 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 shadow-amber-950/20'
                  }`}
                >
                  Confirm & Pay {formatPrice(cartTotal)}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
