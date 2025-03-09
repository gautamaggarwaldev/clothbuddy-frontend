// import TellUsAbout from "./components/TellUsAbout.tsx";

import OrderTable from "./components/OrderTable.tsx"

function App() {

  return (
    <>
      {/* <TellUsAbout /> */}
      <OrderTable />
    </>
  )
}

export default App

//  className="mb-4 border-[#8F8C8C] px-10 text-xl py-5 rounded-xl border-2 font-medium"

// {/*
//   /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import ordersData from "../orderData/order.json";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import watermark from "../assets/wm.png";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogOverlay,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Toaster, toast } from "@/components/ui/sonner";

// // Function to get the status color
// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "Completed":
//       return "text-green-500";
//     case "Processing":
//       return "text-[#3E54C8]";
//     case "Incomplete":
//       return "text-yellow-500";
//     case "Pending":
//       return "text-red-500";
//     default:
//       return "text-gray-500";
//   }
// };

// // Available status options
// const statusOptions = ["Completed", "Processing", "Incomplete", "Pending"];

// const OrderTable = () => {
//   const [orders, setOrders] = useState(ordersData);
//   const [originalOrders, setOriginalOrders] = useState(ordersData); // Keep original data for filtering
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  
//   // Customize dialog state
//   const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState<string>("");
//   const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>({});
  
//   // Confirmation dialog state
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
//   // Track which dropdown is currently open
//   const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

//   // Reference to the scroll container
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
  
//   // Store dropdown button refs
//   const dropdownRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  
//   // Action menu state (NEW)
//   const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
//   const actionMenuRefs = useRef<Record<string, HTMLButtonElement | null>>({});

//   // Initialize order statuses
//   useEffect(() => {
//     const initialStatuses: Record<string, string> = {};
//     orders.forEach(order => {
//       initialStatuses[order.id] = order.status;
//     });
//     setOrderStatuses(initialStatuses);
//   }, [orders]);

//   // Rest of your functions (exportToPDF, handleClickOutside, sorting functions, etc.)
//   // ...

//   const exportToPDF = () => {
//     const doc = new jsPDF();
  
//     doc.setFontSize(14);
//     doc.setTextColor(0, 0, 0);
//     doc.text("Store Orders", 14, 20);
  
//     const tableColumn = [
//       "Order ID",
//       "Product",
//       "Order Date",
//       "Price (Rs)",
//       "Payment",
//       "Status",
//     ];
//     const tableRows: string[][] = [];
  
//     orders.forEach((order) => {
//       const price = order.price.replace(/[^0-9.]/g, "");
//       const formattedPrice = `${parseFloat(price).toLocaleString("en-IN")}`;
  
//       const rowData = [
//         order.id,
//         order.product,
//         order.date,
//         formattedPrice,
//         order.payment,
//         order.status,
//       ];
//       tableRows.push(rowData);
//     });
  
//     // Pre-load the watermark image before starting to generate the PDF
//     if (watermark) {
//       const img = new Image();
//       img.src = watermark;
//       img.onload = function() {
//         // Once the image is loaded, proceed with PDF generation
//         generatePDF(img);
//       };
//     } else {
//       // If no watermark, proceed directly
//       generatePDF(null);
//     }
  
//     function generatePDF(watermarkImg: CanvasImageSource | null) {
//       autoTable(doc, {
//         head: [tableColumn],
//         body: tableRows,
//         startY: 30,
//         theme: "grid",
//         styles: {
//           overflow: "linebreak",
//           fontSize: 10,
//           cellPadding: 3,
//           valign: "middle",
//         },
//         columnStyles: {
//           0: { cellWidth: 25 },
//           1: { cellWidth: "auto" },
//           2: { cellWidth: 35 },
//           3: { cellWidth: 25, halign: "center" },
//           4: { cellWidth: 30 },
//           5: { cellWidth: 35, halign: "center" },
//         },
//         margin: { left: 10, right: 10 },
//         tableWidth: "auto",
//         didParseCell: function (data) {
//           if (data.column.index === 5) {
//             const status = data.cell.raw;
//             switch (status) {
//               case "Completed":
//                 data.cell.styles.textColor = [0, 128, 0];
//                 break;
//               case "Processing":
//                 data.cell.styles.textColor = [62, 84, 200];
//                 break;
//               case "Incomplete":
//                 data.cell.styles.textColor = [255, 165, 0];
//                 break;
//               case "Pending":
//                 data.cell.styles.textColor = [255, 0, 0];
//                 break;
//               default:
//                 data.cell.styles.textColor = [0, 0, 0];
//                 break;
//             }
//           }
//         },
//         didDrawPage: function (data) {
//           // This function runs for each page
//           if (watermarkImg) {
//             const pageWidth = doc.internal.pageSize.getWidth();
//             const pageHeight = doc.internal.pageSize.getHeight();
  
