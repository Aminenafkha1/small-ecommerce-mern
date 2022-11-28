import './App.css';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './layout/Navbar/Navbar';
import Home from './pages/home/Home';
import NotFound from './components/Notfound/NotFound';
import Cart from './components/Cart/Cart';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Users from './pages/admin/Users';
import Orders from './pages/admin/Orders';
import Summary from './pages/admin/Summary';
import CreateProduct from './pages/admin/CreateProduct';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='/admin' element={<Dashboard />} >
            <Route path="summary" element={<Summary />} />

            <Route path='products' element={<Products />}>
              <Route path="create-product" element={<CreateProduct />} />
              
            </Route>

            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />

          </Route>


          <Route path='*' element={<NotFound />} />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
