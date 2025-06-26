import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addItem(state, action) {
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    // Delete item from cart
    deleteItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    // Increase quantity of an item
    increaseItemQuantity(state, action) {
      const cartItem = state.cart.find(item => item.pizzaId === action.payload);
      if (cartItem) {
        cartItem.quantity++;
        cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    // Decrease quantity of an item
    decreaseItemQuantity(state, action) {
      const cartItem = state.cart.find(item => item.pizzaId === action.payload);
      if (cartItem) {
        cartItem.quantity--;
        cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
        if (cartItem.quantity === 0) {
          // Remove if quantity zero
          state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    // Clear cart completely
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const getCartTotalQuantity = store =>
  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getCartTotalPrice = store =>
  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
