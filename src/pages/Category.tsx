import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import axios from "axios";

function Category(){

    const[categories,setCategories] = useState <CategoryType[]>([]);
    const[categoryName,setCategoryName]= useState<string>("")

    async function loadCategories() {
        const apiResponce = await axios.get("http://localhost:8081/categories");
        setCategories(apiResponce.data);
    }

    function handleCategoryName(event: any){
        setCategoryName(event.target.value);
    }

    async function addCategory() {
        const data ={
            categoryName: categoryName
        }

        await axios.post("http://localhost:8081/categories", data);
        loadCategories();
        setCategoryName("")
    }

    useEffect(function(){
        loadCategories();
    },[]);

    return(
        <div >
            <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-8 shadow-md z-50">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold w-full text-center lg:text-left">Manage Categories</h1>
            </div>
            </div>
            <div className="container mx-auto px-8 py-10 pb-5 mt-20">
                {/* <button onClick={loadCategories}> Load Categories</ button> */}
                <div className="">
                <div className="bg-white p-6 rounded-2xl shadow-2xl mb-12 hover:scale-105"> 
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">        
                    {categories.map(category=>(
                        <div className="p-4 border border-slate-200 rounded-lg shadow-lg text-center text-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105">
                            {category.categoryName}
                        </div>
                    ))}
                </div>
                </div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full lg:w-1/3 hover:scale-105">
                    {/* <label className="text-sm text-slate-600 block mb-3">Enter Category Name</label> */}
                    <input type="text" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" value={categoryName} onChange={handleCategoryName}
                    placeholder="Enter Category Name"/>
                    <button className="py-3 px-6 rounded-full w-full bg-slate-800 text-sm text-white hover:bg-blue-700 font-semibold" onClick={addCategory}>Add Category</button>
                </div>

            </div>
        </div>


    )
}

 export default Category;



// import { useEffect, useState } from "react";
// import CategoryType from "../types/CategoryType";
// import axios from "axios";

// function Category() {
//   const [categories, setCategories] = useState<CategoryType[]>([]);
//   const [categoryName, setCategoryName] = useState<string>("");

//   async function loadCategories() {
//     const apiResponse = await axios.get("http://localhost:8081/categories");
//     setCategories(apiResponse.data);
//   }

//   function handleCategoryName(event: any) {
//     setCategoryName(event.target.value);
//   }

//   async function addCategory() {
//     const data = {
//       categoryName: categoryName,
//     };

//     await axios.post("http://localhost:8081/categories", data);
//     loadCategories();
//     setCategoryName("");
//   }

//   useEffect(function () {
//     loadCategories();
//   }, []);

//   return (
//     <div className="container mx-auto px-8 py-10 bg-gradient-to-r from-purple-50 to-indigo-50 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
//         Category Management
//       </h1>

//       {/* Existing Categories Section */}
//       <div className="bg-white p-6 rounded-2xl shadow-2xl mb-12 transform hover:scale-105 transition-transform duration-300 ease-in-out">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-semibold text-gray-800">
//             Existing Categories
//           </h2>
//           <button
//             onClick={loadCategories}
//             className="bg-indigo-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200"
//           >
//             Refresh
//           </button>
//         </div>

//         {/* Categories Display */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {categories.map((category) => (
//             <div
//               key={category.categoryID}
//               className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
//             >
//               <p className="font-bold text-lg text-center">
//                 {category.categoryName}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

// //       {/* Add Category Section */}
// //       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full md:w-1/2 lg:w-1/3 mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
// //         <h2 className="text-3xl font-semibold mb-6 text-gray-800">
// //           Add New Category
// //         </h2>
// //         <label className="text-lg text-gray-600 block mb-3">Category Name</label>
// //         <input
//           type="text"
//           className="block w-full p-3 border-2 border-gray-300 rounded-xl text-gray-600 text-base mb-6 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none transition-all duration-200"
//           value={categoryName}
//           onChange={handleCategoryName}
//           placeholder="Enter category name"
//         />
//         <button
//           className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg w-full hover:shadow-2xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
//           onClick={addCategory}
//         >
//           Add Category
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Category;
