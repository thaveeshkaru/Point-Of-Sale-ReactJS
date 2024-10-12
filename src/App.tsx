import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Item from "./pages/Item";
import Category from "./pages/Category";
import Stock from "./pages/Stock";
import CreateOrder from "./pages/orders/CreateOrder";
import OrderCheckout from "./pages/orders/OrderCheckout";
import OrderInvoice from "./pages/orders/OrderInvoice";
import Home from "./pages/Home";
import Order from "./pages/orders/Order";
import Register from "./pages/Register";
import Cart from "./pages/orders/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/item" element={<Item/>} />
        <Route path="/category" element={<Category/>}/>
        <Route path="/stock" element={<Stock/>}/>
        <Route path="/orders/create" element={<CreateOrder/>} />
        <Route path="/orders/checkout" element={<OrderCheckout/>} />
        <Route path="/orders/invoice" element={<OrderInvoice/>} />
        <Route path="/orders" element={<Order/>} />
        <Route path="/orders/cart" element={<Cart/>} />
      </Routes>
    </BrowserRouter>
     
  )
}

export default App;

