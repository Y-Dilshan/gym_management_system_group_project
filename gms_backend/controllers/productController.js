const db = require('../config.js');

export const createProduct = (req, res) =>{
    const {product_id, product_name, category, description, price, stock_quantity, image_url, status} = req.body;
    
    if(!product_name || !category || !price){
        return res.json({
            message : "Missing required fields"
        })
    } else {
        const sql = 'INSERT INTO products (product_id, product_name, category, description, price, stock_quantity, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [product_id, product_name, category, description, price, stock_quantity, image_url, status], (err, result) => {
            if(err){
                return res.json({
                    message : "Failed to create product"
                });
            } else{
                return res.json({
                    message : "Product created successfully",
                    productId : result.insertId
                })
            }
        });
    }

    if(user.role !== 'admin'){
        return re.json({
            message : "Only admins can create products"
        })
    } else {
        return res.json({
            message : "Product created successfully"
        })
    }
}

export const getProducts = (req, res) =>{
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results)=>{
        if(err){
            res.json({
                message : "Failed to found products"
            })
        } else{
            res.json({
                message : "Products found successfully",
                products : results
            })
        } 
    })
}

export const getProductById = (req, res) =>{
    const id = req.params.id;
    const sql = 'SELECT * FROM products WHERE product_id = ?';
    db.query(sql, [id], (err, results) =>{
        if(err){
            return res.json({
                message : 'Failed to found product'
            }) 
        } else if(results.length == 0){
            return res.json({
                message : 'Product not found'
            })
        } else {
            return res.json({
                message : 'Product found successfully',
                product : results[0]
            })
        }
    })
}

const updateProduct = (req, res) =>{
    const id =req.params.id;
    const sql = 'UPDATE products SET? WHERE product_id = ?';
    db.query(sql, [req.body, id], (err, results) => {
        if(err){
            return res.json({
                message : "Failed to update product"
            })
        } else if(results.affectedRows == 0){
            return res.json({
                message : "Product not found"
            })
        } else {
            return res.json({
                message : "Product updated successfully"
            })
        }
    })

    if(user.role !== 'admin'){
        return res.json({
            message : "Only admins can update products"
        })
    } else {
        return res.json({
            message : "Product updated successfully"
        })
    }
}

export const deleteProduct = (req, res) =>{
    const id = req.params.id;
    const sql = 'DELETE FROM products WHERE product_id = ?';        
    db.query(sql, [id], (err, results) =>{
        if(err){
            return res.json({
                message : "Failed to delete product"
            })
        } else if(results.affectedRows == 0){
            return res.json({
                message : "Product not found"
            })
        } else {
            return res.json({
                message : "Product deleted successfully"
            })
        }
    })

    if(user.role !== 'admin'){
        return res.json({
            message : "Only admins can delete products"
        })
    } else {
        return res.json({
            message : "Product deleted successfully"
        })
     }
}
