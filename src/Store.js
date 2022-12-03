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

//==================================

const initialSate2 = {
  wishlist: {
    wishlistItems: localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem('wishlistItems')) : [],
  }
}

const reducer2 = (state, action) => {
  switch (action.type) {
    case 'ADD_WISHLIST_ITEM':
      const newItem = action.payload;
      const exisitngItem = state.wishlist.wishlistItems.find(item => item._id === newItem._id);
      // wishlist items er arry moddy data gulo rakha hoitechy wishlistItems variable dia.
      const wishlistItems = exisitngItem ? state.wishlist.wishlistItems.map(item => item._id === exisitngItem._id ? newItem : item) : [...state.wishlist.wishlistItems, newItem]
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
      return { ...state, wishlist: { ...state.wishlist, wishlistItems } }


    case 'REMOVE_WISHLIST_ITEM': {
      const removeItem = action.payload;
      const wishlistItems = state.wishlist.wishlistItems.filter(item => item._id !== removeItem._id);
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
      return { ...state, wishlist: { ...state.wishlist, wishlistItems } }
    }

    default:
      return state;
  }
}


const userInitialSate = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return { ...state, userInfo: null }
    default:
      return state;
  }
}

const StoreProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialSate);
  const [state2, dispatch2] = useReducer(reducer2, initialSate2);
  const [state3, dispatch3] = useReducer(userReducer, userInitialSate);

  const value = { state, dispatch, state2, dispatch2, state3, dispatch3 };
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}

export { Store, StoreProvider };