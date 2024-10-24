import { useEffect, useState } from "react";
import ItemType from "../types/ItemType";
import CategoryType from "../types/CategoryType";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Item(){

    const{isAuthenticated,jwtToken} = useAuth();
    const[items,setItems]= useState<ItemType[]>([]);
    const[itemName,setItemName]= useState<string>("");
    const[price,setPrice] = useState<number>(0);
    const[description,setDescription] = useState<string>("");
    const[categoryId,setCategoryId] = useState<number>(0);

    const[categories,setcategories]= useState<CategoryType[]>([]);
    const[isEdit,setIsEdit] = useState<boolean>(false);
    const[updatedItemCode,setUpdatedItemCode] = useState<number>(0);
    const[isAboutDropDownOpen, setIsAboutDropDownOpen]= useState<boolean>(false);
    const[isContactDropDownOpen, setIsContactDropDownOpen]= useState<boolean>(false);
    const navigate =useNavigate();

    const config ={
        headers:{
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadItems() {
        const apiResponce = await axios.get("http://localhost:8081/items" , config);
        setItems(apiResponce.data);
    }

    async function loadCategories() {
        const apiResponce = await axios.get("http://localhost:8081/categories" , config);
        setcategories(apiResponce.data);
    }

    async function handleEdit(item : ItemType) {

        try {
            setItemName(item.itemName);
            setPrice(item.price);
            setDescription(item.description);
            setCategoryId(item.category.categoryID);
            setIsEdit(true);
            setUpdatedItemCode(item.itemCode);
        } catch (error) {
            console.log(error);
        }
     
     
    }

    function handleItemName(event:any) {
        setItemName(event.target.value);
    }

    function handleItemPrice(event:any){
        setPrice(event.target.value);
    }

    function handleDescription(event:any){
        setDescription(event.target.value);
    }

    function handleCategoryId(event:any){
        setCategoryId(event.target.value)
    }

    async function handleSubmit(){
   
        const data = {
            itemName:itemName,
            price:price,
            description:description,
            categoryId:categoryId
        }

        console.log(data);

        try {

            if(isEdit){
                await axios.put("http://localhost:8081/items/" + updatedItemCode , data,config)

            }else{
                await axios.post("http://localhost:8081/items", data,config);
            }

            setItemName("");
            setPrice(0);
            setDescription("");
            setCategoryId(0);
            loadItems();
            setIsEdit(false);
            setUpdatedItemCode(0);

        } catch (error) {
            console.log(error);
        }

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
            loadItems();
            loadCategories();
        }
    },[isAuthenticated]);

    return(
        <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8 bg-gray-50">
            <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-lg z-50">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold tracking-wide hover:scale-105">Item</h1>
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
                <div className=" bg-white rounded-lg shadow-lg p-6 mb-10 bg-opacity-90  backdrop-blur-sm">
            
                    <h2 className="text-2xl font-bold mb-6">
                        {isEdit ? "Edit Item" : "Add Item"}
                    </h2>
                    <form>              
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            <div>
                                <label className="text-gray-700 text-sm block mb-2">Item Name</label>
                                <input type="text" id="productName" className="text-slate-600 font-sm block mb-3 w-full px-3 py-2 border border-slate-300 rounded-lg" value={itemName} onChange={handleItemName} required />
                            </div>

                            <div>
                                <label className="text-gray-700 text-sm block mb-2">Price</label>
                                <input type="text" id="productPrice" className="text-slate-600 font-sm block mb-3 w-full px-3 py-2 border border-slate-300 rounded-lg" value={price} onChange={handleItemPrice} required />
                            </div>

                            <div>
                                <label className="text-gray-700 text-sm block mb-2">Description</label>
                                <textarea  id="descroption" className="text-slate-600 font-sm block mb-3 w-full py-2 px-3 border border-slate-300 rounded-lg" value={description} onChange={handleDescription} required />
                            </div>

                            <div>
                                <label className="text-gray-700 text-sm block mb-2">Category</label>
                                <select value={categoryId} className="text-slate-600 font-sm block mb-3 w-full px-3 py-2 border border-slate-300 rounded-lg" onChange={handleCategoryId} required>
                                    <option value="">Please select category</option>
                                    {categories.map(function(category) {
                                        return (
                                            <option value={category.categoryID}>{category.categoryName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <button type="button" className="w-full lg:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 shadow-lg " onClick={handleSubmit}>
                            {isEdit? "Edit Item" : "Create Item"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="relative overflow-x-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Items List</h2>
                <table className="table-auto min-w-full bg-gray-100 rounded-lg">
                    <thead className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                        <tr>
                            <th className="p-3 w-[50px] text-left">#</th>
                            <th className="p-3 w-[200px] text-left">Item Name</th>
                            <th className="p-3 w-[200px] text-left">Description</th>
                            <th className="p-3 text-left w-[100px]">Price(Rs)</th>
                            <th className="p-3 text-left w-[20px]">Category</th>
                            <th className="p-3 text-left w-[20px]">Action</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {items.map(function(item){
                            return(
                                <tr className="hover:bg-gray-50">
                                    <td className="p-3 text-slate-600 border-b border-slate-200">{item.itemCode}</td>
                                    <td className="p-3 text-slate-600 border-b border-slate-200">{item.itemName}</td>
                                    <td className="p-3 text-slate-600 border-b border-slate-200">{item.description}</td>
                                    <td className="p-3 text-slate-600 border-b border-slate-200">{item.price.toFixed(2)}</td>
                                    <td className="p-3 text-slate-600 border-b border-slate-200">{item.category?.categoryName}</td>
                                    <td className="border-b border-slate-200">
                                        <button onClick={() => handleEdit(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
         
         
    )
}

export default Item;