//             const imgWidth = 100;
//             const imgHeight = 100;
//             const xPos = (pageWidth - imgWidth) / 2;
//             const yPos = (pageHeight - imgHeight) / 2;
  
//             console.log(`Adding watermark to page ${doc.getNumberOfPages()}`);
  
//             // Create the lightened version of the image
//             const canvas = document.createElement("canvas");
//             canvas.width = imgWidth;
//             canvas.height = imgHeight;
//             const ctx = canvas.getContext("2d");
  
//             if (ctx) {
//               ctx.globalAlpha = 0.2;
//               ctx.drawImage(watermarkImg, 0, 0, imgWidth, imgHeight);
//               const lightenedImg = canvas.toDataURL("image/png");
  
//               // Add the watermark to the current page
//               doc.addImage(
//                 lightenedImg,
//                 "PNG",
//                 xPos,
//                 yPos,
//                 imgWidth,
//                 imgHeight,
//                 `watermark_${doc.getNumberOfPages()}`,  // Unique identifier for each page
//                 "FAST"
//               );
//             }
//           }
//         },
//       });
  
//       // Save the PDF after all pages have been generated
//       doc.save("store_orders.pdf");
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (!(event.target as HTMLElement).closest(".dropdown-container")) {
//         setIsDropdownOpen(false);
//         setIsPriceDropdownOpen(false);
//       }
      
//       // Close action menu when clicking outside (NEW)
//       if (!(event.target as HTMLElement).closest(".action-menu-container")) {
//         setOpenActionMenuId(null);
//       }
      
//       // Don't close status dropdowns on clicks outside if they're within the dialog content
//       if (isCustomizeOpen && 
//           (event.target as HTMLElement).closest(".custom-dialog-content") && 
//           !(event.target as HTMLElement).closest(".status-dropdown-container")) {
//         setOpenDropdownId(null);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isCustomizeOpen]);

//   // Sorting Functions
//   const sortByDate = () => {
//     setOrders(
//       [...orders].sort(
//         (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//       )
//     );
//     setIsDropdownOpen(false);
//   };

//   const sortByProduct = () => {
//     setOrders([...orders].sort((a, b) => a.product.localeCompare(b.product)));
//     setIsDropdownOpen(false);
//   };

//   const sortByPriceLowToHigh = () => {
//     setOrders(
//       [...orders].sort(
//         (a, b) =>
//           parseFloat(a.price.replace("₹ ", "").replace(",", "")) -
//           parseFloat(b.price.replace("₹ ", "").replace(",", ""))
//       )
//     );
//     setIsDropdownOpen(false);
//     setIsPriceDropdownOpen(false);
//   };

//   const sortByPriceHighToLow = () => {
//     setOrders(
//       [...orders].sort(
//         (a, b) =>
//           parseFloat(b.price.replace("₹ ", "").replace(",", "")) -
//           parseFloat(a.price.replace("₹ ", "").replace(",", ""))
//       )
//     );
//     setIsDropdownOpen(false);
//     setIsPriceDropdownOpen(false);
//   };
  
//   // Open customize dialog
//   const handleOpenCustomize = () => {
//     setIsCustomizeOpen(true);
//   };
  
//   // Handle status change for an order
//   const handleStatusChange = (orderId: string, value: string, event: React.MouseEvent) => {
//     // Prevent the click from propagating and causing scroll
//     event.preventDefault();
//     event.stopPropagation();
    
//     setOrderStatuses(prev => ({
//       ...prev,
//       [orderId]: value
//     }));
    
//     // Set this as the selected order for confirmation
//     setSelectedOrderId(orderId);
//     // Close dropdown after selection
//     setOpenDropdownId(null);
//   };
  
//   // Calculate position for dropdown
//   const getDropdownPosition = (orderId: string) => {
//     const buttonElement = dropdownRefs.current[orderId];
    
//     if (!buttonElement || !scrollContainerRef.current) return {};
    
//     const buttonRect = buttonElement.getBoundingClientRect();
//     const containerRect = scrollContainerRef.current.getBoundingClientRect();
    
//     // Calculate space below and above
//     const spaceBelow = containerRect.bottom - buttonRect.bottom;
//     const spaceAbove = buttonRect.top - containerRect.top;
    
//     // Approximate dropdown height
//     const dropdownHeight = statusOptions.length * 36 + 10; // 36px per item + padding
    
//     // If not enough space below, position above if there's enough space
//     if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
//       return {
//         position: "absolute",
//         bottom: "100%",
//         top: "auto",
//         width: "100%",
//         zIndex: 100
//       };
//     }
    
//     // Default position below
//     return {
//       position: "absolute",
//       top: "100%",
//       bottom: "auto",
//       width: "100%",
//       zIndex: 100
//     };
//   };
  
//   // Calculate position for action menu (NEW)
//   const getActionMenuPosition = (orderId: string) => {
//     const buttonElement = actionMenuRefs.current[orderId];
    
//     if (!buttonElement) return {};
    
//     // Position slightly below and to the right of the button
//     return {
//       position: "absolute",
//       top: "100%",
//       right: "0",
//       width: "200px",
//       zIndex: 100
//     };
//   };
  
//   // Toggle dropdown without changing scroll position
//   const toggleDropdown = (orderId: string, event: React.MouseEvent<HTMLButtonElement>) => {
//     // Prevent default behavior which might cause scroll
//     event.preventDefault();
//     event.stopPropagation();
    
//     // Save current scroll position
//     const currentScrollTop = scrollContainerRef.current?.scrollTop || 0;
    
//     // If this dropdown is already open, close it
//     if (openDropdownId === orderId) {
//       setOpenDropdownId(null);
//       return;
//     }
    
//     // Otherwise, open this one and store the button reference
//     setOpenDropdownId(orderId);
//     dropdownRefs.current[orderId] = event.currentTarget;
    
//     // Restore scroll position after state update
//     setTimeout(() => {
//       if (scrollContainerRef.current) {
//         scrollContainerRef.current.scrollTop = currentScrollTop;
//       }
//     }, 0);
//   };
  
//   // Toggle action menu (NEW)
//   const toggleActionMenu = (orderId: string, event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     event.stopPropagation();
    
//     // If this menu is already open, close it
//     if (openActionMenuId === orderId) {
//       setOpenActionMenuId(null);
//       return;
//     }
    
//     // Otherwise, open this one and store the button reference
//     setOpenActionMenuId(orderId);
//     actionMenuRefs.current[orderId] = event.currentTarget;
//   };
  
//   // Filter orders by time range (NEW)
//   // Filter orders by time range
// const filterOrdersByTimeRange = (months: number, orderId: string) => {
//     // Calculate the cutoff date
//     const cutoffDate = new Date();
//     cutoffDate.setMonth(cutoffDate.getMonth() - months);
    
//     // Parse dates in the format "Jan 12, 12:23 pm"
//     const filteredOrders = originalOrders.filter(order => {
//       try {
//         // Extract only the date part (ignore time for filtering)
//         const datePart = order.date.split(',')[0]; // "Jan 12"
//         const monthStr = datePart.split(' ')[0]; // "Jan"
//         const day = parseInt(datePart.split(' ')[1]); // 12
        
//         // Convert month name to month number (0-11)
//         const months = {
//           "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, 
//           "May": 4, "Jun": 5, "Jul": 6, "Aug": 7,
//           "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
//         };
        
//         // Get current year (since your data doesn't include year)
//         const currentYear = new Date().getFullYear();
        
//         // Create Date object
//         const orderDate = new Date(currentYear, months[monthStr], day);
        
//         // For dates that would be in the future this year,
//         // assume they're from last year
//         if (orderDate > new Date() && !order.date.includes(currentYear.toString())) {
//           orderDate.setFullYear(currentYear - 1);
//         }
        
//         return orderDate >= cutoffDate;
//       } catch (err) {
//         console.error("Error parsing date:", order.date, err);
//         // Include the order if we can't parse the date (fail safe)
//         return true;
//       }
//     });
    
//     // If no orders match, show a message instead of emptying the table
//     if (filteredOrders.length === 0) {
//       toast({
//         title: "No orders found",
//         description: `No orders found in the last ${months} months.`,
//         duration: 3000,
//       });
//       // Keep the current orders unchanged
//       return;
//     }
    
//     // Update the orders
//     setOrders(filteredOrders);
    
//     // Close the action menu
//     setOpenActionMenuId(null);
    
//     // Show notification using toast instead of Toaster
//     toast({
//       title: `Filtered by ${months} months`,
//       description: `Showing ${filteredOrders.length} orders from the last ${months} months.`,
//       duration: 3000,
//     });
//   };
  
//   // Handle save button
//   const handleSave = () => {
//     setIsCustomizeOpen(false);
//     setOpenDropdownId(null);
    
//     // Check if any statuses have changed
//     const hasChanges = orders.some(order => orderStatuses[order.id] !== order.status);
    
//     if (hasChanges) {
//       setIsConfirmOpen(true);
//     } else {
//       toast({
//         title: "No Changes",
//         description: "No status changes were made.",
//         duration: 3000,
//       });
//     }
//   };
  
//   // Handle confirmation
//   const handleConfirm = () => {
//     // Update all order statuses at once
//     const updatedOrders = orders.map(order => {
//       return { 
//         ...order, 
//         status: orderStatuses[order.id] || order.status 
//       };
//     });
    
//     setOrders(updatedOrders);
//     // Also update the original orders to maintain consistent state
//     setOriginalOrders(prev => {
//       return prev.map(order => {
//         if (orderStatuses[order.id]) {
//           return { ...order, status: orderStatuses[order.id] };
//         }
//         return order;
//       });
//     });
    
//     setIsConfirmOpen(false);
    
//     // In a real application, you would save to the JSON file here
//     // This would typically be done via an API call
//     toast({
//       title: "Status Updated",
//       description: "Order statuses have been updated successfully",
//       duration: 3000,
//     });
//   };

//   // Custom dialog component with fixed dropdown positioning
//   const CustomDialog = () => {
//     if (!isCustomizeOpen) return null;
    
//     // Reference for maintaining scroll position
//     const dialogRef = useRef<HTMLDivElement>(null);
    
//     // Hook to keep track of scroll position when opening/closing dropdowns
//     useEffect(() => {
//       let scrollPosition = 0;
      
//       // Store the current scroll position before dropdown opens
//       if (dialogRef.current && openDropdownId) {
//         scrollPosition = dialogRef.current.scrollTop;
//       }
      
//       // Return scroll position to previous state after dropdown renders
//       const timer = setTimeout(() => {
//         if (dialogRef.current) {
//           dialogRef.current.scrollTop = scrollPosition;
//         }
//       }, 10);
      
//       return () => clearTimeout(timer);
//     }, [openDropdownId]);
    
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center">
//         {/* Overlay/backdrop */}
//         <div 
//           className="fixed inset-0 bg-black opacity-70" 
//           onClick={() => {
//             setIsCustomizeOpen(false);
//             setOpenDropdownId(null);
//           }}
//         />
        
//         {/* Dialog content */}
//         <div className="relative z-50 w-full max-w-md max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
//           <div className="p-6 custom-dialog-content">
//             <div className="mb-4">
//               <h2 className="text-xl font-semibold">Customize Order Statuses</h2>
//               <p className="text-gray-500 mt-1">
//                 Update the status for any order by selecting from the dropdown
//               </p>
//             </div>
            
//             <div className="py-4">
//               <div 
//                 ref={scrollContainerRef}
//                 className="space-y-4 max-h-[60vh] overflow-y-auto pr-1"
//               >
//                 {orders.map((order) => (
//                   <div key={order.id} className="grid grid-cols-4 items-center gap-4 py-2 border-b relative">
//                     <label className="text-right font-medium">
//                       {order.id}:
//                     </label>
//                     <div className="col-span-3">
//                       {/* Improved dropdown implementation */}
//                       <div className="relative status-dropdown-container">
//                         <button
//                           type="button"
//                           className={`flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ${getStatusColor(orderStatuses[order.id] || order.status)}`}
//                           onClick={(e) => toggleDropdown(order.id, e)}
//                           ref={(el) => {
//                             // Store reference to button
//                             if (el) dropdownRefs.current[order.id] = el;
//                           }}
//                         >
//                           <span>{orderStatuses[order.id] || order.status}</span>
//                           <span className="ml-2">{openDropdownId === order.id ? "▲" : "▼"}</span>
//                         </button>
                        
//                         {openDropdownId === order.id && (
//                           <div 
//                             className="rounded-md border border-gray-200 bg-white shadow-lg"
//                             style={getDropdownPosition(order.id)}
//                           >
//                             <ul className="py-1 max-h-36 overflow-y-auto">
//                               {statusOptions.map(status => (
//                                 <li 
//                                   key={status}
//                                   className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${getStatusColor(status)}`}
//                                   onClick={(e) => handleStatusChange(order.id, status, e)}
//                                 >
//                                   {status}
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="mt-6 flex justify-end space-x-2">
//               <Button 
//                 variant="outline" 
//                 onClick={() => {
//                   setIsCustomizeOpen(false);
//                   setOpenDropdownId(null);
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleSave}>
//                 Save Changes
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 font-semibold relative">
//       {/* Sort Button with Click Dropdown */}
//       <div className="relative dropdown-container inline-block">
//         <Button
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           variant="outline"
//           className="mb-4 border-[#8F8C8C] px-10 text-xl py-5 rounded-xl border-2 font-medium"
//         >
//           Sort
//         </Button>

