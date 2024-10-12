import { useNavigate } from "react-router-dom";
import backgroundImage from "/images/bg.jpg";
import { useEffect, useState } from "react";
import UserType from "../types/UserType";
import axios from "axios";


function Register(){
    const[users,setUsers]=useState<UserType[]>([]);
    const[username,setUsername]= useState<string>("");
    const[password,setPassword]= useState<string>("");
    const[confirmPassword,setConfirmPassword]=useState<string>("");
    const[error,setError]=useState<string>("");

    async function loadUsers() {
        const apiResponce= await axios.get("http://localhost:8081/users");
        setUsers(apiResponce.data);
    }

    function handleUserName(event:any){
        setUsername(event.target.value);
        setError("");
    }

    function handlePassword(event:any){
        setPassword(event.target.value);
        setError("");
    }

    function handelConfirmPassword(event:any){
        setConfirmPassword(event.target.value);
        setError("");
    }

    async function handleRegistor() {
        try {

            if(username=="" || password==""){
                setError("Please enter a valid username and password");
                return;
            }
            console.log(username)
            console.log(password)

            if(password==confirmPassword){

                let userFound=false;
                {users.map(function(user){
                    if(user.userName==username){
                        userFound=true
                    }
                })};

                if(userFound){
                    setError("UserName already exist")
                    return;
                }else{
                    const data ={
                        userName : username,
                        password : password
                    }
                    await axios.post("http://localhost:8081/users",data);
                    navigate("/login");

                    setUsername("");
                    setPassword("");
                }
            }else{
                setError("Passwords do not match");
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(function(){
        loadUsers();
    },[])

    const navigate = useNavigate();

    return(
        <div className="content-center items-center min-h-screen py-10 px-5 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="max-w-[600px] mx-auto p-8 shadow-xl rounded-lg bg-white bg-opacity-80 backdrop-blur-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Register</h1>
              <p className="text-sm text-gray-500">Fill in your details to register</p>

            </div>
            <form action="">
                <div className="mb-5">
                    <label htmlFor="" className="mb-1 text-sm text-gray-700 block">Username</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400" placeholder="Enter your username" onChange={handleUserName}/>
                </div>

                <div className="mb-5">
                    <label htmlFor="" className="mb-1 text-sm text-gray-700 block">Password</label>
                    <input type="password" className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400" placeholder="Enter your password" onChange={handlePassword}/>
                </div>

                <div className="mb-5">
                    <label htmlFor="" className="mb-1 text-sm text-gray-700 block">Confirm Password</label>
                    <input type="password" className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400" placeholder="Confirm your password" onChange={handelConfirmPassword}/>
                </div>

                {error && <div className="text-sm text-red-500">{error}</div>}

                <div className="mt-6">
                    <button type ="button" className="w-full rounded-lg px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 shadow-md" onClick={handleRegistor}>Register</button>
                </div>

                <div className="mt-6 text-center">
                   <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log In</a></p>
                </div>

            </form>
        </div>
    </div>
    )

}

export default Register;

// import backgroundImage from "/images/bg.jpg";

// function Register() {
//     return (
//         <div
//             className="flex justify-center items-center min-h-screen py-10 px-5 bg-cover bg-center"
//             style={{ backgroundImage: `url(${backgroundImage})` }}
//         >
//             <div className="max-w-[450px] w-full mx-auto p-8 shadow-2xl rounded-lg bg-white bg-opacity-80 backdrop-blur-lg">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
//                     <p className="text-sm text-gray-500">Fill in your details to register</p>
//                 </div>
//                 <form>
//                     <div className="mb-5">
//                         <label htmlFor="username" className="mb-2 text-sm text-gray-700 block">Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-shadow"
//                             placeholder="Enter your username"
//                         />
//                     </div>

//                     <div className="mb-5">
//                         <label htmlFor="password" className="mb-2 text-sm text-gray-700 block">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-shadow"
//                             placeholder="Enter your password"
//                         />
//                     </div>

//                     <div className="mb-5">
//                         <label htmlFor="confirm-password" className="mb-2 text-sm text-gray-700 block">Confirm Password</label>
//                         <input
//                             type="password"
//                             id="confirm-password"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-shadow"
//                             placeholder="Confirm your password"
//                         />
//                     </div>

//                     {/* Error message can be added here */}
//                     {/* {error && <div className="text-sm text-red-500">{error}</div>} */}

//                     <div className="mt-6">
//                         <button
//                             type="button"
//                             className="w-full rounded-lg px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700 transition-transform transform hover:scale-105 shadow-lg"
//                         >
//                             Register
//                         </button>
//                     </div>

//                     <div className="mt-6 text-center">
//                         <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log In</a></p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Register;
