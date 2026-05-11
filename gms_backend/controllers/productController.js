import db from '../config.js';

export const createProduct = (req, res) => {
    // Add user role check FIRST (assuming user is attached via auth middleware)
    const user = req.user; // You need authentication middleware
    
    if (!user || user.role !== 'admin') {
        return res.status(403).json({
            message: "Only admins can create products"
        });
    }
    
    const {product_id, product_name, category, description, price, stock_quantity, image_url, status} = req.body;
    
    if(!product_name || !category || !price){
        return res.status(400).json({
            message: "Missing required fields"
        });
    }
    
    const sql = 'INSERT INTO products (product_id, product_name, category, description, price, stock_quantity, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [product_id, product_name, category, description, price, stock_quantity, image_url, status], (err, result) => {
        if(err){
            console.error('Error creating product:', err);
            return res.status(500).json({
                message: "Failed to create product"
            });
        } else{
            return res.status(201).json({
                message: "Product created successfully",
                productId: result.insertId
            });
        }
    });
}

export const getProducts = (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results)=>{
        if(err){
            console.error('Error fetching products:', err);
            res.status(500).json({
                message: "Failed to fetch products"
            });
        } else{
            res.status(200).json({
                message: "Products fetched successfully",
                products: results
            });
        } 
    });
}

export const getProductById = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM products WHERE product_id = ?';
    db.query(sql, [id], (err, results) =>{
        if(err){
            console.error('Error fetching product:', err);
            return res.status(500).json({
                message: 'Failed to fetch product'
            }); 
        } else if(results.length == 0){
            return res.status(404).json({
                message: 'Product not found'
            });
        } else {
            return res.status(200).json({
                message: 'Product found successfully',
                product: results[0]
            });
        }
    });
}

export const updateProduct = (req, res) => {
    const user = req.user; // Get from auth middleware
    
    if (!user || user.role !== 'admin') {
        return res.status(403).json({
            message: "Only admins can update products"
        });
    }
    
    const id = req.params.id;
    const sql = 'UPDATE products SET ? WHERE product_id = ?';
    db.query(sql, [req.body, id], (err, results) => {
        if(err){
            console.error('Error updating product:', err);
            return res.status(500).json({
                message: "Failed to update product"
            });
        } else if(results.affectedRows == 0){
            return res.status(404).json({
                message: "Product not found"
            });
        } else {
            return res.status(200).json({
                message: "Product updated successfully"
            });
        }
    });
}

export const deleteProduct = (req, res) => {
    const user = req.user; // Get from auth middleware
    
    if (!user || user.role !== 'admin') {
        return res.status(403).json({
            message: "Only admins can delete products"
        });
    }
    
    const id = req.params.id;
    const sql = 'DELETE FROM products WHERE product_id = ?';        
    db.query(sql, [id], (err, results) =>{
        if(err){
            console.error('Error deleting product:', err);
            return res.status(500).json({
                message: "Failed to delete product"
            });
        } else if(results.affectedRows == 0){
            return res.status(404).json({
                message: "Product not found"
            });
        } else {
            return res.status(200).json({
                message: "Product deleted successfully"
            });
        }
    });
}