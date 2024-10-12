// import { useEffect, useState } from "react";
// import OrderType from "../../types/OrderType";
// import axios from "axios";

// function OrderCheckout(){

//     const[orderedItem,setOrderedItems] = useState<OrderType[]>([]);
//     const[cart,setCart] = useState<any[]>([]);
//     const[totalPrice,setTotalPrice] = useState<number>(0);
//     const[discount,setDiscount]= useState<number>(0);
//     const[paymentMethod,setPaymentMethod]= useState<string>("")

//     async function loadOrders() {
//         const apiResponce = await axios.get("http://localhost:8081/items");
//         setOrderedItems(apiResponce.data);
//     }

//     function handleDiscount(event:any){
//         setDiscount(event.target.value);
//     }

//     function handleCashPayment(){
//         setPaymentMethod("cash");
//     }

//     function handleDebitPayment(){
//         setPaymentMethod("cash");
//     }

// //    async function getCart (){
        
// //         // const cartdata = localStorage.getItem("cart") || "";
// //         // if(cartdata){
// //         //     setCart(JSON.parse(cartdata));
// //         // }
// //      //   setCart(JSON.parse(cartdata))
// //         //const data =cart ? JSON.parse(cartdata) : [];
// //       //  cart.push(data)
// //       cart.map(function(item){
// //         const total = totalPrice + item.price
// //         setTotalPrice(total);
// //     })
        
         
        
// //     }


//     useEffect(function(){
//         loadOrders();
//         const cartdata = localStorage.getItem("cart") || "";
//         if(cartdata){
//             setCart(JSON.parse(cartdata));
//         }
//     },[]);

//     useEffect(function(){
//         let total=0;
//         cart.map(function(item){
//              total = total + item.price    
//         });
//         setTotalPrice(total);
//     },[cart]);

//     return(
//         <div className="m-5">
//             <div className="text-3xl text-slate-800 font-semibold">
//                 Checkout
//             </div>
//             <div className="flex">
//                 <div className="p-2 w-[1500px] border-r border-slate-180 mt-2">
                    
//                     <table className="table-auto w-full">
//                         <thead>
//                             <tr className="bg-slate-100">
//                                 <th className="p-2 w-[50px] text-left">#</th>
//                                 <th className="p-2 w-[200px] text-left">Item Name</th>
//                                 <th className="p-2 text-left w-[100px]">Item Price</th>
//                             </tr> 
//                         </thead>
//                         <thead>
//                             {cart.map(function(item){
//                                 return(
//                                     <tr>
//                                         <td>{item.itemCode}</td>
//                                         <td>{item.itemName}</td>
//                                         <td>{item.price}</td>
//                                     </tr>
//                                 )
//                             })}
//                         </thead>
//                     </table>
//                 </div>
//                 <table className="table-auto w-full m-5">
//                     <thead>
//                         <tr>
//                             <th className="w-[200px]"></th>
//                             <th className="w-[200px]"></th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-xl text-slate-800 mb-2">
//                     <tr className="border-b border-slate-180 mb-2">
//                             <td>Total</td>
//                             <td colSpan={2}></td>
//                             <td className="text-right">{totalPrice.toFixed(2)}</td>
//                     </tr>
//                     <tr className="border-b border-slate-180 mb-2">
//                             <td>Discount</td>
//                             {/* <div className="flex justify-end"> */}
//                             <td colSpan={2}></td>
//                             <td className="text-right"><input type="text" id="productPrice" className="text-right text-slate-600 font-sm p-2 border border-slate-300 rounded-lg w-[150px]" onChange={handleDiscount} required />
//                             </td>         
//                     </tr>

