import React, { useEffect } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './cart.css'
import { decreaseCart, removeFromCart, increaseCart, clearAll, getTotals } from '../../features/cartSlice';


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getTotals());
  }, [cart,dispatch])
  const handleRemovefromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };


  const handleDescreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };


  const handleIncreasedCart = (cartItem) => {
    dispatch(increaseCart(cartItem));
  };


  const handleClearCart = () => {
    dispatch(clearAll());
  };
  return (
    <div className='cart-container'>

      <h2>Shopping Cart </h2>
      {cart.cartItems.length === 0 ? (
        <div className='cart-empty'>
          <p> you don't select any product yet </p>
          <div className='start-shopping'>
            <Link to='/'>
              <ArrowBackIosIcon />
              <span> Start Shopping</span>

            </Link>

          </div>



        </div>
      ) : (

        <div>
          <div className='titles'>
            <h3 className='product-title' > Product</h3>
            <h3 className='price'> Description </h3>
            <h3 className='Quantity'> Description </h3>

            <h3 className='total'> Actions </h3>

          </div>
          <div className='cart-items'>
            {cart.cartItems?.map(item => (
              <div className='cart-item' key={item.id}>
                <div className='cart-product'>
                  <img src={item.img?.url} alt={item.title} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <button onClick={() => handleRemovefromCart(item)}>Remove</button>

                  </div>


                </div>
                <div className='cart-product-price'>
                  {item.price}

                </div>
                <div className='cart-product-quantity'>
                  <button onClick={() => handleDescreaseCart(item)}>-</button>
                  <div className='count'> {item.cartQuantity}</div>
                  <button onClick={() => handleIncreasedCart(item)}>+</button>


                </div>

                <div className='cart-product-total-price'>
                  ${item.price * item.cartQuantity}

                </div>
              </div>

            ))
            }



          </div>

          <div className='cart-summary'>
            <button className='clear-cart' onClick={() => handleClearCart()}>Clear Cart</button>
            <div className='cart-checkout'>
              <div className='subtotal'>

                <span>Subtotal</span>
                <span className='amount'> ${cart.cartTotalAmount} </span>

              </div>
              <p> Taxes and shpping calculated at checkout</p>
              {auth._id ?<button> Check out</button>
 : <button className='cart-login' onClick={()=> navigate('/login')}>Login to Check out</button> }
              <div className='continue-shopping'>
                <Link to='/'>
                  <ArrowBackIosIcon />
                  <span> Continue Shopping</span>


                </Link>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Cart