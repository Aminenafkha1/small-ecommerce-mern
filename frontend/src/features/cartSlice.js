
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}


const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info("increased product quantity", {
                    position: "bottom-left"
                })
            } else {

                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);

                toast.success("Product added successfully to your cart", {
                    position: "bottom-left"
                })
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            );

            state.cartItems = nextCartItems
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))


            toast.error(`${action.payload.title} removed from your cart`, {
                position: "bottom-left"
            })
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1


                toast.info(`Descreased ${action.payload.title}  from your cart`, {
                    position: "bottom-left"
                })
            }

            else if (state.cartItems[itemIndex].cartQuantity === 1) {



                const nextCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );

                state.cartItems = nextCartItems


                toast.error(`${action.payload.title} removed from your cart`, {
                    position: "bottom-left"
                })


            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

        },
        increaseCart(state, action) {

            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )

                state.cartItems[itemIndex].cartQuantity += 1


                toast.info(`Increased ${action.payload.title}  to your cart`, {
                    position: "bottom-left"
                })
            


            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))


        },

        clearAll(state, action) {

             state.cartItems=[]
             toast.error(`Cart cleared`, {
                position: "bottom-left"
            })

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))


        },

        getTotals(state,action) {
            let { total,quantity }= state.cartItems.reduce(
                (cartTotal,cartItem) => {
                 const {price,cartQuantity}=cartItem;
                 const itemTotal = price * cartQuantity;

                 cartTotal.total+= itemTotal ;
                 cartTotal.quantity += cartQuantity;

                 return cartTotal;
              },
              {
                total:0,
                quantity: 0,
              }
              );

              state.cartTotalQuantity=quantity;
              state.cartTotalAmount=total;
        },

    },

});


export const { addToCart, removeFromCart ,decreaseCart , increaseCart ,clearAll ,getTotals} = cartSlice.actions;
export default cartSlice.reducer;