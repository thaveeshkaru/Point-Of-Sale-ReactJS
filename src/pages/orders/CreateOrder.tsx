import { useEffect, useState } from "react";
import ItemType from "../../types/ItemType";
import CategoryType from "../../types/CategoryType";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StockType from "../../types/StockType";
import { useAuth } from "../../context/AuthContext";

function CreateOrder(){
    const[Items,setItems] = useState<ItemType[]>([]);
    const[categories,setCategories] = useState<CategoryType[]>([]);
    const{isAuthenticated,jwtToken} = useAuth();

    const[categoryId,setCategoryId] = useState<number>(0);
    const[ShowAllItems,setShowAllItems] = useState<boolean>(true);
    const[orderedItems,setOrderedItems] = useState<ItemType[]>([])
    const[error,setError] = useState<string>("");
    const[stockids,setStockIds] = useState<any[]>([]);
    const[isAboutDropDownOpen, setIsAboutDropDownOpen]= useState<boolean>(false);
    const[isContactDropDownOpen, setIsContactDropDownOpen]= useState<boolean>(false);

    const config ={
        headers:{
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadItems() {
        const apiResponce = await axios.get("http://localhost:8081/items", config);
        setItems(apiResponce.data);
    }

    async function loadCategories() {
        const apiResponce = await axios.get("http://localhost:8081/categories", config);
        setCategories(apiResponce.data);
    }

    async function addItems(category:CategoryType) {
        setShowAllItems(false);
        setCategoryId(category.categoryID);
    }

    async function addItemsToCart(item: ItemType) {
        try {
            const apiResponse = await axios.get("http://localhost:8081/stocks/" + item.itemCode , config);
            const stockData: StockType[] = apiResponse.data;  

            let selectedStock: StockType | undefined;  
            let totalQuantityOnHand = 0;

            stockData.map(function(stock){
                totalQuantityOnHand += stock.quantityOnHand;
                if (stock.quantityOnHand > 0 && !selectedStock) {
                    selectedStock = stock;
                }
            });

            if (selectedStock && totalQuantityOnHand > 0) {
                const updatedStock = {
                    itemCode: selectedStock.item.itemCode,  
                    quantityOnHand: selectedStock.quantityOnHand - 1, 
                    location: selectedStock.location,
                };

                await axios.put("http://localhost:8081/stocks/" + selectedStock.stockId, updatedStock, config);

                const newArray = [...orderedItems, item];
                const newStockIdarray = [...stockids,selectedStock.stockId];
                setStockIds(newStockIdarray);
                setOrderedItems(newArray);
                setError("");  
            } else {
                setError("Out of stock");  
            }
        } catch (error) {
            setError("An error occurred while adding to the cart.");
        }
    }

    async function handleDeleteRow(itemCode:number){

       const index = orderedItems.findIndex(item => item.itemCode === itemCode);

       if (index !== -1) {
        const toUpdateStockId = stockids[index];
        const apiResponce = await axios.get("http://localhost:8081/stocks/findbyid/" + toUpdateStockId, config);
        const stockData = apiResponce.data
        const updateStockData = {
            itemCode: stockData.item.itemCode,
            quantityOnHand: stockData.quantityOnHand + 1,
            location: stockData.location,
        }

        await axios.put("http://localhost:8081/stocks/" + toUpdateStockId, updateStockData,config );
        const newOrderedItems = [...orderedItems]; 
        newOrderedItems.splice(index, 1); 
        setOrderedItems(newOrderedItems); 

        const newStockIds= [...stockids];
        newStockIds.splice(index,1);
        setStockIds(newStockIds);
    }

    }

    const navigate = useNavigate();
    async function handelSave() {
  
        try {
            const itemCodes:any =[];

            orderedItems.map(function(item){
                itemCodes.push(item.itemCode)
            });
            localStorage.setItem("cart",JSON.stringify(orderedItems));
            localStorage.setItem("stockIds", JSON.stringify(stockids));
            navigate("/orders/cart");
        } catch (error) {
            console.log(error);
        }
        
    }

    function loadItemsInCart(){
        const cartdata= localStorage.getItem("cart") || "";
        const stockIds= localStorage.getItem("stockIds") || "";
        if(cartdata && stockIds){
            setOrderedItems(JSON.parse(cartdata));
            setStockIds(JSON.parse(stockIds));
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
            loadCategories();
            loadItems();
            loadItemsInCart();
        }
   
    },[isAuthenticated]);

    return(
        <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
            <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-lg z-50">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold tracking-wide hover:scale-105">Create Order</h1>
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
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 mt-20">
        <div className="w-full lg:w-[30%] lg:border-r border-gray-300 p-4">
            <div className="text-md text-gray-800 font-semibold ">
                <button className={`w-full py-2 text-left hover:bg-blue-200 hover:scale-105 hover:shadow-lg hover:rounded-lg ${ShowAllItems ? 'bg-blue-200 rounded-lg' : ''}`} onClick={function(){
                    setShowAllItems(true)
                }}>All Items
                </button>
                {categories.map(function(category){
                    return(
                        <button className="w-full py-2 text-left hover:bg-blue-200 hover:scale-105 hover:shadow-lg  hover:rounded-lg" onClick={() => addItems(category)}>
                        {category.categoryName}
                        </button>
                    )
                })}
            </div>
        </div>
        <div className="w-full lg:w-[50%] p-4">
                {Items.map(function(item){
                  if(item.category.categoryID==categoryId && ShowAllItems==false){
                    return(
                        
                        <div className="p-5 mb-6 border border-slate-200 rounded-lg hover:scale-105 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg" onClick={()=> addItemsToCart(item)} >
                                <div className="text-lg font-bold text-white mb-2">{item.itemName}</div>
                                <div className="text-sm text-gray-100 mb-3">{item.description}</div>
                                <div className="text-sm text-right text-white font-semibold">Rs.{item.price}</div>
                        </div>
                    )
                 }if(ShowAllItems){
                    return(
                        <div className="p-5 mb-6 border border-slate-200 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 hover:shadow-lg" onClick={()=> addItemsToCart(item)}>
                                <div className="text-lg font-semibold text-white mb-2">{item.itemName}</div>
                                <div className="text-sm text-gray-100 mb-3">{item.description}</div>
                                <div className="text-sm text-right text-white font-semibold">Rs.{item.price}</div>
                        </div>
                    )
                 }      
                })}
        </div>
            <div className="w-full lg:w-[30%] p-4 bg-gray-100 rounded-lg">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="py-3 w-[50px]">#</th>
                            <th className="py-3">Item Name</th>
                            <th className="py-3">Price(Rs)</th>
                            <th className="py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedItems.map(function(item){
                            return(
                                <tr className="border-b">
                                    <td className="py-3">{item.itemCode}</td>
                                    <td className="py-3">{item.itemName}</td>
                                    <td className="py-3">{item.price.toFixed(2)}</td>
                                    <td onClick={()=>handleDeleteRow(item.itemCode)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="py-2" colSpan={2}>{error && <div className="text-sm text-red-500">{error}</div>}</td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm mt-2 font-semibold mb-2" onClick={handelSave}>Add to Cart</button>
            </div>
        </div>
    </div>
        
    )
}

export default CreateOrder;

