import { useEffect, useState } from "react";
import ItemType from "../../types/ItemType";
import CategoryType from "../../types/CategoryType";
import axios from "axios";
import OrderType from "../../types/OrderType";
import { useNavigate } from "react-router-dom";
import StockType from "../../types/StockType";

function CreateOrder(){
    const[Items,setItems] = useState<ItemType[]>([]);
    const[categories,setCategories] = useState<CategoryType[]>([]);
    // const[Stocks,setStocks]= useState<StockType[]>([]);


    const[categoryId,setCategoryId] = useState<number>(0);
    const[ShowAllItems,setShowAllItems] = useState<boolean>(true);
    const[orderedItems,setOrderedItems] = useState<ItemType[]>([])
    // const[totalPrice,setTotalPrice] = useState<number>(0);
    // const[quantityOnHand,setQuantityOnHand]=useState<number>(0);
    const[error,setError] = useState<string>("");

    // async function loadStock() {
    //     const apiResponce= await axios.get("http://localhost:8081/stocks");
    //     setStocks(apiResponce.data);
    // }

    async function loadItems() {
        const apiResponce = await axios.get("http://localhost:8081/items");
        setItems(apiResponce.data);
    }

    async function loadCategories() {
        const apiResponce = await axios.get("http://localhost:8081/categories");
        setCategories(apiResponce.data);
    }

    async function addItems(category:CategoryType) {
        setShowAllItems(false);
        setCategoryId(category.categoryID);
    }

    async function addItemsToCart(item:ItemType) {
        
        const apiResponce = await axios.get("http://localhost:8081/stocks/" + item.itemCode);     
        const Stockdata = apiResponce.data
        let quantityOnHand=0
       Stockdata.map(function(stock: { quantityOnHand: any; }) {
            quantityOnHand += stock.quantityOnHand; 
       })  

    console.log(quantityOnHand);
    

        if(quantityOnHand>0){
            const newArray= [...orderedItems,item]
            console.log(newArray)
            setOrderedItems(newArray);
            setError("");
        }else{
            setError("Out of stock");
        }
    }

    function handleDeleteRow(itemCode:number){
        // const newOrderedItems = orderedItems.filter(item => item.itemCode !== itemCode);
        // console.log(newOrderedItems)
        // console.log(itemCode)
       // setOrderedItems(newOrderedItems);

       const index = orderedItems.findIndex(item => item.itemCode === itemCode);
       console.log(index)

       if (index !== -1) {
        const newOrderedItems = [...orderedItems]; 
        newOrderedItems.splice(index, 1); 
        setOrderedItems(newOrderedItems); 
    }

    }

    const navigate = useNavigate();
    async function handelSave() {
        try {
            const itemCodes:any =[];

            orderedItems.map(function(item){
                itemCodes.push(item.itemCode)
            });
            localStorage.setItem("cart",JSON.stringify(orderedItems))
            navigate("/orders/cart");
        } catch (error) {
            console.log(error);
        }
        
    }

    function loadItemsInCart(){
        const cartdata= localStorage.getItem("cart") || "";
        if(cartdata){
            setOrderedItems(JSON.parse(cartdata));
        }
    }

    useEffect(function(){
        loadCategories();
        loadItems();
        loadItemsInCart();
    },[]);

    // useEffect(function(){
    //     let total = 0;
    //     orderedItems.forEach(function(item) {
    //         total += item.price;
    //     });
        
    //     setTotalPrice(total);
    
    //     // if (orderedItems.length === 0) {
    //     //     setTotalPrice(0);
    //     // }
        
    // },[orderedItems]);

    return(
        <div>
        <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-md z-50">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Create New Order</h1>
        </div>
        </div>
        <div className="flex flex-col lg:flex-row p-5 space-y-4 lg:space-y-0 lg:space-x-6 mt-20">
        <div className="w-full lg:w-[20%] border-r border-gray-200 p-4">
            <div className="text-xl text-gray-800 font-semibold ">
                <button className={`w-full py-2 text-left hover:bg-blue-200 hover:scale-105 hover:shadow-lg ${ShowAllItems ? 'bg-blue-200' : ''}`} onClick={function(){
                    setShowAllItems(true)
                }}>All Items
                </button>
                {categories.map(function(category){
                    return(
                        <button className="w-full py-2 text-left hover:bg-blue-200 hover:scale-105 hover:shadow-lg" onClick={() => addItems(category)}>
                        {category.categoryName}
                        </button>
                    )
                })}
            </div>
        </div>
        <div className="w-full lg:w-[60%] p-4">
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
            <div className="w-full lg:w-[30%] p-4 bg-gray-50 rounded-lg">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="py-2 w-[60px]">#</th>
                            <th className="py-2">Item</th>
                            <th className="py-2">Price(Rs)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedItems.map(function(item){
                            return(
                                <tr className="border-b">
                                    <td className="py-2">{item.itemCode}</td>
                                    <td className="py-2">{item.itemName}</td>
                                    <td className="py-2">{item.price}</td>
                                    <td onClick={()=>handleDeleteRow(item.itemCode)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="py-2">{error && <div className="text-sm text-red-500">{error}</div>}</td>
                        </tr>
                        {/* <tr className="font-semibold text-lg">
                            <td colSpan={2} className="py-4">Total</td>
                            <td className="py-4">Rs. {totalPrice}</td>
                        </tr> */}
                    </tbody>
                </table>
                <button type="button" className="w-full py-3 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-sm mt-2 font-semibold mb-2 " onClick={handelSave}>Add to Cart</button>
            </div>
        </div>
    </div>
        
    )
}

export default CreateOrder;

// import { useEffect, useState } from "react";
// import ItemType from "../../types/ItemType";
// import CategoryType from "../../types/CategoryType";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function CreateOrder() {
//   const [Items, setItems] = useState<ItemType[]>([]);
//   const [categories, setCategories] = useState<CategoryType[]>([]);

//   const [categoryId, setCategoryId] = useState<number>(0);
//   const [ShowAllItems, setShowAllItems] = useState<boolean>(true);
//   const [orderedItems, setOrderedItems] = useState<ItemType[]>([]);
//   const [totalPrice, setTotalPrice] = useState<number>(0);

//   async function loadItems() {
//     const apiResponse = await axios.get("http://localhost:8081/items");
//     setItems(apiResponse.data);
//   }

//   async function loadCategories() {
//     const apiResponse = await axios.get("http://localhost:8081/categories");
//     setCategories(apiResponse.data);
//   }

//   function filterItemsByCategory(category: CategoryType) {
//     setShowAllItems(false);
//     setCategoryId(category.categoryID);
//   }

//   function addItemsToOrder(item: ItemType) {
//     const newArray = [...orderedItems, item];
//     setOrderedItems(newArray);
//   }

//   const navigate = useNavigate();

//   async function handleSave() {
//     try {
//       const itemCodes: any[] = orderedItems.map((item) => item.itemCode);
//       localStorage.setItem("cart", JSON.stringify(orderedItems));
//       navigate("/orders/checkout");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     loadCategories();
//     loadItems();
//   }, []);

//   useEffect(() => {
//     const total = orderedItems.reduce((acc, item) => acc + item.price, 0);
//     setTotalPrice(total);
//   }, [orderedItems]);

//   return (
//     <div className="flex flex-col lg:flex-row p-5 space-y-4 lg:space-y-0 lg:space-x-6">
//       {/* Categories & Items List */}
//       <div className="w-full lg:w-[30%] border-r border-gray-200 p-4">
//         <div className="text-xl font-semibold mb-4 text-gray-800 text-center">Categories</div>
//         <div className="space-y-3">
//           <button className={`w-full py-2 text-left hover:bg-blue-100 ${ShowAllItems ? 'bg-blue-200' : ''}`} onClick={() => setShowAllItems(true)}>
//             All Items
//           </button>
//           {categories.map((category) => (
//             <button key={category.categoryID} className="w-full py-2 text-left hover:bg-blue-100" onClick={() => filterItemsByCategory(category)}>
//               {category.categoryName}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Items Display */}
//       <div className="w-full lg:w-[40%] p-4">
//         <div className="text-xl font-semibold mb-4 text-gray-800 text-center">Items</div>
//         <div className="space-y-4">
//           {Items.filter(item => ShowAllItems || item.category.categoryID === categoryId)
//             .map((item) => (
//               <div key={item.itemCode} className="p-4 bg-white border rounded-lg hover:shadow-lg" onClick={() => addItemsToOrder(item)}>
//                 <div className="text-lg font-semibold text-gray-800">{item.itemName}</div>
//                 <div className="text-sm text-gray-500">{item.description}</div>
//                 <div className="text-right text-green-600 font-semibold">Rs. {item.price}</div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="w-full lg:w-[30%] p-4 bg-gray-50 rounded-lg">
//         <div className="text-xl font-semibold mb-4 text-gray-800 text-center">Order Summary</div>
//         <table className="table-auto w-full">
//           <thead>
//             <tr className="text-left border-b">
//               <th className="py-2">Item</th>
//               <th className="py-2">Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orderedItems.map((item) => (
//               <tr key={item.itemCode} className="border-b">
//                 <td className="py-2">{item.itemName}</td>
//                 <td className="py-2">Rs. {item.price}</td>
//               </tr>
//             ))}
//             <tr className="font-semibold text-lg">
//               <td className="py-4">Total:</td>
//               <td className="py-4">Rs. {totalPrice}</td>
//             </tr>
//           </tbody>
//         </table>
//         <button
//           onClick={handleSave}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg mt-5 hover:bg-blue-700 transition duration-300"
//         >
//           Save Order
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CreateOrder;

// import { useEffect, useState } from "react";
// import ItemType from "../../types/ItemType";
// import CategoryType from "../../types/CategoryType";
// import axios from "axios";
// import OrderType from "../../types/OrderType";
// import { useNavigate } from "react-router-dom";
// import StockType from "../../types/StockType";

// function CreateOrder() {
//   const [Items, setItems] = useState<ItemType[]>([]);
//   const [categories, setCategories] = useState<CategoryType[]>([]);
//   const [Stocks, setStocks] = useState<StockType[]>([]);

//   const [categoryId, setCategoryId] = useState<number>(0);
//   const [ShowAllItems, setShowAllItems] = useState<boolean>(true);
//   const [orderedItems, setOrderedItems] = useState<ItemType[]>([]);
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [quantityOnHand, setQuantityOnHand] = useState<number>(0);
//   const [error, setError] = useState<string>("");

//   async function loadStock() {
//     const apiResponce = await axios.get("http://localhost:8081/stocks");
//     setStocks(apiResponce.data);
//   }

//   async function loadItems() {
//     const apiResponce = await axios.get("http://localhost:8081/items");
//     setItems(apiResponce.data);
//   }

//   async function loadCategories() {
//     const apiResponce = await axios.get("http://localhost:8081/categories");
//     setCategories(apiResponce.data);
//   }

//   async function addItems(category: CategoryType) {
//     setShowAllItems(false);
//     setCategoryId(category.categoryID);
//   }

//   async function addItemsToCart(item: ItemType) {
//     const apiResponce = await axios.get("http://localhost:8081/stocks/" + item.itemCode);
//     const Stockdata = apiResponce.data;
//     let quantityOnHand = 0;
//     Stockdata.map(function (stock: { quantityOnHand: any; }) {
//       quantityOnHand += stock.quantityOnHand;
//     });

//     console.log(quantityOnHand);

//     if (quantityOnHand > 0) {
//       const newArray = [...orderedItems, item];
//       console.log(newArray);
//       setOrderedItems(newArray);
//       setError("");
//     } else {
//       setError("Out of stock");
//     }
//   }

//   function handleDeleteRow(itemCode: number) {
//     const index = orderedItems.findIndex(item => item.itemCode === itemCode);
//     console.log(index);

//     if (index !== -1) {
//       const newOrderedItems = [...orderedItems];
//       newOrderedItems.splice(index, 1);
//       setOrderedItems(newOrderedItems);
//     }
//   }

//   const navigate = useNavigate();
//   async function handelSave() {
//     try {
//       const itemCodes: any = [];

//       orderedItems.map(function (item) {
//         itemCodes.push(item.itemCode);
//       });

//       localStorage.setItem("cart", JSON.stringify(orderedItems));
//       navigate("/orders/checkout");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(function () {
//     loadCategories();
//     loadItems();
//   }, []);

//   useEffect(function () {
//     let total = 0;
//     orderedItems.forEach(function (item) {
//       total += item.price;
//     });

//     setTotalPrice(total);
//   }, [orderedItems]);

//   return (
//     <div className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen p-5">
//       <div className="fixed top-0 left-0 right-0 bg-blue-800 text-white py-4 px-8 shadow-md z-50">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-semibold">Add To Cart</h1>
//         </div>
//       </div>
//       <div className="flex flex-col lg:flex-row p-5 space-y-4 lg:space-y-0 lg:space-x-6 mt-20">
//         {/* Sidebar: Categories */}
//         <div className="w-full lg:w-[30%] bg-white shadow-lg rounded-lg p-4 border border-gray-200">
//           <div className="text-xl text-gray-800 font-semibold mb-4">Categories</div>
//           <button className={`w-full py-2 text-left hover:bg-blue-100 hover:scale-105 ${ShowAllItems ? 'bg-blue-200' : ''}`} onClick={() => setShowAllItems(true)}>All Items</button>
//           {categories.map(function (category) {
//             return (
//               <button className="w-full py-2 text-left hover:bg-blue-100 hover:scale-105" onClick={() => addItems(category)}>
//                 {category.categoryName}
//               </button>
//             );
//           })}
//         </div>

//         {/* Items Display */}
//         <div className="w-full lg:w-[40%] p-4">
//           {Items.map(function (item) {
//             if (item.category.categoryID == categoryId && !ShowAllItems) {
//               return (
//                 <div className="p-3 mb-4 border border-slate-200 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={() => addItemsToCart(item)}>
//                   <div className="text-lg font-semibold text-white">{item.itemName}</div>
//                   <div className="text-sm text-gray-200">{item.description}</div>
//                   <div className="text-sm text-right font-semibold">Rs.{item.price}</div>
//                 </div>
//               );
//             }
//             if (ShowAllItems) {
//               return (
//                 <div className="p-3 mb-4 border border-slate-200 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={() => addItemsToCart(item)}>
//                   <div className="text-lg font-semibold text-white">{item.itemName}</div>
//                   <div className="text-sm text-gray-200">{item.description}</div>
//                   <div className="text-sm text-right font-semibold">Rs.{item.price}</div>
//                 </div>
//               );
//             }
//           })}
//         </div>

//         {/* Cart Section */}
//         <div className="w-full lg:w-[30%] p-4 bg-white shadow-lg rounded-lg">
//           <div className="text-xl text-gray-800 font-semibold mb-4">Item Cart</div>
//           <table className="table-auto w-full">
//             <thead>
//               <tr className="text-left border-b">
//                 <th className="py-2">#</th>
//                 <th className="py-2">Item</th>
//                 <th className="py-2">Price(Rs)</th>
//                 <th className="py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderedItems.map(function (item) {
//                 return (
//                   <tr className="border-b">
//                     <td className="py-2">{item.itemCode}</td>
//                     <td className="py-2">{item.itemName}</td>
//                     <td className="py-2">{item.price}</td>
//                     <td className="py-2 cursor-pointer" onClick={() => handleDeleteRow(item.itemCode)}>
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-600 hover:text-red-800 transition-colors duration-200">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
//                       </svg>
//                     </td>
//                   </tr>
//                 );
//               })}
//               <tr>
//                 <td className="py-2">{error && <div className="text-sm text-red-500">{error}</div>}</td>
//               </tr>
//               <tr className="font-semibold text-lg">
//                 <td colSpan={2} className="py-4">Total</td>
//                 <td className="py-4">Rs. {totalPrice}</td>
//               </tr>
//             </tbody>
//           </table>
//           <button type="button" className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm mt-2 transition duration-300" onClick={handelSave}>Go to checkout</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateOrder;

