import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart(){
    const[cart,setCart]=useState<any[]>([]);
    const[totalPrice,setTotalPrice]=useState<number>(0);
    const navigate=useNavigate();

    function handleDelete(itemCode:string){
        const index = cart.findIndex(item => item.itemCode === itemCode);
        console.log(index)
        if (index !== -1) {
            const newCart = [...cart]; 
            console.log(newCart)
            newCart.splice(index, 1); 
            setCart(newCart);
            localStorage.setItem("cart",JSON.stringify(newCart)); 
        }

    }

    useEffect(function(){
        const cartdata= localStorage.getItem("cart") || "";
        let total=0;
        if(cartdata){
            setCart(JSON.parse(cartdata));
            {cart.map(function(item){
                total=total+ item.price
            })}
            setTotalPrice(total);
        }
    })

    return(
        <div>
        <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-md z-50">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Item Cart</h1>
        </div>
        </div>
        <div className="flex flex-col lg:flex-row p-5 space-y-4 lg:space-y-0 lg:space-x-6 mt-20">
            <div className="w-full lg:w-[60%] p-4">
                {cart.map(function(item){
                    return(
                        <div className="p-5 mb-6 border border-slate-200 rounded-lg hover:scale-105 bg-gradient-to-r from-cyan-500 to-blue-600 relative" >
                                <div className="text-2xl font-bold text-white mb-2">{item.itemName}</div>
                                <div className="text-sm text-gray-100 mb-3">{item.description}</div>
                                <div className="text-sm text-right text-white font-semibold">Rs.{item.price}</div>
                                <button className="absolute top-3 right-3 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg" onClick={()=> handleDelete(item.itemCode)}>Remove</button>
                        </div>
                    )
                })}
            </div>
                <div className="w-full lg:w-[40%] p-6 border border-slate-200 rounded-lg bg-white shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
                    <div className="flex justify-between text-lg font-semibold text-gray-700 mb-2">
                        <span>Total Items:</span> <span>{cart.length}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-gray-700 mb-2">
                        <span>Total Price:</span> <span>{totalPrice}</span>
                    </div>
                    <button className="w-full px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg " onClick={()=> navigate("/orders/checkout")}>Go to Checkout</button>
                </div>
        </div>
        </div>
    )
}

export default Cart;

// import { useEffect, useState } from "react";

// function Cart() {
//     const [cart, setCart] = useState<any[]>([]);
//     const [totalPrice, setTotalPrice] = useState<number>(0);

//     useEffect(function() {
//         const cartData = localStorage.getItem("cart") || "[]";
//         if (cartData) {
//             const parsedCart = JSON.parse(cartData);
//             setCart(parsedCart);
//             calculateTotal(parsedCart);
//         }
//     }, []);

//     function calculateTotal(cartItems: any[]) {
//         const total = cartItems.reduce((acc, item) => acc + item.price, 0);
//         setTotalPrice(total);
//     }

//     function removeItem(index: number) {
//         const updatedCart = [...cart];
//         updatedCart.splice(index, 1);
//         setCart(updatedCart);
//         localStorage.setItem("cart", JSON.stringify(updatedCart));
//         calculateTotal(updatedCart);
//     }

//     return (
//         <div className="flex flex-col lg:flex-row p-5 space-y-4 lg:space-y-0 lg:space-x-6 mt-20">
//             {/* Cart Items Section */}
//             <div className="w-full lg:w-[60%] p-4">
//                 {cart.length === 0 ? (
//                     <div className="text-center text-xl text-gray-600">Your cart is empty.</div>
//                 ) : (
//                     cart.map((item, index) => (
//                         <div
//                             key={index}
//                             className="p-5 mb-6 border border-slate-200 rounded-lg transition-transform transform hover:scale-105 shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 relative"
//                         >
//                             <div className="text-2xl font-bold text-white mb-2">{item.itemName}</div>
//                             <div className="text-sm text-gray-100 mb-3">{item.description}</div>
//                             <div className="text-sm font-semibold text-right text-white">
//                                 Rs. {item.price}
//                             </div>
//                             <button
//                                 onClick={() => removeItem(index)}
//                                 className="absolute top-3 right-3 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-full"
//                             >
//                                 Remove
//                             </button>
//                         </div>
//                     ))
//                 )}
//             </div>

//             {/* Summary Section */}
//             {cart.length > 0 && (
//                 <div className="w-full lg:w-[40%] p-6 border border-slate-200 rounded-lg bg-white shadow-xl">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
//                     <div className="flex justify-between text-lg font-semibold text-gray-700 mb-2">
//                         <span>Total Items:</span> <span>{cart.length}</span>
//                     </div>
//                     <div className="flex justify-between text-lg font-semibold text-gray-700 mb-6">
//                         <span>Total Price:</span> <span>Rs. {totalPrice}</span>
//                     </div>
//                     <button className="w-full px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-colors">
//                         Proceed to Checkout
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Cart;
