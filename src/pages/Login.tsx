import backgroundImage from "/images/bg.jpg";

function Login(){

    return(

        <div className="content-center items-center min-h-screen py-10 px-5 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="max-w-[600px] mx-auto p-8 shadow-xl rounded-lg bg-white bg-opacity-80 backdrop-blur-lg">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                  <p className="text-sm text-gray-500">Please enter your credentials to log in</p>

                </div>
                <form action="">
                    <div className="mb-3">
                        <label htmlFor="" className="mb-1 text-sm text-gray-700 block">Username</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400" placeholder="Enter your username"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="" className="mb-1 text-sm text-gray-700 block">Password</label>
                        <input type="password" className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400" placeholder="Enter your password"/>
                    </div>

                    {/* {error && <div className="text-sm text-red-500">{error}</div>} */}

                    <div className="mt-6">
                        <button type ="button" className="w-full rounded-lg px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 shadow-md" >Login</button>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a></p>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login;

// import backgroundImage from "/images/bg.jpg";

// function Login() {
//     return (
//         <div
//             className="flex justify-center items-center min-h-screen py-10 px-5 bg-cover bg-center"
//             style={{ backgroundImage: `url(${backgroundImage})` }}
//         >
//             <div className="max-w-[400px] w-full mx-auto p-8 shadow-2xl rounded-lg bg-white bg-opacity-80 backdrop-blur-lg">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
//                     <p className="text-sm text-gray-500">Please enter your credentials to log in</p>
//                 </div>
//                 <form>
//                     <div className="mb-6">
//                         <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
//                             placeholder="Enter your username"
//                         />
//                     </div>

//                     <div className="mb-6">
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
//                             placeholder="Enter your password"
//                         />
//                     </div>

//                     {/* Error message can be added here */}
//                     {/* {error && <div className="text-sm text-red-500">{error}</div>} */}

//                     <div className="mt-6">
//                         <button
//                             type="button"
//                             className="w-full rounded-lg px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
//                         >
//                             Log In
//                         </button>
//                     </div>
//                     <div className="mt-4 text-center">
//                         <p className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a></p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;