//         {/* Dropdown Menu */}
//         {isDropdownOpen && (
//           <div className="absolute left-0 top-full mt-2 bg-white border border-gray-300 shadow-lg rounded-md w-48 z-50">
//             <button
//               onClick={sortByDate}
//               className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//             >
//               Sort by Date
//             </button>

//             {/* Sort by Price with Submenu */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//               >
//                 Sort by Price ▸
//               </button>

//               {isPriceDropdownOpen && (
//                 <div className="absolute left-full top-0 ml-2 bg-white border border-gray-300 shadow-lg rounded-md w-48 z-50">
//                   <button
//                     onClick={sortByPriceLowToHigh}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//                   >
//                     Low to High
//                   </button>
//                   <button
//                     onClick={sortByPriceHighToLow}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//                   >
//                     High to Low
//                   </button>
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={sortByProduct}
//               className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//             >
//               Sort by Product
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Orders Table */}
//       <Card className="shadow-lg rounded-lg overflow-hidden">
//         <CardContent className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl">Latest Orders</h2>
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 className="bg-[#f7f7f7] border-transparent hover:underline"
//                 onClick={handleOpenCustomize}
//               >
//                 Customize
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="hover:underline"
//                 onClick={exportToPDF}
//               >
//                 Export
//               </Button>
//             </div>
//           </div>

