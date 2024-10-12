// import { useEffect, useState } from "react";
// import OrderType from "../../types/OrderType";
// import axios from "axios";

// function OrderInvoice(){
//     const[orderedItem,setOrderedItem]=useState<OrderType[]>([]);
//     const[cart,setCart]=useState<any[]>([]);
//     const[orderId,setOrderId]= useState<number>(0)
//     const[grandTotalPrice,setGrandTotalPrice] = useState<number>(0);
//     const[subTotalPrice,setSubTotalPrice] = useState<number>(0);
//     const[discount,setDiscount] = useState<number>(0);
//     const[paymentMethod,setPaymentMethod]=useState<string>("");

//     async function loadOrderByID() {
//         const apiResponce = await axios.get("http://localhost:8081/orders/" + orderId);
//         console.log(apiResponce.data)
//         setGrandTotalPrice(apiResponce.data.totalPrice);
//         setDiscount(apiResponce.data.discount);
//         setPaymentMethod(apiResponce.data.paymentMethod);


//         //console.log(totalPrice)
//         console.log(orderedItem)
//       }

//       function calculateSubTotal(){
//       let total=0;
//       {cart.map(function(item){
//         total=total+ item.price
//       })}
//       setSubTotalPrice(total);
//     }
    
//       useEffect(function () {
//         const cartdata = localStorage.getItem("cart") || "";
//         const orderId = localStorage.getItem("orderId") || "";
//         if (cartdata) {
//           setCart(JSON.parse(cartdata));
//           calculateSubTotal();
//         }
//         if(orderId){
//             setOrderId(JSON.parse(orderId));
//             loadOrderByID();
//         }
//       }, []);


//     return(
//         <div className="max-w-[600px] mx-auto p-8 shadow-xl rounded-lg bg-slate-300">
//                 <div className="text-center">
//                 <h1 className="text-2xl font-semibold mb-5">Payment Sucessful</h1>
//                 <table>
//                   <thead>
//                         <tr className="bg-slate-200 text-sm text-slate-600">
//                             <th className="p-2 w-[70px] text-left">#</th>
//                             <th className="p-2 w-[200px] text-left">Item</th>
//                             <th className="p-2 w-[200px] text-left">Description</th>
//                             <th className="p-2 w-[50px] text-left">Price(Rs)</th>
//                         </tr>
//                   </thead>
//                   <tbody>
//                       {cart.map(function(item){
//                         return(
//                           <tr>
//                               <td>{item.itemCode}</td>
//                               <td>{item.itemName}</td>
//                               <td>{item.description}</td>
//                               <td>{item.price}</td>
//                           </tr>
                           
//                         )
//                     })}
//                   </tbody>
//                 </table>
//                 <div className="text-right mt-10">
//                   <div className="inline-block text-left space-y-2">
//                     <div className="flex justify-between">
//                       <h1 className="mr-5">Sub Total:</h1>
//                       <h1>{subTotalPrice}</h1>
//                     </div>
//                     <div className="flex justify-between">
//                       <h1>Discount:</h1>
//                       <h1>{discount}</h1>
//                     </div>
//                     <div className="flex justify-between">
//                       <h1>Payment Method:</h1>
//                       <h1 >{paymentMethod}</h1>
//                       </div>
//                   </div>
//                 </div>
                
//                 {/* <h1>Total {subTotalPrice}</h1> */}
                
//                 </div>
//         </div>
//     )
// }
// export default OrderInvoice;


