export default function DeleteForm(){
    return(
       <div className="w-[450px] bg-white rounded-3xl shadow-2xl p-8 relative">
    
    {/* Close Button */}
    <button
        className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold transition duration-300"
    >
        &times;
    </button>

    <h2 className="text-2xl font-bold text-center text-gray-800">
        Delete Product
    </h2>

    <p className="text-center text-gray-500 mt-4">
        Are you sure you want to delete this product?
        This action cannot be undone.
    </p>

    <div className="flex justify-center items-center gap-8 mt-10">
        <button
            className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow-md hover:bg-gray-300 transition duration-300"
        >
            Cancel
        </button>

        <button
            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition duration-300"
        >
            Delete
        </button>
    </div>
</div>
    )
}