//           {/* Orders Table */}
//           <div className="overflow-x-auto">
//             <Table className="w-full border border-gray-300 rounded-lg shadow-md">
//               <TableHeader className="bg-gray-200 text-gray-700">
//                 <TableRow>
//                   <TableHead>Order ID</TableHead>
//                   <TableHead>Product</TableHead>
//                   <TableHead>Order Date</TableHead>
//                   <TableHead>Price</TableHead>
//                   <TableHead>Payment</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {orders.map((order, index) => (
//                   <TableRow
//                     key={index}
//                     className="border-t hover:bg-gray-100 transition"
//                   >
//                     <TableCell>{order.id}</TableCell>
//                     <TableCell>{order.product}</TableCell>
//                     <TableCell>{order.date}</TableCell>
//                     <TableCell>{order.price}</TableCell>
//                     <TableCell>{order.payment}</TableCell>
//                     <TableCell
//                       className={`font-semibold ${getStatusColor(order.status)}`}
//                     >
//                       {order.status}
//                     </TableCell>
//                     <TableCell>
//                       {/* Action Menu Button and Popup (NEW) */}
//                       <div className="relative action-menu-container">
//                         <button
//                           className="font-bold text-gray-700 hover:text-gray-900"
//                           onClick={(e) => toggleActionMenu(order.id, e)}
//                           ref={(el) => {
//                             // Store reference to button
//                             if (el) actionMenuRefs.current[order.id] = el;
//                           }}
//                         >
//                           ...
//                         </button>
                        
//                         {openActionMenuId === order.id && (
//                           <div 
//                             className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md z-50"
//                             style={getActionMenuPosition(order.id)}
//                           >
//                             <div className="py-1">
//                               <button
//                                 onClick={() => filterOrdersByTimeRange(3, order.id)}
//                                 className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//                               >
//                                 Order by last 3 months
//                               </button>
//                               <button
//                                 onClick={() => filterOrdersByTimeRange(6, order.id)}
//                                 className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//                               >
//                                 Order by last 6 months
//                               </button>
//                               <button
//                                 onClick={() => filterOrdersByTimeRange(12, order.id)}
//                                 className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//                               >
//                                 Order by last 12 months
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
      
//       {/* Custom Dialog Implementation */}
//       <CustomDialog />
      
//       {/* Confirmation Dialog */}
//       <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
//         <AlertDialogContent className="bg-white">
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               You are about to update order statuses. This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleConfirm}>Yes, update it</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default OrderTable;
  
//   */}