import React, { createContext, useContext, useReducer } from 'react';

// Define your initial state and reducer if needed
const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Add logic to handle adding items to the cart
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    // Add more cases as needed

    default:
      return state;
  }
};

// Create the context
const CartContext = createContext();

// Create the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };
  // Add more functions as needed

  return (
    <CartContext.Provider value={{ state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a hook for using the context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartContext, CartProvider, useCart };
