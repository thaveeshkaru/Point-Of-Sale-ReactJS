import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login(){

    const{login} = useAuth();
    const navigate = useNavigate();
    const[username,setUsername]=useState<string>("");
    const[password,setPassword]=useState<string>("");
    const[error,setError]=useState<string>("");

    function handleUserName(event:any){
        setUsername(event.target.value);
        setError("");
    }

    function handlePassword(event:any){
        setPassword(event.target.value);
        setError("");
    }

    async function handleSubmit(){

        if(username=="" || password== ""){
            setError("Username and password are required")
        }

        const data ={
            userName: username,
            password: password
        }

        try {
            const apiResponce = await axios.post("http://localhost:8081/auth/login", data);
            console.log(apiResponce);
            login(apiResponce.data);
            navigate("/");
        } catch (error) {
            setError("Invalid username and password");
        }
    }

    return(

        <div className="content-center items-center min-h-screen py-10 px-5 bg-cover bg-center bg-gray-100">
            <div className="max-w-[600px] mx-auto p-8 shadow-xl rounded-lg bg-white bg-opacity-80 backdrop-blur-lg">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                </div>
                <form action="">
                    <div className="mb-3">
                        <label htmlFor="" className="mb-1 text-sm text-gray-700 block">Username</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400" placeholder="Enter your username" onChange={handleUserName}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="" className="mb-1 text-sm text-gray-700 block">Password</label>
                        <input type="password" className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400" placeholder="Enter your password" onChange={handlePassword}/>
                    </div>

                     {error && <div className="text-sm text-red-500">{error}</div>}

                    <div className="mt-6">
                        <button type ="button" className="w-full rounded-lg px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 shadow-md" onClick={handleSubmit} >Login</button>
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
