// cookieUtils.js

/**
 * Calculates the total cost of cookies in the shopping cart after applying a discount.
 * @param {Array} items - Array of cookie objects { price, quantity }
 * @param {number} discountPercent - Discount in percent (e.g., 10 for 10%)
 * @returns {number} The total price after discount
 */
export function calculateCartTotal(items, discountPercent = 0) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // FIX: Divide discountPercent by 100 to correctly calculate the discount amount.
  const discountAmount = subtotal * (discountPercent / 100);

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