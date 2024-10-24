import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function OrderCheckout() {
    const [cart, setCart] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const[error,setError] = useState<string>("");
    const{isAuthenticated,jwtToken} = useAuth();


    const config ={
      headers:{
          Authorization: `Bearer ${jwtToken}`
      }
    }

    function handleDiscount(event: any) {
      setDiscount(event.target.value);
    }

    function handleCashPayment() {
      setError("");
      setPaymentMethod("Cash");
    }

    function handleDebitPayment() {
      setError("");
      setPaymentMethod("Debit");
    }

    const navigate =useNavigate();
    async function handlePlaceOrder() {
      try {
        if(paymentMethod=="Debit" || paymentMethod=="Cash"){
          const itemCodes:any =[];

          cart.map(function(item){
              itemCodes.push(item.itemCode)
          });
          const data ={
              itemCodes:itemCodes,
              paymentMethod:paymentMethod,
              discount:discount
          }
          const apiResponce = await axios.post("http://localhost:8081/orders",data, config);
          localStorage.setItem("orderId",JSON.stringify(apiResponce.data.orderId));
          navigate("/orders/invoice");
        }else{
          setError("Invalid place order");
        }
      } catch (error) {
          console.log(error);
      }
    }

    useEffect(function () {
      if(isAuthenticated){
        const cartdata = localStorage.getItem("cart") || "";
        if (cartdata) {
          setCart(JSON.parse(cartdata));
        }
      }
    }, [isAuthenticated]);

    useEffect(function () {
        let total = 0;
        cart.map(function (item) {
          total = total + item.price;
        });
        setTotalPrice(total);
      },[cart]);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
          <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-md z-50">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-3xl font-semibold tracking-wide hover:scale-105">Checkout</h1>
              </div>
            </div>
            <div className="mt-24">
            <div className="flex flex-col lg:flex-row">
              <div className="relative overflow-x-auto p-5 lg:w-[60%] border-r border-slate-300 bg-white rounded-lg shadow-lg ">
                <table className="table-auto w-full ">
                  <thead>
                    <tr className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                      <th className="p-4 w-[50px] text-left">#</th>
                      <th className="p-4 w-[200px] text-left">Item Name</th>
                      <th className="p-4 w-[200px] text-left">Description</th>
                      <th className="p-4 text-left w-[100px]">Price(Rs)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {cart.map(function (item) {
                      return (
                        <tr className="border-b border-slate-200">
                          <td className="p-4 text-left">{item.itemCode}</td>
                          <td className="p-4 text-left">{item.itemName}</td>
                          <td className="p-4 text-left">{item.description}</td>
                          <td className="p-4 text-left">{item.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="w-full lg:w-[40%] lg:ml-5 mt-5 lg:mt-0 bg-gray-100 p-6 rounded-lg shadow-lg ">
                <table className="table-auto w-full mb-6">
                  <tbody className="text-lg text-gray-700 mb-2">
                    <tr className="border-b">
                      <td className="p-4">Sub Total</td>
                      <td className="p-4 text-right">{totalPrice.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Discount</td>
                      <td className="text-right p-4">
                        <input
                          type="text"
                          className="text-right text-slate-600 font-sm p-2 border border-slate-300 rounded-lg w-[100%] sm:w-[150px]"
                          onChange={handleDiscount}
                          required
                        />
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Grand Total</td>
                      <td className="text-right p-4">Rs {(totalPrice - discount).toFixed(2)}</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Payment method</td>
                      <td className="p-4 text-right">
                        <span className={`text-right cursor-pointer p-4 ${paymentMethod === "Cash" ? "font-bold text-blue-600" : "text-gray-600"}`} onClick={handleCashPayment}>
                          Cash
                        </span>
                        <span className={`text-right cursor-pointer ${paymentMethod === "Debit" ? "font-bold text-blue-600" : "text-gray-600"}`} onClick={handleDebitPayment}>
                          Debit
                        </span>
                      </td>
                    </tr>
                    {error && <div className="text-sm text-red-500 p-4">{error}</div>}
                  </tbody>
                </table>

                    {paymentMethod === "Debit" && (
                      <tr className="flex justify-end">
                        <td colSpan={4}>
                          <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-4">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Debit Card Payment</h2>
                            <form className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Cardholder's Name</label>
                                <input
                                  type="text"
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  placeholder="John Doe"
                                  required
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                <input
                                  type="text"
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  placeholder="1234 5678 9012 3456"
                                  required
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                  <input
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="MM/YY"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                                  <input
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="123"
                                    required
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </td>
                      </tr>
                    )}

                    <div className="mt-6">
                      <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl shadow hover:bg-blue-700 font-semibold"
                      >
                        Place Order
                      </button>
                    </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default OrderCheckout;





