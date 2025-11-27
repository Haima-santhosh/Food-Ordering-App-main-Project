import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      // check if the itemId exists, if not fallback to _id
      const id = item.itemId || item._id;

      const existingItem = state.find((i) => (i.itemId || i._id) === id);

      if (existingItem) {
        // increase quantity
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        // new item with its own quantity
        state.push({ ...item, itemId: id, quantity: item.quantity || 1 });
      }
    },

    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.find((i) => (i.itemId || i._id) === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // remove item completely
          return state.filter((i) => (i.itemId || i._id) !== itemId);
        }
      }
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      return state.filter((i) => (i.itemId || i._id) !== itemId);
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
