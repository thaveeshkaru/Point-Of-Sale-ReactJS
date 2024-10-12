import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import axios from "axios";

function Order(){
    const[orders,setOrders]= useState<OrderType[]>([]);

    async function loadOrders() {
        const apiResponce = await axios.get("http://localhost:8081/orders");
        setOrders(apiResponce.data);
    }

    useEffect(function(){
        loadOrders();
    },[]);

    return(
        <div>
            <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-md z-50">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Orders</h1>
            </div>
            </div>
            <div className="container  mx-auto pt-5 pb-5 px-9 mt-20">
                <table className="table-auto w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                        <tr>
                            <th className="p-2 w-[50px] text-left">#</th>
                            <th className="p-2 w-[200px] text-left">Order Date And Time</th>
                            <th className="p-2 w-[100px] text-left">Discount</th>
                            <th className="p-2 w-[100px] text-left">Total Price</th>
                            <th className="p-2 w-[100px] text-left">Payment Methode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(function(order){
                            return(
                                <tr  className="hover:bg-slate-100">
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{order.orderId}</td>
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{order.orderDateTime}</td>
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{order.discount}</td>
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{order.totalPrice}</td>
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{order.paymentMethod}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Order;