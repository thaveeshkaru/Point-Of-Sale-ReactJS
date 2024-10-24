import { useEffect, useState } from "react";
import StockType from "../types/StockType";
import axios from "axios";
import ItemType from "../types/ItemType";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Stock(){

    const[Stocks,setStocks]= useState<StockType[]>([]);
    const[quantityOnHand,setQuantityOnHand] = useState<number>(0);
    const[location,setLocation]= useState<string>("");
    const[itemCode,setItemCode] = useState<number>(0);

    const[Items,setItems] = useState<ItemType[]>([]);
    const[isEdit,setIsEdit] = useState<boolean>(false);
    const[updatedStockId,setUpdatedStockId] = useState<number>(0);
    const{isAuthenticated,jwtToken} = useAuth();
    const[isAboutDropDownOpen, setIsAboutDropDownOpen]= useState<boolean>(false);
    const[isContactDropDownOpen, setIsContactDropDownOpen]= useState<boolean>(false);
    const navigate = useNavigate();


    const config ={
        headers:{
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadStock() {
        const apiResponce= await axios.get("http://localhost:8081/stocks", config);
        setStocks(apiResponce.data);
        handleStockStatus(Stocks)
    }

    async function loadItems() {
        const apiResponce = await axios.get("http://localhost:8081/items",config);
        setItems(apiResponce.data);
    }

    function handleEdit(stock: StockType){
        try {
            setItemCode(stock.item.itemCode);
            setQuantityOnHand(stock.quantityOnHand);
            setLocation(stock.location);
            setIsEdit(true);
            setUpdatedStockId(stock.stockId);
        } catch (error) {
            console.log(error)
        }
    }

    function handleItemCode(event: any){
        setItemCode(event.target.value);
    }

    function handleQuantityOnHand(event: any){
        setQuantityOnHand(event.target.value)
    }

    function handleLocation(event: any){
        setLocation(event.target.value);
    }

    useEffect(function(){
        if(isAuthenticated){
            loadStock();
            loadItems();
        }
    },[isAuthenticated]);

    function handleStockStatus(quantityOnHand: any) {

        if (quantityOnHand === 0) {
            return { status: 'Out of Stock', className: 'text-red-600' };
          } else if (quantityOnHand < 50) {
            return { status: 'Low Stock', className: 'text-red-600' };
          } else {
            return { status: 'Well Stocked', className: 'text-green-600' };
          }
    }

    async function handleSubmit(){
        const data ={
            itemCode: itemCode,
            quantityOnHand: quantityOnHand,
            location: location
        }

        if(isEdit){
            await axios.put("http://localhost:8081/stocks/"+ updatedStockId, data, config);
        }else{
            await axios.post("http://localhost:8081/stocks", data, config);
        }
        handleStockStatus(quantityOnHand);
        loadStock();
        setItemCode(0);
        setQuantityOnHand(0);
        setLocation("");
        setUpdatedStockId(0);
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

    return(
        <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8" >
       ``   <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-lg z-50">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold tracking-wide hover:scale-105">Stock</h1>
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
                <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
                    
                    <h1 className="text-slate-800 text-2xl font-bold mb-6">
                    {isEdit ? "Edit Stock" : "Add Stock " }
                    </h1>
                        
                    <form>
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            <div>
                                <label className="text-gray-700 text-sm block mb-2">Item</label>
                                <select value={itemCode} className="text-slate-600 block mb-3 w-full px-3 py-2 border border-slate-300 rounded-lg" onChange={handleItemCode} required>
                                    <option value="">Please select item</option>
                                    {Items.map(function(item) {
                                        return (
                                            <option value={item.itemCode}>{item.itemName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm block mb-2">Quantity On Hand</label>
                                <input type="text" id="productName" className="text-slate-600 font-sm block mb-3 w-full px-3 py-2 border border-slate-300 rounded-lg" value={quantityOnHand} onChange={handleQuantityOnHand} required />
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm font-medium block mb-2">Location</label>
                                <input type="text" id="productName" className="text-slate-600 font-sm block mb-3 w-full px-3 py-2 border border-slate-300 rounded-lg" value={location} onChange={handleLocation} required />
                            </div>
                        </div>

                        <button type="button" className="w-full lg:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 shadow-lg" onClick={handleSubmit}>
                            {isEdit ? "Edit Stock" : "Add Stock "}
                        </button>
                    </form>
                </div>

                <div className="relative overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Stock List</h2>
                    <table className="table-auto min-w-full bg-gray-100 shadow rounded-lg">
                        <thead className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                            <tr>
                            <th className="p-3 w-[50px] text-left">#</th>
                            <th className="p-3 w-[100px] text-left">Item Code</th>
                            <th className="p-3 w-[100px] text-left">Quantity On Hand</th>
                            <th className="p-3 text-left w-[150px]">Location</th>
                            <th className="p-3 text-left w-[100px]">Stock Status</th>
                            <th className="p-3 text-left w-[20px]">Action</th>
                            </tr> 
                        </thead>

                        <tbody>
                            {Stocks.map(function(stock){
                                const stockStatus = handleStockStatus(stock.quantityOnHand);
                                    return(
                                        <tr className="hover:bg-gray-50">
                                            <td className="p-3 text-slate-600 border-b border-slate-200">{stock.stockId}</td>
                                            <td className="p-3 text-slate-600 border-b border-slate-200">{stock.item.itemCode}</td>
                                            <td className="p-3 text-slate-600 border-b border-slate-200">{stock.quantityOnHand}</td>
                                            <td className="p-3 text-slate-600 border-b border-slate-200">{stock.location}</td>                            
                                            <td className={`p-3 border-b border-slate-200 ${stockStatus.className}`}>{stockStatus.status} </td>
                                            <td className="border-b border-slate-200">
                                                <button onClick={() => handleEdit(stock)}>
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
         </div>
    )
}

export default Stock;
