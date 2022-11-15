import { createContext, useReducer } from "react";


const Store = createContext();

const initialSate = {
  cart: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      const newItem = action.payload;
      const exisitngItem = state.cart.cartItems.find(item => item._id === newItem._id);
      // cart items er arry moddy data gulo rakha hoitechy carItems variable dia.
      const cartItems = exisitngItem ? state.cart.cartItems.map(item => item._id === exisitngItem._id ? newItem : item) : [...state.cart.cartItems, newItem]
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }


    case 'REMOVE_CART_ITEM': {
      const removeItem = action.payload;
      const cartItems = state.cart.cartItems.filter(item => item._id !== removeItem._id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }

    default:
      return state;
  }
}

const StoreProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialSate);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}

export { Store, StoreProvider };