import { useEffect, useState } from "react";
import ItemType from "../types/ItemType";
import CategoryType from "../types/CategoryType";
import axios from "axios";

function Item(){

    const[items,setItems]= useState<ItemType[]>([]);
    const[itemName,setItemName]= useState<string>("");
    const[price,setPrice] = useState<number>(0);
    const[description,setDescription] = useState<string>("");
    const[categoryId,setCategoryId] = useState<number>(0);

    const[categories,setcategories]= useState<CategoryType[]>([]);
    const[isEdit,setIsEdit] = useState<boolean>(false);
    const[updatedItemCode,setUpdatedItemCode] = useState<number>(0);

    async function loadItems() {
        const apiResponce = await axios.get("http://localhost:8081/items");
        setItems(apiResponce.data);
    }

    async function loadCategories() {
        const apiResponce = await axios.get("http://localhost:8081/categories");
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
                await axios.put("http://localhost:8081/items/" + updatedItemCode , data)

            }else{
                await axios.post("http://localhost:8081/items", data);
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

    useEffect(function(){
        loadItems();
        loadCategories();
    },[])

    return(
        <div>
            <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-md z-50">
                <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Item</h1>
                </div>
            </div>
            <div className="container mx-auto pt-5 pb-5 px-9 mt-20">
                <table className="table-auto w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                        <tr>
                            <th className="p-2 w-[50px] text-left">#</th>
                            <th className="p-2 w-[200px] text-left">Item Name</th>
                            <th className="p-2 w-[200px] text-left">Description</th>
                            <th className="p-2 text-left w-[100px]">Price(Rs)</th>
                            <th className="p-2 text-left w-[20px]">Category</th>
                            <th className="p-2 text-left w-[20px]">Action</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {items.map(function(item){
                            return(
                                <tr className="hover:bg-slate-100">
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{item.itemCode}</td>
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{item.itemName}</td>
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{item.description}</td>
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{item.price.toFixed(2)}</td>
                                    <td className="p-2 text-slate-600 border-b border-slate-200">{item.category?.categoryName}</td>
                                    <td className="border-b border-slate-200">
                                    <button onClick={() => handleEdit(item)}>
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

                <div className=" bg-white shadow-lg border border-slate-200 py-3 px-4 rounded-lg w-full mt-3">
                    <form>
                        <div>
                            <label className="text-slate-800 text-3xl font-semibold block mb-3">
                                {isEdit ? "Edit Item" : "Add Item"}
                            </label>
                        </div>
                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Item Name</label>
                            <input type="text" id="productName" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={itemName} onChange={handleItemName} required />
                        </div>

                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Price</label>
                            <input type="text" id="productPrice" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={price} onChange={handleItemPrice} required />
                        </div>

                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Description</label>
                            <input type="text" id="descroption" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={description} onChange={handleDescription} required />
                        </div>

                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Category</label>
                            <select value={categoryId} className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" onChange={handleCategoryId} required>
                                <option value="">Please select category</option>
                                {categories.map(function(category) {
                                    return (
                                        <option value={category.categoryID}>{category.categoryName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button type="button" className="py-3 px-4 bg-indigo-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-xl lg:w-[450px] w-full" onClick={handleSubmit}>
                            {isEdit? "Edit Item" : "Create Item"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
         
        
    )
}

export default Item;