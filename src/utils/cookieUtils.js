// cookieUtils.js

/**
 * Calculates the total cost of cookies in the shopping cart after applying a discount.
 * @param {Array} items - Array of cookie objects { price, quantity }
 * @param {number} discountPercent - Discount in percent (e.g., 10 for 10%)
 * @returns {number} The total price after discount
 */
export function calculateCartTotal(items, discountPercent = 0) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // BUG: Direct multiplication without dividing the percent by 100. (Real-time 20s delay test 2)
  // This causes a 10% discount to multiply the subtotal by 10 instead of 0.1,
  // making the final cart total a massive negative value.
  const discountAmount = subtotal * discountPercent;

  const total = subtotal - discountAmount;
  return Math.round(total * 100) / 100;
}

/**
 * Formats values into a neat USD price.
 */
export function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}