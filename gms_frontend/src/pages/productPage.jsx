// import Header from "../components/header.jsx";
// import Footer from "../components/footer.jsx";
// import { IoMdCart } from "react-icons/io";

// export default function ProductPage() {
//   return (
//     <div className="bg-[#333333]">
//       <div>
//         <Header />
//       </div>

//       <div className="flex flex-col h-[100px] justify-center items-center">
//         <h1 className="font-['Roboto'] font-bold text-3xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
//           Premium <span className="text-yellow-500">Supplements</span>
//         </h1>

//         <p className="text-white  text-center">
//           Enhance your fitness journey with premium supplements that support
//           performance, strength, and faster recovery.
//         </p>
//       </div>
//       {/* buttons */}
//       <div className="flex  h-[80px] justify-center items-center gap-3 overflow-x-auto px-4 bg-[#262626]">
//         <button className="rounded-xl bg-[#d4af37] px-5 py-2 text-sm font-semibold text-black transition-colors">
//           All
//         </button>

//         <button className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-100 transition-colors whitespace-nowrap">
//           Pre-Workout
//         </button>

//         <button className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-100 transition-colors whitespace-nowrap">
//           Health
//         </button>

//         <button className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-100 transition-colors whitespace-nowrap">
//           Performance
//         </button>

//         <button className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-100 transition-colors whitespace-nowrap">
//           Recovery
//         </button>

//         <button className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-100 transition-colors whitespace-nowrap">
//           Protein
//         </button>
//       </div>
//       {/* buttons */}

//       <div className="grid grid-cols-3 border border-gray-300 bg-[#E7DBB8] mx-[100px] gap-2">
//         {/*Card 1*/}

//         <div className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans">
//           {/* Image Area */}
//           <div className="relative bg-zinc-900 flex items-center justify-center h-56">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
//             <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
//               Isolate
//             </span>
//             <img
//               src="s1.png"
//               alt="Premium Whey Protein Isolated"
//               className="h-40 object-contain relative z-10"
//             />
//           </div>

//           {/* Card Body */}
//           <div className="p-5">
//             <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
//               {" "}
//               Premium Whey Protein Isolated
//             </h2>

//             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
//               Forge Athletics fast-absorbing isolate — low fat, low carb,
//               designed for maximum post-workout muscle recovery. Chocolate Silk,
//               5 lb.
//             </p>

//             <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

//             {/* Footer */}
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
//                   {" "}
//                   Price{" "}
//                 </p>
//                 <p className="text-xl font-medium text-zinc-900 dark:text-white">
//                   {" "}
//                   Rs. 35,000.00{" "}
//                 </p>
//               </div>

//               <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer">
//                 {" "}
//                 <IoMdCart /> Add to cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {/*Card 2*/}

//         <div className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans">
//           {/* Image Area */}
//           <div className="relative bg-zinc-900 flex items-center justify-center h-56">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
//             <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
//               Isolate
//             </span>
//             <img
//               src="s1.png"
//               alt="Premium Whey Protein Isolated"
//               className="h-40 object-contain relative z-10"
//             />
//           </div>

//           {/* Card Body */}
//           <div className="p-5">
//             <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
//               {" "}
//               Premium Whey Protein Isolated
//             </h2>

//             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
//               Forge Athletics fast-absorbing isolate — low fat, low carb,
//               designed for maximum post-workout muscle recovery. Chocolate Silk,
//               5 lb.
//             </p>

//             <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

//             {/* Footer */}
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
//                   {" "}
//                   Price{" "}
//                 </p>
//                 <p className="text-xl font-medium text-zinc-900 dark:text-white">
//                   {" "}
//                   Rs. 35,000.00{" "}
//                 </p>
//               </div>

//               <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer">
//                 {" "}
//                 <IoMdCart /> Add to cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {/*Card 3*/}

//         <div className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans">
//           {/* Image Area */}
//           <div className="relative bg-zinc-900 flex items-center justify-center h-56">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
//             <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
//               Isolate
//             </span>
//             <img
//               src="s1.png"
//               alt="Premium Whey Protein Isolated"
//               className="h-40 object-contain relative z-10"
//             />
//           </div>

