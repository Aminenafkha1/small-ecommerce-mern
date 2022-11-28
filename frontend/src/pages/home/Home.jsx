import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addToCart, getTotals } from '../../features/cartSlice';
import { productsFetch } from '../../features/productsSlice';
import './home.css'
const Home = () => {
  const { items, status ,createStatus} = useSelector((state) => state.products)
  const auth = useSelector((state) => state.auth)

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productsFetch())
    dispatch(getTotals());

  }, [dispatch]);



  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    navigate('/cart')
  }
  
  return (
    <div className="home-container">
      {
         createStatus=='pending' ? <p> Loading...</p> : createStatus=='rejected' ?
          <p> An error occured...</p> :
          <>
            <h2>
              New Arrivals
            </h2>
            <div className="products">
              {items?.map((product) => <div key={product.id} className="product">

                <h3>{product.title}</h3>
                <img src={product.img?.url} alt={product.title} />
                <div className="details">
                  <span>{product.desc}</span>
                  <span className="price">${product.price}</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
              </div>)}
            </div>


          </>
      }

    </div>
  )
}

export default Home