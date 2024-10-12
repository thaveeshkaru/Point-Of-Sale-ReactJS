import { useEffect, useState } from "react";
import StockType from "../types/StockType";
import axios from "axios";
import ItemType from "../types/ItemType";

function Stock(){

    const[Stocks,setStocks]= useState<StockType[]>([]);
    const[quantityOnHand,setQuantityOnHand] = useState<number>(0);
    const[location,setLocation]= useState<string>("");
    const[itemCode,setItemCode] = useState<number>(0);

    const[Items,setItems] = useState<ItemType[]>([]);
    const[isEdit,setIsEdit] = useState<boolean>(false);
    const[updatedStockId,setUpdatedStockId] = useState<number>(0);

    async function loadStock() {
        const apiResponce= await axios.get("http://localhost:8081/stocks");
        setStocks(apiResponce.data);
        handleStockStatus(Stocks)
    }

    async function loadItems() {
        const apiResponce = await axios.get("http://localhost:8081/items");
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
        loadStock();
        loadItems();
    },[]);

    function handleStockStatus(quantityOnHand: any) {

        if (quantityOnHand === 0) {
            return { status: 'Out of Stock', className: 'text-red-600' };
          } else if (quantityOnHand < 10) {
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
            await axios.put("http://localhost:8081/stocks/"+ updatedStockId, data);
        }else{
            await axios.post("http://localhost:8081/stocks", data);
        }
        handleStockStatus(quantityOnHand);
        loadStock();
        setItemCode(0);
        setQuantityOnHand(0);
        setLocation("");
        setUpdatedStockId(0);
        setIsEdit(false);
    }

    return(
        <div>
        <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-md z-50">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold">Stock</h1>
            </div>
        </div>
        <div className="container mx-auto pt-5 pb-5 px-9 mt-20">
            <table className="table-auto w-full shadow-lg rounded-lg bg-white">
                <thead className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                    <tr>
                    <th className="p-2 w-[50px] text-left">#</th>
                    <th className="p-2 w-[100px] text-left">Item Code</th>
                    <th className="p-2 w-[100px] text-left">Quantity On Hand</th>
                    <th className="p-2 text-left w-[150px]">Location</th>
                    <th className="p-2 text-left w-[100px]">Stock Status</th>
                    <th className="p-2 text-left w-[20px]">Action</th>
                    </tr> 
                </thead>

                <tbody>
                    {Stocks.map(function(stock){
                        const stockStatus = handleStockStatus(stock.quantityOnHand);
                            return(
                                <tr className="hover:bg-slate-100">
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{stock.stockId}</td>
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{stock.item.itemCode}</td>
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{stock.quantityOnHand}</td>
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{stock.location}</td>                            
                                    <td className={`p-2 border-b border-slate-200 ${stockStatus.className}`}>{stockStatus.status} </td>
                                    <td className="border-b border-slate-200">
                                    <button onClick={() => handleEdit(stock)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-slate-600">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                    {/* <button className="text-white px-3 py-2 text-sm bg-slate-800 rounded-lg mb-2 mt-2 hover:bg-slate-950" onClick={() => handleDelete(item)}> Delete</button> */}
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>

            <div className="bg-white border border-slate-200 py-3 px-4 rounded-lg mt-5 shadow-lg w-full">
                <form>
                    <div>
                        <label className="text-slate-800 text-3xl font-semibold block mb-3">
                        {isEdit ? "Edit Stock" : "Add Stock "}
                        </label>
                    </div>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2"></label>
                        <select value={itemCode} className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" onChange={handleItemCode} required>
                            <option value="">Please select item</option>
                            {Items.map(function(item) {
                                return (
                                    <option value={item.itemCode}>{item.itemName}</option>
                                )
                            })}

                        </select>
                    </div>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Quantity On Hand</label>
                        <input type="text" id="productName" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={quantityOnHand} onChange={handleQuantityOnHand} required />
                    </div>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Location</label>
                        <input type="text" id="productName" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={location} onChange={handleLocation} required />
                    </div>

                    <button type="button" className="py-3 px-4 bg-indigo-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-xl lg:w-[450px] w-full  " onClick={handleSubmit}>
                        {isEdit ? "Edit Stock" : "Add Stock "}
                    </button>
                </form>
            </div>
            
        </div>
    </div>
    )
}

export default Stock;

// import { useEffect, useState } from "react";
// import StockType from "../types/StockType";
// import axios from "axios";
// import ItemType from "../types/ItemType";

// function Stock() {
//   const [Stocks, setStocks] = useState<StockType[]>([]);
//   const [quantityOnHand, setQuantityOnHand] = useState<number>(0);
//   const [location, setLocation] = useState<string>("");
//   const [itemCode, setItemCode] = useState<number>(0);
//   const [Items, setItems] = useState<ItemType[]>([]);
//   const [isEdit, setIsEdit] = useState<boolean>(false);
//   const [updatedStockId, setUpdatedStockId] = useState<number>(0);

//   async function loadStock() {
//     const apiResponse = await axios.get("http://localhost:8081/stocks");
//     setStocks(apiResponse.data);
//   }

//   async function loadItems() {
//     const apiResponse = await axios.get("http://localhost:8081/items");
//     setItems(apiResponse.data);
//   }

//   function handleEdit(stock: StockType) {
//     setItemCode(stock.item.itemCode);
//     setQuantityOnHand(stock.quantityOnHand);
//     setLocation(stock.location);
//     setIsEdit(true);
//     setUpdatedStockId(stock.stockId);
//   }

//   function handleItemCode(event: any) {
//     setItemCode(event.target.value);
//   }

//   function handleQuantityOnHand(event: any) {
//     setQuantityOnHand(event.target.value);
//   }

//   function handleLocation(event: any) {
//     setLocation(event.target.value);
//   }

//   useEffect(function () {
//     loadStock();
//     loadItems();
//   }, []);

//   function handleStockStatus(quantityOnHand: any) {
//     if (quantityOnHand === 0) {
//       return { status: "Out of Stock", className: "text-red-600" };
//     } else if (quantityOnHand < 10) {
//       return { status: "Low Stock", className: "text-yellow-600" };
//     } else {
//       return { status: "Well Stocked", className: "text-green-600" };
//     }
//   }

//   async function handleSubmit() {
//     const data = {
//       itemCode: itemCode,
//       quantityOnHand: quantityOnHand,
//       location: location,
//     };

//     if (isEdit) {
//       await axios.put("http://localhost:8081/stocks/" + updatedStockId, data);
//     } else {
//       await axios.post("http://localhost:8081/stocks", data);
//     }
//     loadStock();
//     resetForm();
//   }

//   function resetForm() {
//     setItemCode(0);
//     setQuantityOnHand(0);
//     setLocation("");
//     setUpdatedStockId(0);
//     setIsEdit(false);
//   }

//   return (
//     <div className="container mx-auto pt-5 pb-5 px-4">
//       <h1 className="text-4xl font-semibold mb-5 text-slate-800 text-center">Stock Management</h1>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full shadow-lg rounded-lg bg-white">
//           <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//             <tr>
//               <th className="p-3 text-left">#</th>
//               <th className="p-3 text-left">Item Code</th>
//               <th className="p-3 text-left">Quantity On Hand</th>
//               <th className="p-3 text-left">Location</th>
//               <th className="p-3 text-left">Stock Status</th>
//               <th className="p-3 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Stocks.map(function (stock) {
//               const stockStatus = handleStockStatus(stock.quantityOnHand);
//               return (
//                 <tr className="hover:bg-slate-100 transition duration-200">
//                   <td className="p-3 text-slate-600 border-b border-slate-200">{stock.stockId}</td>
//                   <td className="p-3 text-slate-600 border-b border-slate-200">{stock.item.itemCode}</td>
//                   <td className="p-3 text-slate-600 border-b border-slate-200">{stock.quantityOnHand}</td>
//                   <td className="p-3 text-slate-600 border-b border-slate-200">{stock.location}</td>
//                   <td className={`p-3 border-b border-slate-200 ${stockStatus.className}`}>
//                     {stockStatus.status}
//                   </td>
//                   <td className="border-b border-slate-200">
//                     <button
//                       className="text-white px-3 py-2 text-sm bg-blue-600 rounded-lg mb-2 hover:bg-blue-700 transition duration-200"
//                       onClick={() => handleEdit(stock)}
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <div className="bg-white border border-slate-200 py-3 px-4 rounded-lg max-w-md mx-auto mt-5 shadow-lg">
//         <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
//           <h2 className="text-2xl font-semibold mb-3 text-slate-800 text-center">
//             {isEdit ? "Edit Stock" : "Add Stock"}
//           </h2>
//           <div>
//             <label className="text-slate-600 font-sm block mb-2">Item</label>
//             <select
//               value={itemCode}
//               className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg"
//               onChange={handleItemCode}
//               required
//             >
//               <option value="">Select an Item</option>
//               {Items.map(function (item) {
//                 return (
//                   <option key={item.itemCode} value={item.itemCode}>
//                     {item.itemName}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//           <div>
//             <label className="text-slate-600 font-sm block mb-2">Quantity On Hand</label>
//             <input
//               type="number"
//               className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg"
//               value={quantityOnHand}
//               onChange={handleQuantityOnHand}
//               required
//             />
//           </div>
//           <div>
//             <label className="text-slate-600 font-sm block mb-2">Location</label>
//             <input
//               type="text"
//               className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg"
//               value={location}
//               onChange={handleLocation}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-2 w-full transition duration-300"
//           >
//             {isEdit ? "Update Stock" : "Create Stock"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Stock;
