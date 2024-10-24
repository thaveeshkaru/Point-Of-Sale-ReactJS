import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import html2pdf from "html2pdf.js";

function OrderInvoice(){
    const [cart, setCart] = useState<any[]>([]);
    const [orderId, setOrderId] = useState<number>(0);
    const [grandTotalPrice, setGrandTotalPrice] = useState<number>(0);
    const [subTotalPrice, setSubTotalPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const[orderDateTime,setOrderDateTime]= useState<string>("");
    const{isAuthenticated,jwtToken} = useAuth();


    const config ={
        headers:{
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadOrderByID(orderId: number) {
        try {
            const apiResponse = await axios.get("http://localhost:8081/orders/" + orderId, config);
            console.log(apiResponse.data);
            setGrandTotalPrice(apiResponse.data.totalPrice);
            setDiscount(apiResponse.data.discount);
            setPaymentMethod(apiResponse.data.paymentMethod);
            setOrderDateTime(apiResponse.data.orderDateTime);
        } catch (error) {
            console.error(error);
        }
    }

    function calculateSubTotal(cart: any[]) {
        let total = 0;
        cart.map(function(item){
            total += item.price;
        });
        setSubTotalPrice(total);
    }
    const navigate = useNavigate();

    function handleContinueShopping(){
      localStorage.removeItem("cart");
      localStorage.removeItem("orderId");
      localStorage.removeItem("stockIds");

      navigate("/")
    }

    function handleDownloadInvoice(){
        const element = document.querySelector("#invoice");
        html2pdf(element,{
            margin: 20
        });
    }

    useEffect(function(){
        if(isAuthenticated){
            const cartData = localStorage.getItem("cart") || "";
            const storedOrderId = localStorage.getItem("orderId") || "";

            if (cartData) {
                const parsedCart = JSON.parse(cartData);
                setCart(parsedCart);
                calculateSubTotal(parsedCart); 
            }

            if (storedOrderId) {
                const parsedOrderId = JSON.parse(storedOrderId);
                setOrderId(parsedOrderId); 
                loadOrderByID(parsedOrderId); 
            }
        }
    }, [isAuthenticated]);

    return (
        <div id="invoice" className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
            <div className="max-w-2xl mx-auto p-8 shadow-xl rounded-lg bg-white">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-5 text-green-600">Payment Successful</h1>
                    <p className="text-lg text-gray-500">Thank you for your purchase!</p>
                </div>
                <div className="mb-3 font-semibold text-gray-900">Invoice: {orderId}</div>
                <div className="relative overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-200 text-sm text-slate-600">
                                <th className="p-3 w-[70px] text-left">#</th>
                                <th className="p-3 w-[200px] text-left">Item Name</th>
                                <th className="p-3 w-[200px] text-left">Description</th>
                                <th className="p-3 w-[50px] text-left">Price(Rs)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(function(item){
                            return(
                                <tr>
                                    <td className="p-3 text-left">{item.itemCode}</td>
                                    <td className="p-3 text-left">{item.itemName}</td>
                                    <td className="p-3 text-left">{item.description}</td>
                                    <td className="p-3 text-left">{item.price}</td>
                                </tr>
                            )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="bg-gray-100 p-5 rounded-lg shadow-md mt-12">
                    <div className="flex justify-between py-2">
                        <span className="font-medium text-gray-700">Sub Total:</span>
                        <span className="font-semibold text-gray-900 text-right">Rs {subTotalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="font-medium text-gray-700">Discount:</span>
                        <span className="font-semibold text-gray-900 text-right">Rs {discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="font-medium text-gray-700">Payment Method:</span>
                        <span className="font-semibold text-gray-900 text-right">{paymentMethod}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="font-medium text-gray-700">Date and Time:</span>
                        <span className="font-semibold text-gray-900 text-right">{orderDateTime}</span>
                    </div>
                    <div className="border-t border-gray-300 my-4"></div>
                    <div className="flex justify-between py-2 sm:text-xl text-lg">
                        <span className="font-bold text-gray-800">Grand Total:</span>
                        <span className="font-bold text-green-600 text-right">Rs {grandTotalPrice.toFixed(2)}</span>
                    </div>
                </div>
                <div className="mt-10 text-center" data-html2canvas-ignore>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold mr-3 " onClick={handleContinueShopping}>
                    Continue
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold mt-3" onClick={handleDownloadInvoice} >
                    Download
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderInvoice;