//                     <tr className="border-b border-slate-180 mb-2">
//                         <td>Sub Total</td>
//                         <td colSpan={2}></td>
//                         <td className="text-right">Rs {(totalPrice-discount).toFixed(2)}</td>
//                     </tr>
//                     <tr className="border-b border-slate-180 mb-2">
//                         <td>Payment method</td>
//                         <td colSpan={1}></td>
//                         <td className="text-rigth" onClick={handleCashPayment}>Cash</td>
//                         {/* <td colSpan={1}></td> */}
//                         <td className="text-right" onClick={handleDebitPayment}>Debit</td>
                        
//                     </tr>
//                     </tbody>
//                 </table>
//             </div>

//           <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-5">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700">Debit Card Payment</h2>
//           <form className="space-y-4">
//             {/* Cardholder's Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Cardholder's Name</label>
//               <input
//                 type="text"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="John Doe"
//                 required
//               />
//             </div>

//             {/* Card Number */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Card Number</label>
//               <input
//                 type="text"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="1234 5678 9012 3456"
//                 required
//               />
//             </div>

//             {/* Expiry Date and CVV */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="MM/YY"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">CVV</label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="123"
//                   required
//                 />
//               </div>
//             </div>
//         </form>

//         </div>
        
//     </div>
                
//     )
// }

// export default OrderCheckout;

// import { useEffect, useState } from "react";
// import OrderType from "../../types/OrderType";
// import axios from "axios";

// function OrderCheckout() {
//   const [orderedItem, setOrderedItems] = useState<OrderType[]>([]);
//   const [cart, setCart] = useState<any[]>([]);
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [discount, setDiscount] = useState<number>(0);
//   const [paymentMethod, setPaymentMethod] = useState<string>("");

//   async function loadOrders() {
//     const apiResponce = await axios.get("http://localhost:8081/items");
//     setOrderedItems(apiResponce.data);
//   }

//   function handleDiscount(event: any) {
//     setDiscount(event.target.value);
//   }

//   function handleCashPayment() {
//     setPaymentMethod("cash");
//   }

//   function handleDebitPayment() {
//     setPaymentMethod("debit");
//   }

//   function handelSave(){
    
//   }

//   useEffect(function () {
//     loadOrders();
//     const cartdata = localStorage.getItem("cart") || "";
//     if (cartdata) {
//       setCart(JSON.parse(cartdata));
//     }
//   }, []);

//   useEffect(
//     function () {
//       let total = 0;
//       cart.map(function (item) {
//         total = total + item.price;
//       });
//       setTotalPrice(total);
//     },
//     [cart]
//   );

//   return (
//     <div className="m-5">
//       <div className="text-3xl text-slate-800 font-semibold">Checkout</div>
//       <div className="flex">
//         <div className="p-2 w-[1500px] border-r border-slate-180 mt-2">
//           <table className="table-auto w-full">
//             <thead>
//               <tr className="bg-slate-100">
//                 <th className="p-2 w-[50px] text-left">#</th>
//                 <th className="p-2 w-[200px] text-left">Item Name</th>
//                 <th className="p-2 text-left w-[100px]">Item Price</th>
//               </tr>
//             </thead>
//             <thead>
//               {cart.map(function (item) {
//                 return (
//                   <tr key={item.itemCode}>
//                     <td>{item.itemCode}</td>
//                     <td>{item.itemName}</td>
//                     <td>{item.price}</td>
//                   </tr>
//                 );
//               })}
//             </thead>
//           </table>
//         </div>

//         <table className="table-auto w-full m-5">
//           <thead>
//             <tr>
//               <th className="w-[200px]"></th>
//               <th className="w-[200px]"></th>
//             </tr>
//           </thead>
//           <tbody className="text-xl text-slate-800 mb-2">
//             <tr className="border-b border-slate-180 mb-2">
//               <td>Total</td>
//               <td colSpan={2}></td>
//               <td className="text-right">{totalPrice.toFixed(2)}</td>
//             </tr>
//             <tr className="border-b border-slate-180 mb-2">
//               <td>Discount</td>
//               <td colSpan={2}></td>
//               <td className="text-right">
//                 <input
//                   type="text"
//                   className="text-right text-slate-600 font-sm p-2 border border-slate-300 rounded-lg w-[150px]"
//                   onChange={handleDiscount}
//                   required
//                 />
//               </td>
//             </tr>

