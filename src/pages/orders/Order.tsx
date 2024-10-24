import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Order(){
    const[orders,setOrders]= useState<OrderType[]>([]);
    const{isAuthenticated,jwtToken} = useAuth();
    const[isAboutDropDownOpen, setIsAboutDropDownOpen]= useState<boolean>(false);
    const[isContactDropDownOpen, setIsContactDropDownOpen]= useState<boolean>(false);
    const navigate = useNavigate();


    const config ={
        headers:{
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadOrders() {
        const apiResponce = await axios.get("http://localhost:8081/orders", config);
        setOrders(apiResponce.data);
    }

    function openAboutDropDown() {
        setIsAboutDropDownOpen(!isAboutDropDownOpen); 
        setIsContactDropDownOpen(false);
      };

    function openContactDropDown() {
        setIsContactDropDownOpen(!isContactDropDownOpen);
        setIsAboutDropDownOpen(false)
    };

    useEffect(function(){
        if(isAuthenticated){
            loadOrders();
        }
    },[isAuthenticated]);

    return(
        <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
            <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-lg z-50">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold tracking-wide hover:scale-105">Orders</h1>
                    <div className="hidden md:flex space-x-8">
                        <a href="#" className="hover:text-gray-300" onClick={()=> navigate("/")} >Home</a>
                        <div className="relative">
                            <a href="#" className={`hover:text-gray-300 ${isAboutDropDownOpen && ("text-green-300 font-bold")}`} onClick={openAboutDropDown}>About</a>
                            {isAboutDropDownOpen && (
                                <div className="absolute top-full mt-2 w-[230px] mr-10 bg-white text-black rounded-md shadow-lg z-10">
                                    <p className="m-2 text-sm text-gray-700">Our Point of Sale (POS) system offers a comprehensive solution to manage sales, inventory, and customer orders. With this system, you can easily add and manage items, organize them into categories, track stock levels, and create orders seamlessly.
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <a href="#" className={`hover:text-gray-300 ${isContactDropDownOpen && ("text-green-300 font-bold")}`} onClick={openContactDropDown}>Contact</a>
                            {isContactDropDownOpen && (
                                 <div className="absolute top-full mt-2 w-[154px] mr-10 bg-white text-black rounded-md shadow-lg z-10">
                                     <p className="m-2 text-sm text-gray-700">Contact us: 0382234231
                                     </p>
                                     <p className="m-2 text-sm text-gray-700">Email us: info@possystem.com</p>
                                 </div>
                            )}
                        </div>
                        <a href="#" className="hover:text-gray-300" onClick={()=> navigate("/orders/cart")}>Cart</a>

                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-20">
            <div className="relative overflow-x-auto bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Order List</h2>
                <table className="table-auto min-w-full bg-gray-100 rounded-lg">
                    <thead className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm uppercase">
                        <tr>
                            <th className="p-3 w-[50px] text-left">#</th>
                            <th className="p-3 w-[200px] text-left">Order Date And Time</th>
                            <th className="p-3 w-[100px] text-left">Discount</th>
                            <th className="p-3 w-[100px] text-left">Total Price</th>
                            <th className="p-3 w-[100px] text-left">Payment Methode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(function(order){
                            return(
                                <tr  className="hover:bg-gray-50">
                                    <td className="p-3 text-slate-600 border-b border-slate-200">{order.orderId}</td>
                                    <td className="p-3 text-slate-600 border-b border-slate-200">{order.orderDateTime}</td>
                                    <td className="p-3 text-slate-600 border-b border-slate-200">{order.discount}</td>
                                    <td className="p-3 text-slate-600 border-b border-slate-200">{order.totalPrice}</td>
                                    <td className="p-3 text-slate-600 border-b border-slate-200">{order.paymentMethod}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}

export default Order;