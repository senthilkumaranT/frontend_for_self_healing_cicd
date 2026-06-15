import { describe, it, expect } from 'vitest';
import { calculateCartTotal } from './cookieUtils';

describe('Cookie Cart Calculations', () => {
  it('correctly calculates the cart total after applying a 10% discount', () => {
    const items = [
      { price: 3.00, quantity: 2 }, // $6.00
      { price: 4.00, quantity: 1 }  // $4.00
    ]; // Subtotal = $10.00
    
    const discount = 10; // 10% discount
    const result = calculateCartTotal(items, discount);
    
    // Expected: Subtotal of $10.00 minus 10% discount ($1.00) = $9.00
    expect(result).toBe(9.00);
  });

  it('correctly handles carts with no discount', () => {
    const items = [
      { price: 2.50, quantity: 4 } // $10.00
    ];
    const result = calculateCartTotal(items, 0);
    expect(result).toBe(10.00);
  });
});
