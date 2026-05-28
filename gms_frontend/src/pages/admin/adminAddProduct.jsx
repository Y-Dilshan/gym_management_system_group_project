export default function AdminAddProduct() {

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-6">
            
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-10">
                
                <h1 className="text-4xl font-bold mb-8 text-center">Add New Product</h1>

                <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Product Name */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName"> Product Name </label>
                        <input id="productName" type="text" placeholder="Enter product name" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    {/* Product Description */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">Product Description</label>

                        <input id="productDescription" type="text" placeholder="Enter product description" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    {/* Product Price */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">Product Price</label>

                        <input id="productPrice" type="number" placeholder="Enter product price" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    {/* Labeled Price */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="labeledPrice"> Labeled Price </label>

                        <input id="labeledPrice" type="number" placeholder="Enter labeled price" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-center mt-4">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-xl transition duration-300"> Add Product </button>
                    </div>

                </form>

            </div>

        </div>
    );
}