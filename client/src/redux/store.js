import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((i) => i.itemId === item.itemId);
      
      // increase quantity if item is already exist
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1; 
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },

    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.find((i) => i.itemId === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity = existingItem.quantity - 1; 
        } else {
          // remove if quantity becomes zero
          return state.filter((i) => i.itemId !== itemId);
        }
      }
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      return state.filter((i) => i.itemId !== itemId);
    },

    clearCart: () => {
      return [];
    },
  },
});

export const { addItem, decreaseQuantity, removeItem, clearCart } =
  cartSlice.actions;

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export default store;