//           {/* Card Body */}
//           <div className="p-5">
//             <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
//               {" "}
//               Premium Whey Protein Isolated
//             </h2>

//             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
//               Forge Athletics fast-absorbing isolate — low fat, low carb,
//               designed for maximum post-workout muscle recovery. Chocolate Silk,
//               5 lb.
//             </p>

//             <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

//             {/* Footer */}
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
//                   {" "}
//                   Price{" "}
//                 </p>
//                 <p className="text-xl font-medium text-zinc-900 dark:text-white">
//                   {" "}
//                   Rs. 35,000.00{" "}
//                 </p>
//               </div>

//               <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer">
//                 {" "}
//                 <IoMdCart /> Add to cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {/*Card 4*/}

//         <div className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans">
//           {/* Image Area */}
//           <div className="relative bg-zinc-900 flex items-center justify-center h-56">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
//             <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
//               Isolate
//             </span>
//             <img
//               src="s1.png"
//               alt="Premium Whey Protein Isolated"
//               className="h-40 object-contain relative z-10"
//             />
//           </div>

//           {/* Card Body */}
//           <div className="p-5">
//             <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
//               {" "}
//               Premium Whey Protein Isolated
//             </h2>

//             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
//               Forge Athletics fast-absorbing isolate — low fat, low carb,
//               designed for maximum post-workout muscle recovery. Chocolate Silk,
//               5 lb.
//             </p>

//             <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

//             {/* Footer */}
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
//                   {" "}
//                   Price{" "}
//                 </p>
//                 <p className="text-xl font-medium text-zinc-900 dark:text-white">
//                   {" "}
//                   Rs. 35,000.00{" "}
//                 </p>
//               </div>

//               <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer">
//                 {" "}
//                 <IoMdCart /> Add to cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {/*Card 5*/}

//         <div className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans">
//           {/* Image Area */}
//           <div className="relative bg-zinc-900 flex items-center justify-center h-56">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
//             <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
//               Isolate
//             </span>
//             <img
//               src="s1.png"
//               alt="Premium Whey Protein Isolated"
//               className="h-40 object-contain relative z-10"
//             />
//           </div>

//           {/* Card Body */}
//           <div className="p-5">
//             <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
//               {" "}
//               Premium Whey Protein Isolated
//             </h2>

//             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
//               Forge Athletics fast-absorbing isolate — low fat, low carb,
//               designed for maximum post-workout muscle recovery. Chocolate Silk,
//               5 lb.
//             </p>

//             <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

//             {/* Footer */}
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
//                   {" "}
//                   Price{" "}
//                 </p>
//                 <p className="text-xl font-medium text-zinc-900 dark:text-white">
//                   {" "}
//                   Rs. 35,000.00{" "}
//                 </p>
//               </div>

//               <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer">
//                 {" "}
//                 <IoMdCart /> Add to cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {/*Card 6*/}

//         <div className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans">
//           {/* Image Area */}
//           <div className="relative bg-zinc-900 flex items-center justify-center h-56">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
//             <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
//               Isolate
//             </span>
//             <img
//               src="s1.png"
//               alt="Premium Whey Protein Isolated"
//               className="h-40 object-contain relative z-10"
//             />
//           </div>

//           {/* Card Body */}
//           <div className="p-5">
//             <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
//               {" "}
//               Premium Whey Protein Isolated
//             </h2>

//             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
//               Forge Athletics fast-absorbing isolate — low fat, low carb,
//               designed for maximum post-workout muscle recovery. Chocolate Silk,
//               5 lb.
//             </p>

//             <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

//             {/* Footer */}
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
//                   {" "}
//                   Price{" "}
//                 </p>
//                 <p className="text-xl font-medium text-zinc-900 dark:text-white">
//                   {" "}
//                   Rs. 35,000.00{" "}
//                 </p>
//               </div>

//               <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer">
//                 {" "}
//                 <IoMdCart /> Add to cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {/*Card 7*/}

//         <div className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans">
//           {/* Image Area */}
//           <div className="relative bg-zinc-900 flex items-center justify-center h-56">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
//             <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
//               Isolate
//             </span>
//             <img
//               src="s1.png"
//               alt="Premium Whey Protein Isolated"
//               className="h-40 object-contain relative z-10"
//             />
//           </div>

