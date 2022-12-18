import { createSlice } from "@reduxjs/toolkit";
// img, title, category, date, price, quantity;
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [
      {
        img: "image_2.jpg",
        title: "Product 1",
        category: "Category 1",
        date: "2020-01-01",
        price: 600,
        quantity: 1,
        isChecked: false
      },
      {
        img: "image_3.jpg",
        title: "Product 2",
        category: "Category 2",
        date: "2020-01-01",
        price: 400,
        quantity: 1,
        isChecked: false
      },
      {
        img: "image_5.jpg",
        title: "Product 3",
        category: "Category 3",
        date: "2020-01-01",
        price: 200,
        quantity: 1,
        isChecked: false
      }
    ]
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        item => item.title === action.payload.title
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(item => item.title === action.payload);
      console.log(itemInCart);
      itemInCart.quantity++;
    },

    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(item => item.title === action.payload);
      if (itemInCart.quantity === 1) {
        itemInCart.quantity = 1;
      } else {
        itemInCart.quantity--;
      }
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter(item => item.title !== action.payload);
    },
    toggleSelect: (state, action) => {
      const item = state.cart.find(item => item.title === action.payload);
      item.isChecked = !item.isChecked;
    },
    removeSelectedItems: (state, action) => {
      state.cart = state.cart.filter(item => item.isChecked === false);
    },
    sortCartByPrice: (state, action) => {
      state.cart = state.cart.sort((a, b) => a.price - b.price);
    }
  }
});

export const CartReducer = CartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  toggleSelect,
  removeSelectedItems,
  filterByCategory,
  sortCartByPrice,
  sortByDate
} = CartSlice.actions;
