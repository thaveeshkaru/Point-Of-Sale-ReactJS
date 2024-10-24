import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ItemType from "../../types/ItemType";

function Cart(){
    const[cart,setCart]=useState<any[]>([]);
    const[totalPrice,setTotalPrice]=useState<number>(0);
    const[stockIds,setStockIds]=useState<any[]>([]);
    const navigate=useNavigate();
    const{isAuthenticated,jwtToken}=useAuth();

    const config ={
        headers:{
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function handleDelete(Item: ItemType){
        const index = cart.findIndex(item => item.itemCode === Item.itemCode);
        if (index !== -1) {
            const toUpdateStockId = stockIds[index];
            const apiResponce = await axios.get("http://localhost:8081/stocks/findbyid/" + toUpdateStockId, config);
            const stockData = apiResponce.data
            const updateStockData = {
                itemCode: stockData.item.itemCode,
                quantityOnHand: stockData.quantityOnHand + 1,
                location: stockData.location,
            }
    
            await axios.put("http://localhost:8081/stocks/" + toUpdateStockId, updateStockData,config );

            const newCart = [...cart]; 
            console.log(newCart)
            newCart.splice(index, 1); 
            setCart(newCart);
            localStorage.setItem("cart",JSON.stringify(newCart)); 

            const newStockIds=[...stockIds];
            newStockIds.splice(index,1);
            setStockIds(newStockIds);
            localStorage.setItem("stockIds",JSON.stringify(newStockIds));

        }

    }

    useEffect(function(){
        if(isAuthenticated){
            const cartdata= localStorage.getItem("cart") || "";
            const stockIds= localStorage.getItem("stockIds") || "";
            if(cartdata && stockIds){
                setCart(JSON.parse(cartdata));
                setStockIds(JSON.parse(stockIds));
            }
        }
    },[isAuthenticated]);

    useEffect(() => {
        let total = 0;
        cart.map(function(item){
            total += item.price;
        });
        setTotalPrice(total);
    }, [cart]);



    return(
        <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
            <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-md z-50">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold tracking-wide hover:scale-105">Item Cart</h1>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 mt-20">
                <div className="w-full lg:w-[60%] p-4">
                    {cart.map(function(item){
                        return(
                            <div className="p-5 mb-6 border border-slate-200 rounded-lg hover:scale-105 bg-gradient-to-r from-cyan-500 to-blue-600 relative" >
                                    <div className="text-2xl font-bold text-white mb-2">{item.itemName}</div>
                                    <div className="text-sm text-gray-100 mb-3">{item.description}</div>
                                    <div className="text-sm text-right text-white font-semibold">Rs.{item.price}</div>
                                    <button className="absolute top-3 right-3 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg" onClick={()=> handleDelete(item)}>Remove</button>
                            </div>
                        )
                    })}
                </div>
                <div className="w-full lg:w-[40%] p-6 border border-slate-200 rounded-lg bg-white shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
                    <div className="flex justify-between text-lg font-semibold text-gray-700 mb-2">
                        <span>Total Items:</span> <span>{cart.length}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-gray-700 mb-4">
                        <span>Sub Total:</span> <span>{totalPrice.toFixed(2)}</span>
                    </div>
                    <button className="w-full px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold " onClick={()=> navigate("/orders/checkout")}>Go to Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;

