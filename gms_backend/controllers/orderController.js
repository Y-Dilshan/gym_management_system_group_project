import db from "../config.js";


export const createOrder = (req, res) => {
    const {user_id, product_id, quantity, delivery_address} = req.body;


//Get product price

const productSql = "SELECT price FROM products WHERE product_id = ?";

db.query(productSql, [product_id], (err, result) =>{
    if(err) {
        return res.status(500).json({err});
    }

    if(result.length === 0){
        return res.status(404).json({message: "Product not found"});
    }

    const price = result[0].price;
    const total = price * quantity;


    //create order
    const orderSql = `INSERT INTO orders (user_id, total_amount, delivery_address) VALUES (?,?,?)`;

    db.query(orderSql, [user_id, total, delivery_address], (err, orderResult) => {
        if(err) {
            return res.status(500).json(err);
        }

        const orderId = orderResult.insertId;

        //insert order items

        const itemSql = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)`;
    

    db.query(itemSql,[orderId, product_id, quantity, price], (err) => {
        if(err) {
            return res.status(500).json(err);
        }

        res.json({message: "Order created successfully", 
            order_id: orderId
        });
                }
            );
        });
    });
};