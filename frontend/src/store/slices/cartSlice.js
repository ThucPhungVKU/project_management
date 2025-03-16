import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.cartItems.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ id: Date.now(), product, quantity });
      }

      state.total = state.cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      state.total = state.cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === itemId);
      if (item) {
        item.quantity = quantity;
        state.total = state.cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 