//             <tr className="border-b border-slate-180 mb-2">
//               <td>Sub Total</td>
//               <td colSpan={2}></td>
//               <td className="text-right">Rs {(totalPrice - discount).toFixed(2)}</td>
//             </tr>
//             <tr className="border-b border-slate-180 mb-2">
//               <td>Payment method</td>
//               <td colSpan={1}></td>
//               <td className="text-right cursor-pointer" onClick={handleCashPayment}>Cash</td>
//               <td className="text-right cursor-pointer" onClick={handleDebitPayment}>Debit</td>
//             </tr>

//             {/* Debit Card Form - Conditionally displayed below the payment method */}
//             {paymentMethod === "debit" && (
//               <tr>
//                 <td colSpan={4}>
//                   <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-4">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-700">Debit Card Payment</h2>
//                     <form className="space-y-4">
//                       {/* Cardholder's Name */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">Cardholder's Name</label>
//                         <input
//                           type="text"
//                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                           placeholder="John Doe"
//                           required
//                         />
//                       </div>

//                       {/* Card Number */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">Card Number</label>
//                         <input
//                           type="text"
//                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                           placeholder="1234 5678 9012 3456"
//                           required
//                         />
//                       </div>

//                       {/* Expiry Date and CVV */}
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
//                           <input
//                             type="text"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="MM/YY"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">CVV</label>
//                           <input
//                             type="text"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="123"
//                             required
//                           />
//                         </div>
//                       </div>

//                       {/* Submit Button */}
//                       <div>
//                         <button
//                           type="submit"
//                           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//                         >
//                           Submit Payment
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </td>
//               </tr>
//             )}
//             <div className="mt-5 w-full mr-5">
//                 <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm mt-4 " onClick={handelSave}>Save Order</button>
//             </div>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default OrderCheckout;