//           {/* Card Body */}
//           <div className="p-5">
//             <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
//               {" "}
//               Premium Whey Protein Isolated
//             </h2>

//             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
//               Forge Athletics fast-absorbing isolate — low fat, low carb,
//               designed for maximum post-workout muscle recovery. Chocolate Silk,
//               5 lb.
//             </p>

//             <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

//             {/* Footer */}
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
//                   {" "}
//                   Price{" "}
//                 </p>
//                 <p className="text-xl font-medium text-zinc-900 dark:text-white">
//                   {" "}
//                   Rs. 35,000.00{" "}
//                 </p>
//               </div>

//               <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer">
//                 {" "}
//                 <IoMdCart /> Add to cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {/*Card 8*/}

//         <div className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans">
//           {/* Image Area */}
//           <div className="relative bg-zinc-900 flex items-center justify-center h-56">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
//             <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
//               Isolate
//             </span>
//             <img
//               src="s1.png"
//               alt="Premium Whey Protein Isolated"
//               className="h-40 object-contain relative z-10"
//             />
//           </div>

//           {/* Card Body */}
//           <div className="p-5">
//             <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
//               {" "}
//               Premium Whey Protein Isolated
//             </h2>

//             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
//               Forge Athletics fast-absorbing isolate — low fat, low carb,
//               designed for maximum post-workout muscle recovery. Chocolate Silk,
//               5 lb.
//             </p>

//             <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

//             {/* Footer */}
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
//                   {" "}
//                   Price{" "}
//                 </p>
//                 <p className="text-xl font-medium text-zinc-900 dark:text-white">
//                   {" "}
//                   Rs. 35,000.00{" "}
//                 </p>
//               </div>

//               <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer">
//                 {" "}
//                 <IoMdCart /> Add to cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {/*Card 9*/}

//         <div className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans">
//           {/* Image Area */}
//           <div className="relative bg-zinc-900 flex items-center justify-center h-56">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
//             <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
//               Isolate
//             </span>
//             <img
//               src="s1.png"
//               alt="Premium Whey Protein Isolated"
//               className="h-40 object-contain relative z-10"
//             />
//           </div>

//           {/* Card Body */}
//           <div className="p-5">
//             <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
//               {" "}
//               Premium Whey Protein Isolated
//             </h2>

//             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
//               Forge Athletics fast-absorbing isolate — low fat, low carb,
//               designed for maximum post-workout muscle recovery. Chocolate Silk,
//               5 lb.
//             </p>

//             <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

//             {/* Footer */}
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
//                   {" "}
//                   Price{" "}
//                 </p>
//                 <p className="text-xl font-medium text-zinc-900 dark:text-white">
//                   {" "}
//                   Rs. 35,000.00{" "}
//                 </p>
//               </div>

//               <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer">
//                 {" "}
//                 <IoMdCart /> Add to cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {/*Card 10*/}

//         <div className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans">
//           {/* Image Area */}
//           <div className="relative bg-zinc-900 flex items-center justify-center h-56">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
//             <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
//               Isolate
//             </span>
//             <img
//               src="s1.png"
//               alt="Premium Whey Protein Isolated"
//               className="h-40 object-contain relative z-10"
//             />
//           </div>

//           {/* Card Body */}
//           <div className="p-5">
//             <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
//               {" "}
//               Premium Whey Protein Isolated
//             </h2>

//             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
//               Forge Athletics fast-absorbing isolate — low fat, low carb,
//               designed for maximum post-workout muscle recovery. Chocolate Silk,
//               5 lb.
//             </p>

//             <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

//             {/* Footer */}
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
//                   {" "}
//                   Price{" "}
//                 </p>
//                 <p className="text-xl font-medium text-zinc-900 dark:text-white">
//                   {" "}
//                   Rs. 35,000.00{" "}
//                 </p>
//               </div>

//               <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer">
//                 {" "}
//                 <IoMdCart /> Add to cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div>
//         {" "}
//         <Footer />{" "}
//       </div>
//     </div>
//   );
// }