import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderInvoice(){
    const [orderedItem, setOrderedItem] = useState<OrderType[]>([]);
    const [cart, setCart] = useState<any[]>([]);
    const [orderId, setOrderId] = useState<number>(0);
    const [grandTotalPrice, setGrandTotalPrice] = useState<number>(0);
    const [subTotalPrice, setSubTotalPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    async function loadOrderByID(orderId: number) {
        try {
            const apiResponse = await axios.get("http://localhost:8081/orders/" + orderId);
            console.log(apiResponse.data);
            setGrandTotalPrice(apiResponse.data.totalPrice);
            setDiscount(apiResponse.data.discount);
            setPaymentMethod(apiResponse.data.paymentMethod);
        } catch (error) {
            console.error(error);
        }
    }

    function calculateSubTotal(cart: any[]) {
        let total = 0;
        cart.forEach(item => {
            total += item.price;
        });
        setSubTotalPrice(total);
    }
    const navigate = useNavigate();

    function handleContinueShopping(){
      localStorage.removeItem("cart");
      localStorage.removeItem("orderId");

      navigate("/")
    }

    useEffect(function(){
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
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-8 shadow-xl rounded-lg bg-white">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-5 text-green-600">Payment Successful</h1>
                <p className="text-lg text-gray-500">Thank you for your purchase!</p>
            </div>
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-200 text-sm text-slate-600">
                            <th className="p-3 w-[70px] text-left">#</th>
                            <th className="p-3 w-[200px] text-left">Item</th>
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
            <div className="bg-gray-100 p-5 rounded-lg shadow-md mt-16">
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Sub Total:</span>
                  <span className="font-semibold text-gray-900">Rs {subTotalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Discount:</span>
                  <span className="font-semibold text-gray-900">Rs {discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Payment Method:</span>
                  <span className="font-semibold text-gray-900">{paymentMethod}</span>
                </div>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="flex justify-between py-2 text-xl">
                  <span className="font-bold text-gray-800">Grand Total:</span>
                  <span className="font-bold text-green-600">Rs {grandTotalPrice.toFixed(2)}</span>
                </div>
            </div>
            <div className="mt-10 text-center">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleContinueShopping}>
                  Continue Shopping
                </button>
              </div>
        </div>
    );
}

export default OrderInvoice;

// import { useEffect, useState } from "react";
// import OrderType from "../../types/OrderType";
// import axios from "axios";

// function OrderInvoice() {
//   const [orderedItem, setOrderedItem] = useState<OrderType[]>([]);
//   const [cart, setCart] = useState<any[]>([]);
//   const [orderId, setOrderId] = useState<number>(0);
//   const [grandTotalPrice, setGrandTotalPrice] = useState<number>(0);
//   const [subTotalPrice, setSubTotalPrice] = useState<number>(0);
//   const [discount, setDiscount] = useState<number>(0);
//   const [paymentMethod, setPaymentMethod] = useState<string>("");

//   async function loadOrderByID(orderId: number) {
//     try {
//       const apiResponse = await axios.get("http://localhost:8081/orders/" + orderId);
//       console.log(apiResponse.data);
//       setGrandTotalPrice(apiResponse.data.totalPrice);
//       setDiscount(apiResponse.data.discount);
//       setPaymentMethod(apiResponse.data.paymentMethod);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   function calculateSubTotal(cart: any[]) {
//     let total = 0;
//     cart.forEach(item => {
//       total += item.price;
//     });
//     setSubTotalPrice(total);
//   }

//   useEffect(function () {
//     const cartData = localStorage.getItem("cart") || "";
//     const storedOrderId = localStorage.getItem("orderId") || "";

//     if (cartData) {
//       const parsedCart = JSON.parse(cartData);
//       setCart(parsedCart);
//       calculateSubTotal(parsedCart);
//     }

//     if (storedOrderId) {
//       const parsedOrderId = JSON.parse(storedOrderId);
//       setOrderId(parsedOrderId);
//       loadOrderByID(parsedOrderId);
//     }
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto p-8 shadow-2xl rounded-lg bg-white">
//       <div className="text-center mb-10">
//         <h1 className="text-3xl font-bold mb-5 text-green-600">Payment Successful</h1>
//         <p className="text-lg text-gray-500">Thank you for your purchase!</p>
//       </div>

//       <table className="w-full text-left border-collapse mb-10">
//         <thead className="bg-gray-200 text-gray-700">
//           <tr>
//             <th className="p-3 text-left">#</th>
//             <th className="p-3 text-left">Item</th>
//             <th className="p-3 text-left">Description</th>
//             <th className="p-3 text-left">Price (Rs)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart.map((item, index) => (
//             <tr key={index} className="border-b">
//               <td className="p-3">{item.itemCode}</td>
//               <td className="p-3">{item.itemName}</td>
//               <td className="p-3">{item.description}</td>
//               <td className="p-3">{item.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="bg-gray-100 p-5 rounded-lg shadow-md">
//         <div className="flex justify-between py-2">
//           <span className="font-medium text-gray-700">Sub Total:</span>
//           <span className="font-semibold text-gray-900">{subTotalPrice.toFixed(2)} Rs</span>
//         </div>
//         <div className="flex justify-between py-2">
//           <span className="font-medium text-gray-700">Discount:</span>
//           <span className="font-semibold text-gray-900">{discount.toFixed(2)} Rs</span>
//         </div>
//         <div className="flex justify-between py-2">
//           <span className="font-medium text-gray-700">Payment Method:</span>
//           <span className="font-semibold text-gray-900">{paymentMethod}</span>
//         </div>
//         <div className="border-t border-gray-300 my-4"></div>
//         <div className="flex justify-between py-2 text-xl">
//           <span className="font-bold text-gray-800">Grand Total:</span>
//           <span className="font-bold text-green-600">{grandTotalPrice.toFixed(2)} Rs</span>
//         </div>
//       </div>

      // <div className="mt-10 text-center">
      //   <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      //     Continue Shopping
      //   </button>
      // </div>
//     </div>
//   );
// }

// export default OrderInvoice;