import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderCheckout() {
  const [orderedItems, setOrderedItems] = useState<OrderType[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const[error,setError] = useState<string>("")

  async function loadOrders() {
    const apiResponce = await axios.get("http://localhost:8081/items");
    setOrderedItems(apiResponce.data);
  }

  function handleDiscount(event: any) {
    setDiscount(event.target.value);
  }

  function handleCashPayment() {
    setError("");
    setPaymentMethod("cash");
  }

  function handleDebitPayment() {
    setError("");
    setPaymentMethod("debit");
  }

  const navigate =useNavigate();
  async function handlePlaceOrder() {
    try {
      if(paymentMethod=="debit" || paymentMethod=="cash"){
        const itemCodes:any =[];

        cart.map(function(item){
            itemCodes.push(item.itemCode)
        });
        const data ={
            itemCodes:itemCodes,
            paymentMethod:paymentMethod,
            discount:discount
        }
        // console.log(itemCodes)
        // console.log(discount)
        const apiResponce = await axios.post("http://localhost:8081/orders",data);
        localStorage.setItem("orderId",JSON.stringify(apiResponce.data.orderId));
     //   localStorage.setItem("cart",JSON.stringify(orderedItems))
       navigate("/orders/invoice");
      }else{
        setError("Invalid place order")
      }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(function () {
    loadOrders();
    const cartdata = localStorage.getItem("cart") || "";
    if (cartdata) {
      setCart(JSON.parse(cartdata));
    }
  }, []);

  useEffect(
    function () {
      let total = 0;
      cart.map(function (item) {
        total = total + item.price;
      });
      setTotalPrice(total);
    },
    [cart]
  );

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-md z-50">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Checkout</h1>
            {/* <div className="space-x-4">
              <button
                onClick={() => navigate("/")}
                className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Home
              </button>
            </div> */}
          </div>
        </div>
      
      <div className="m-5">
        <div className="text-4xl text-slate-800 font-bold mb-8">Checkout</div>
        <div className="flex flex-col lg:flex-row">
          {/* Cart Table */}
          <div className="p-5 lg:w-[60%] border-r border-slate-300 bg-white rounded-lg shadow-lg hover:scale-105">
            <table className="table-auto w-full ">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                  <th className="p-4 w-[50px] text-left">#</th>
                  <th className="p-4 w-[200px] text-left">Item Name</th>
                  <th className="p-4 w-[200px] text-left">Description</th>
                  <th className="p-4 text-left w-[100px]">Price(Rs)</th>
                </tr>
              </thead>
              <thead className="text-gray-700">
                {cart.map(function (item) {
                  return (
                    <tr>
                      <td className="p-4 text-left">{item.itemCode}</td>
                      <td className="p-4 text-left">{item.itemName}</td>
                      <td className="p-4 text-left">{item.description}</td>
                      <td className="p-4 text-left">{item.price}</td>
                    </tr>
                  );
                })}
              </thead>
            </table>
          </div>

          {/* Checkout Summary */}
          <div className="w-full lg:w-[40%] lg:ml-5 mt-5 lg:mt-0 bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105">
            <table className="table-auto w-full mb-6">
              {/* <thead>
                <tr>
                  <th className="w-[200px]"></th>
                  <th className="w-[200px]"></th>
                </tr>
              </thead> */}
              <tbody className="text-lg text-gray-700 mb-2">
                <tr className="border-b">
                  <td className="p-4">Sub Total</td>
                  {/* <td colSpan={2}></td> */}
                  <td className="p-4 text-right">{totalPrice.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Discount</td>
                  {/* <td colSpan={2}></td> */}
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
                  {/* <td colSpan={2}></td> */}
                  <td className="text-right p-4">Rs {(totalPrice - discount).toFixed(2)}</td>
                </tr>

                <tr className="border-b">
                  <td className="p-4">Payment method</td>
                  {/* <td colSpan={1}></td> */}
                  <td className="p-4 text-right">
                    <span className={`text-right cursor-pointer p-4 ${paymentMethod === "cash" ? "font-bold text-blue-600" : "text-gray-600"}`} onClick={handleCashPayment}>
                      Cash
                    </span>
                    <span className={`text-right cursor-pointer ${paymentMethod === "debit" ? "font-bold text-blue-600" : "text-gray-600"}`} onClick={handleDebitPayment}>
                      Debit
                    </span>
                  </td>
                </tr>
                {error && <div className="text-sm text-red-500 p-4">{error}</div>}
              </tbody>
            </table>

                {/* Debit Card Form */}
                {paymentMethod === "debit" && (
                  <tr>
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

                {/* Place Order Button */}
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

// import { useEffect, useState } from "react";
// import OrderType from "../../types/OrderType";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function OrderCheckout() {
//   const [orderedItems, setOrderedItems] = useState<OrderType[]>([]);
//   const [cart, setCart] = useState<any[]>([]);
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [discount, setDiscount] = useState<number>(0);
//   const [paymentMethod, setPaymentMethod] = useState<string>("");

//   async function loadOrders() {
//     const apiResponse = await axios.get("http://localhost:8081/items");
//     setOrderedItems(apiResponse.data);
//   }

//   function handleDiscount(event: any) {
//     setDiscount(event.target.value);
//   }

//   function handleCashPayment() {
//     setPaymentMethod("cash");
//   }

//   function handleDebitPayment() {
//     setPaymentMethod("debit");
//   }

//   const navigate = useNavigate();
//   async function handlePlaceOrder() {
//     try {
//       const itemCodes: any = [];
//       cart.map((item) => {
//         itemCodes.push(item.itemCode);
//       });
//       const data = {
//         itemCodes: itemCodes,
//         paymentMethod: paymentMethod,
//         discount: discount,
//       };
//       const apiResponse = await axios.post("http://localhost:8081/orders", data);
//       localStorage.setItem("orderId", JSON.stringify(apiResponse.data.orderId));
//       navigate("/orders/invoice");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(function () {
//     loadOrders();
//     const cartData = localStorage.getItem("cart") || "";
//     if (cartData) {
//       setCart(JSON.parse(cartData));
//     }
//   }, []);

//   useEffect(
//     function () {
//       let total = 0;
//       cart.map(function (item) {
//         total += item.price;
//       });
//       setTotalPrice(total);
//     },
//     [cart]
//   );

//   return (
//     <div>
//       {/* Top Navigation Bar */}
//       <div className="fixed top-0 left-0 right-0 bg-green-600 text-white py-4 px-8 shadow-md z-50">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-semibold">Checkout</h1>
//         </div>
//       </div>

//       {/* Main Checkout Content */}
//       <div className="m-5 lg:m-10 pt-20"> {/* Added pt-20 to account for the fixed top bar */}
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* Cart Table */}
//           <div className="p-5 lg:w-[60%] border-r border-slate-300 bg-white rounded-lg shadow-lg">
//             <table className="table-auto w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-600">
//                   <th className="p-4 text-left">#</th>
//                   <th className="p-4 text-left">Item Name</th>
//                   <th className="p-4 text-left">Description</th>
//                   <th className="p-4 text-left">Price (Rs)</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700">
//                 {cart.map(function (item, index) {
//                   return (
//                     <tr key={index} className="border-b">
//                       <td className="p-4">{item.itemCode}</td>
//                       <td className="p-4">{item.itemName}</td>
//                       <td className="p-4">{item.description}</td>
//                       <td className="p-4">{item.price.toFixed(2)}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Checkout Summary */}
//           <div className="lg:w-[40%] bg-gray-100 p-6 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-6">Order Summary</h2>
//             <table className="table-auto w-full mb-6">
//               <tbody className="text-lg text-gray-700">
//                 <tr className="border-b">
//                   <td className="p-4">Total</td>
//                   <td className="p-4 text-right">{totalPrice.toFixed(2)} Rs</td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="p-4">Discount</td>
//                   <td className="p-4 text-right">
//                     <input
//                       type="number"
//                       className="text-right text-gray-600 font-sm p-2 border border-gray-300 rounded-lg w-[100%] sm:w-[150px]"
//                       onChange={handleDiscount}
//                       required
//                     />
//                   </td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="p-4">Sub Total</td>
//                   <td className="p-4 text-right">{(totalPrice - discount).toFixed(2)} Rs</td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="p-4">Payment Method</td>
//                   <td className="p-4 text-right">
//                     <span
//                       className={`mr-4 cursor-pointer ${paymentMethod === "cash" ? "font-bold text-green-600" : "text-gray-600"}`}
//                       onClick={handleCashPayment}
//                     >
//                       Cash
//                     </span>
//                     <span
//                       className={`cursor-pointer ${paymentMethod === "debit" ? "font-bold text-green-600" : "text-gray-600"}`}
//                       onClick={handleDebitPayment}
//                     >
//                       Debit
//                     </span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Debit Card Form */}
//             {paymentMethod === "debit" && (
//               <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-6">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4">Debit Card Payment</h2>
//                 <form className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Cardholder's Name</label>
//                     <input
//                       type="text"
//                       className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                       placeholder="John Doe"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Card Number</label>
//                     <input
//                       type="text"
//                       className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                       placeholder="1234 5678 9012 3456"
//                       required
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
//                       <input
//                         type="text"
//                         className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                         placeholder="MM/YY"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">CVV</label>
//                       <input
//                         type="text"
//                         className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                         placeholder="123"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {/* Place Order Button */}
//             <div className="mt-6">
//               <button
//                 onClick={handlePlaceOrder}
//                 className="w-full bg-green-600 text-white py-3 px-4 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
//               >
//                 Place Order
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderCheckout;




