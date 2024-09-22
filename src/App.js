import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Components/Navbar/Navbar";
import About from "./Pages/About/About";
import Homepage from "./Pages/Homepage/Homepage";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/user/Dashboard";
import PrivateRoute from "./Components/Routes/Private";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Orders from "./Pages/user/Orders";
import Profile from "./Pages/user/Profile";
import Footer from "./Components/Footer/Footer";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import Shop from "./Pages/Shop/Shop";
import Search from "./Pages/Search/Search";
import MoreDetails from "./Pages/MoreDeatils";
import CartPage from "./Pages/Cart/CartPage";
import Cancle from "./Pages/Cancle";
import Success from "./Pages/Success";
import AdminOrders from "./Pages/Admin/AdminOrders";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/product/:slug" element={<MoreDetails/>} />
        <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>} />
        <Route path="user/orders" element={<Orders/>} />
        <Route path="user/profile" element= {<Profile />}/>
       </Route>
       <Route path= "/dashboard" element={<AdminRoute/>}>
       <Route path="admin" element={<AdminDashboard/>}/>
       <Route path="admin/create-category" element={<CreateCategory/>}/>
       <Route path="admin/create-product" element={<CreateProduct/>}/>
       <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
       <Route path="admin/products" element={<Products/>}/>
       <Route path="admin/users" element={<Users/>}/>
       <Route path="admin/orders" element={<AdminOrders/>}/>
       </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element= {<Shop/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/Shop" element={<Shop/>}/>
        <Route path="/cancel" element={<Cancle/>}/>
        <Route path="/success" element={<Success/>}/>
                         
        
      </Routes>
      <Footer/>
      <ToastContainer/>
      
    </div>
  );
}

export default App;
