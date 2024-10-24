import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import backgroundImage from "/images/bgHome.webp";

function Home(){
    const navigate = useNavigate();
    const{logout}= useAuth()

    return(
            <div className="min-h-screen py-8 px-4 lg:px-8 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 sm:px-8 shadow-md z-50">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <h1 className="text-3xl font-semibold text-left justify-between hover:scale-105">Smart POS</h1>
                        </div>
                       <button className="relative text-blue-600 bg-white hover:bg-red-500 hover:text-white font-medium rounded-xl text-xs sm:text-sm sm:px-6 sm:py-2.5 px-4 py-2" onClick={logout}>Log Out</button>
                    </div>                  
                </div>

                <div className="flex flex-col mt-28 m-5">
                    <h2 className="text-4xl font-semibold text-gray-700 mb-14 text-left">Welcome to Smart POS system</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full cursor-pointer">
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 bg-opacity-90  backdrop-blur-sm" onClick={()=> navigate("/item")}>
                            <h3 className="text-xl font-semibold text-gray-700 ">Item</h3>
                            <p className="mt-2 text-gray-500">Manage items in the system</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 cursor-pointer bg-opacity-90  backdrop-blur-sm" onClick={()=> navigate("/category")}>
                            <h3 className="text-xl font-semibold text-gray-700">Category</h3>
                            <p className="mt-3 text-gray-500">Manage categories in the system</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 cursor-pointer bg-opacity-90  backdrop-blur-sm " onClick={()=> navigate("/stock")}>
                            <h3 className="text-xl font-semibold text-gray-700">Stock</h3>
                            <p className="mt-3 text-gray-500">Manage stocks in the system</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 cursor-pointer bg-opacity-90  backdrop-blur-sm" onClick={()=> navigate("/orders/create")}>
                            <h3 className="text-xl font-semibold text-gray-700">Create New Order</h3>
                            <p className="mt-3 text-gray-500">Create a new order for customers</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 cursor-pointer bg-opacity-90  backdrop-blur-sm" onClick={()=> navigate("/orders")}>
                            <h3 className="text-xl font-semibold text-gray-700">Orders</h3>
                            <p className="mt-3 text-gray-500">View orders of customers</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 cursor-pointer bg-opacity-90  backdrop-blur-sm" onClick={()=> navigate("/orders/cart")}>
                            <h3 className="text-xl font-semibold text-gray-700">Cart</h3>
                            <p className="mt-3 text-gray-500">View items in the cart</p>
                        </div>
                    </div>
                </div>

                <div className="mt-24 px-5 py-10 bg-white shadow-lg rounded-lg bg-opacity-90  backdrop-blur-sm">
                    <p className="text-lg text-gray-600 mb-6 text-center">
                        Our Point of Sale (POS) system offers a comprehensive solution to manage sales, inventory, and customer orders. With this system, you can easily add and manage items, organize them into categories, track stock levels, and create orders seamlessly.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8">
                        <div className="p-6 bg-blue-50 rounded-lg shadow-lg hover:scale-105 cursor-pointer flex items-center space-x-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            <div className="text-lg text-gray-600">
                                <p className="font-medium text-gray-800">Call Us</p>
                                <p>0382234231</p>
                            </div>
                        </div>

                        <div className="p-6 bg-green-50 rounded-lg shadow-lg hover:scale-105 cursor-pointer flex items-center space-x-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <div className="text-lg text-gray-600">
                                <p className="font-medium text-gray-800">Email Us</p>
                                <p>info@possystem.com</p>
                            </div>
                        </div>

                        <div className="p-6 bg-yellow-50 rounded-lg shadow-lg hover:scale-105 cursor-pointer flex items-center space-x-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-yellow-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <div className="text-lg text-gray-600">
                                <p className="font-medium text-gray-800">Visit Us</p>
                                <p>123 Main Street, City</p>
                            </div>
                        </div>
                        <p className="text-lg text-gray-600">Created by: Thaveesha Karunarathna</p>
                    </div>
                </div>
            </div>

    )
}

export default Home;