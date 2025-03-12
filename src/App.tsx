// import TellUsAbout from "./components/TellUsAbout.tsx";
// import OrderTable from "./components/OrderTable.tsx"
// import FeedbackPage from "./components/FeedbackPage.tsx"
import ProductDashboard from "./components/ProductDashboard.tsx"

function App() {

  return (
    <>
      {/* <TellUsAbout /> */}
      {/* <OrderTable /> */}
      {/* <FeedbackPage /> */}
      <ProductDashboard />
    </>
  )
}

export default App

// import React, { useState, useEffect, useRef } from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Area,
// } from "recharts";
// import productData, { CategoryData } from "../Product Data/ProductData.tsx";

// const ProductDashboard: React.FC = () => {
//   // State for selected category and dropdown visibility
//   const [selectedCategory, setSelectedCategory] = useState<string>("shirts");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [categoryData, setCategoryData] = useState<CategoryData>(
//     productData["shirts"]
//   );

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Categories for dropdown
//   const categories = [
//     { id: "shirts", name: "Shirts" },
//     { id: "pants", name: "Pants" },
//     { id: "dresses", name: "Dresses" },
//     { id: "accessories", name: "Accessories" },
//     { id: "menswear", name: "Men's Wear" },
//     { id: "womenswear", name: "Women's Wear" },
//   ];

//   // Update data when selected category changes
//   useEffect(() => {
//     setCategoryData(productData[selectedCategory]);
//   }, [selectedCategory]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Handle category selection
//   const handleCategorySelect = (categoryId: string) => {
//     setSelectedCategory(categoryId);
//     setIsDropdownOpen(false);
//   };

//   // Find the selected month with highest sales
//   const peakMonth = [...categoryData.monthlyData].sort(
//     (a, b) => b.units - a.units
//   )[0];
//   const peakMonthIndex = categoryData.monthlyData.findIndex(
//     (item) => item.month === peakMonth.month
//   );
//   const peakMonthPosition =
//     (peakMonthIndex / (categoryData.monthlyData.length - 1)) * 100;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header with dropdown */}
//       <div className="mb-6">
//         <div className="relative inline-block text-left" ref={dropdownRef}>
//           <div>
//             <button
//               type="button"
//               className="inline-flex justify-between w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               {categories.find((cat) => cat.id === selectedCategory)?.name ||
//                 "Select Category"}
//               <svg
//                 className="-mr-1 ml-2 h-5 w-5"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Dropdown menu */}
//           {isDropdownOpen && (
//             <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
//               <div
//                 className="py-1"
//                 role="menu"
//                 aria-orientation="vertical"
//                 aria-labelledby="options-menu"
//               >
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     role="menuitem"
//                     onClick={() => handleCategorySelect(category.id)}
//                   >
//                     {category.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Size Distribution Chart */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-medium mb-4">{categoryData.label}</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={categoryData.sizeData}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="size"
//                   label={{
//                     value: "Size",
//                     position: "insideBottom",
//                     offset: -5,
//                   }}
//                 />
//                 <YAxis
//                   label={{ value: "Units", angle: -90, position: "insideLeft" }}
//                 />
//                 <Tooltip />
//                 <Bar dataKey="units" fill="#4B5563" barSize={20} />{" "}
//                 {/* Reduced bar width */}
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Products List */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-medium">Selling Growth</h2>
//             <button className="text-sm text-gray-600">View All Products</button>
//           </div>
//           <div className="space-y-6">
//             {categoryData.products.map((product) => (
//               <div
//                 key={product.id}
//                 className="flex items-center justify-between"
//               >
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-10 h-10"
//                     />
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-sm font-medium">{product.name}</h3>
//                     <p className="text-xs text-gray-500">
//                       {product.sales.toLocaleString()} Sales
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="flex items-center text-sm">
//                     <svg
//                       className="w-4 h-4 mr-1"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                       />
//                     </svg>
//                     <span
//                       className={
//                         product.percentGrowth > 5
//                           ? "text-green-500"
//                           : "text-red-500"
//                       }
//                     >
//                       {product.percentGrowth}%
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     {product.stockRemaining} Stocks Remaining
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Monthly Sales Chart */}
//       <div className="mt-6 bg-white p-6 rounded-lg shadow">
//         <h2 className="text-lg font-medium mb-4">Monthly record</h2>
//         <div className="h-64 relative">
//           {/* Highlight for peak month */}
//           <div
//             className="absolute h-full w-16 bg-yellow-100 opacity-50"
//             style={{ left: `${peakMonthPosition}%`, top: 0 }}
//           ></div>
//           {/* Units indicator for peak month */}
//           <div
//             className="absolute text-xs text-gray-600"
//             style={{ left: `${peakMonthPosition + 2}%`, top: "15%" }}
//           >
//             {peakMonth.units} units
//           </div>

//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               data={categoryData.monthlyData}
//               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//             >
//               {/* Removed the grid lines by commenting out CartesianGrid */}
//               {/* <CartesianGrid strokeDasharray="3 3" /> */}
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />

//               {/* Added Area component for the shadow effect under the curve */}
//               <defs>
//                 <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#3E54C8" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="#3E54C8" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <Area
//                 type="monotone"
//                 dataKey="units"
//                 stroke="none"
//                 fill="url(#colorUnits)"
//                 fillOpacity={1}
//               />

//               {/* Changed the line color to #3E54C8 as requested */}
//               <Line
//                 type="monotone"
//                 dataKey="units"
//                 stroke="#3E54C8"
//                 strokeWidth={2}
//                 dot={{ r: 3, fill: "#3E54C8" }}
//                 activeDot={{ r: 5, fill: "#3E54C8" }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDashboard;
