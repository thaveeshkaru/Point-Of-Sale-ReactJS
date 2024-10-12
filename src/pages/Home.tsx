import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();

    return(
            <div>
                <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-md z-50">
                    <div className="flex justify-between items-center space-x-3">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <h1 className="text-2xl font-semibold text-left justify-between">POS Home</h1>
                        </div>
                       <button className="relative text-black bg-white hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md dark:hover:bg-red-600 dark:focus:ring-red-800" onClick={()=> navigate("/login")}>Log Out</button>
                    </div>                  
                </div>
                <div className="flex flex-col items-center mt-24 m-5">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-14">Welcome to the POS system</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full cursor-pointer">
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105" onClick={()=> navigate("/item")}>
                            <h3 className="text-xl font-semibold text-gray-700">Item</h3>
                            <p className="mt-2 text-gray-500">Manage items in the system</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 cursor-pointer" onClick={()=> navigate("/category")}>
                            <h3 className="text-xl font-semibold text-gray-700">Category</h3>
                            <p className="mt-3 text-gray-500">Manage categories in the system</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 cursor-pointer" onClick={()=> navigate("/stock")}>
                            <h3 className="text-xl font-semibold text-gray-700">Stock</h3>
                            <p className="mt-3 text-gray-500">Manage stocks in the system</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 cursor-pointer" onClick={()=> navigate("/orders/create")}>
                            <h3 className="text-xl font-semibold text-gray-700">Create New Order</h3>
                            <p className="mt-3 text-gray-500">Create a new order for customers</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 cursor-pointer" onClick={()=> navigate("/orders")}>
                            <h3 className="text-xl font-semibold text-gray-700">Orders</h3>
                            <p className="mt-3 text-gray-500">View orders of cusomers</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 cursor-pointer" onClick={()=> navigate("/orders/cart")}>
                            <h3 className="text-xl font-semibold text-gray-700">Cart</h3>
                            <p className="mt-3 text-gray-500">View items in the cart</p>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default Home;


// import { useNavigate } from "react-router-dom";

// function Home(){

//           const navigate = useNavigate();
        
//           return (
//             <div className="min-h-screen bg-gray-100 p-8">
//               {/* Top Navigation Bar */}
//               <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-md z-50">
//                 <div className="flex justify-between items-center">
//                   <h1 className="text-2xl font-semibold">POS Dashboard</h1>
//                   <button
//                     className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100"
//                     onClick={() => navigate("/login")}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
        
//               {/* Main Content */}
//               <div className="flex flex-col items-center mt-24 space-y-8">
//                 <h2 className="text-3xl font-semibold text-gray-700">Welcome to the POS System</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  
//                   {/* Create New Order */}
//                   <div
//                     className="p-6 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition"
//                     onClick={() => navigate("/orders/create")}
//                   >
//                     <h3 className="text-xl font-semibold text-gray-700">Create New Order</h3>
//                     <p className="mt-2 text-gray-500">Start a new order for customers</p>
//                   </div>
        
//                   {/* Manage Items */}
//                   <div
//                     className="p-6 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition"
//                     onClick={() => navigate("/items")}
//                   >
//                     <h3 className="text-xl font-semibold text-gray-700">Manage Items</h3>
//                     <p className="mt-2 text-gray-500">Add, edit, or delete items in the system</p>
//                   </div>
        
//                   {/* Sales Reports */}
//                   <div
//                     className="p-6 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition"
//                     onClick={() => navigate("/reports")}
//                   >
//                     <h3 className="text-xl font-semibold text-gray-700">Sales Reports</h3>
//                     <p className="mt-2 text-gray-500">View sales reports and analytics</p>
//                   </div>
        
//                   {/* User Management */}
//                   <div
//                     className="p-6 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition"
//                     onClick={() => navigate("/users")}
//                   >
//                     <h3 className="text-xl font-semibold text-gray-700">User Management</h3>
//                     <p className="mt-2 text-gray-500">Manage user roles and permissions</p>
//                   </div>
        
//                   {/* Stock Management */}
//                   <div
//                     className="p-6 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition"
//                     onClick={() => navigate("/stock")}
//                   >
//                     <h3 className="text-xl font-semibold text-gray-700">Stock Management</h3>
//                     <p className="mt-2 text-gray-500">Monitor and update stock levels</p>
//                   </div>
        
//                   {/* Settings */}
//                   <div
//                     className="p-6 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition"
//                     onClick={() => navigate("/settings")}
//                   >
//                     <h3 className="text-xl font-semibold text-gray-700">Settings</h3>
//                     <p className="mt-2 text-gray-500">System and user account settings</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         }
        
// export default Home;
        