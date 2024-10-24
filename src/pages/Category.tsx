import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Category(){

    const[categories,setCategories] = useState <CategoryType[]>([]);
    const[categoryName,setCategoryName]= useState<string>("");
    const[categoryId,setCategoryId]=useState<number>(0);
    const{isAuthenticated,jwtToken} = useAuth();
    const[isEdit,setIsEdit]= useState<boolean>(false);
    const[isAboutDropDownOpen, setIsAboutDropDownOpen]= useState<boolean>(false);
    const[isContactDropDownOpen, setIsContactDropDownOpen]= useState<boolean>(false);
    const navigate = useNavigate();


    const config ={
        headers:{
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadCategories() {
        const apiResponce = await axios.get("http://localhost:8081/categories", config);
        setCategories(apiResponce.data);
    }

    function handleCategoryName(event: any){
        setCategoryName(event.target.value);
    }

    async function handleEdit(category: CategoryType) {
        try {
            setCategoryName(category.categoryName);
            setCategoryId(category.categoryID)
            setIsEdit(true);
        } catch (error) {
            console.log(error)
        }
    }

    async function addCategory() {
        const data ={
            categoryName: categoryName
        }

        if(isEdit){
            await axios.put("http://localhost:8081/categories/" + categoryId ,data,config)
        }else{
            await axios.post("http://localhost:8081/categories", data, config);
        }

        loadCategories();
        setCategoryName("")
        setCategoryId(0);
        setIsEdit(false);
    }

    function openAboutDropDown() {
        setIsAboutDropDownOpen(!isAboutDropDownOpen); 
        setIsContactDropDownOpen(false);
      };

    function openContactDropDown() {
        setIsContactDropDownOpen(!isContactDropDownOpen);
        setIsAboutDropDownOpen(false)
    };

    useEffect(function(){
        if(isAuthenticated){
            loadCategories();

        }
    },[isAuthenticated]);

    return(
        <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
            <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-lg z-50">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold tracking-wide hover:scale-105">Category</h1>
                    <div className="hidden md:flex space-x-8">
                        <a href="#" className="hover:text-gray-300" onClick={()=> navigate("/")} >Home</a>
                        <div className="relative">
                            <a href="#" className={`hover:text-gray-300 ${isAboutDropDownOpen && ("text-green-300 font-bold")}`} onClick={openAboutDropDown}>About</a>
                            {isAboutDropDownOpen && (
                                <div className="absolute top-full mt-2 w-[230px] mr-10 bg-white text-black rounded-md shadow-lg z-10">
                                    <p className="m-2 text-sm text-gray-700">Our Point of Sale (POS) system offers a comprehensive solution to manage sales, inventory, and customer orders. With this system, you can easily add and manage items, organize them into categories, track stock levels, and create orders seamlessly.
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <a href="#" className={`hover:text-gray-300 ${isContactDropDownOpen && ("text-green-300 font-bold")}`} onClick={openContactDropDown}>Contact</a>
                            {isContactDropDownOpen && (
                                 <div className="absolute top-full mt-2 w-[154px] mr-10 bg-white text-black rounded-md shadow-lg z-10">
                                     <p className="m-2 text-sm text-gray-700">Contact us: 0382234231
                                     </p>
                                     <p className="m-2 text-sm text-gray-700">Email us: info@possystem.com</p>
                                 </div>
                            )}
                        </div>
                        <a href="#" className="hover:text-gray-300" onClick={()=> navigate("/orders/cart")}>Cart</a>

                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-20">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
                <h2 className="text-2xl font-bold mb-6">Category List</h2> 
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">        
                        {categories.map(category=>(
                            <div className="p-4 border border-slate-200 rounded-lg shadow-lg text-center text-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105" onClick={()=>handleEdit(category)} >
                                {category.categoryName}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
                <h1 className="text-2xl font-bold mb-6">
                    {isEdit ? "Edit Category" : "Add Category"}    
                </h1>
                <input type="text" className="text-slate-600 font-sm block mb-3 w-full px-3 py-2 border border-slate-300 rounded-lg mb-2" value={categoryName} onChange={handleCategoryName}
                placeholder="Enter Category Name"/>
                <button className="w-full lg:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 shadow-lg" onClick={addCategory}>
                    {isEdit ? "Edit Category" : "Add Category"}
                </button>
            </div>
        </div>


    )
}

 export default Category;