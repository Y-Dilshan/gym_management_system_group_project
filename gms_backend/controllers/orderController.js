import db from "../config.js";

export const createOrder = (req, res) => {
  const user_id = req.user.user_id;
  const { product_id, quantity, delivery_address } = req.body;
  //Get product price

  const productSql = "SELECT price FROM products WHERE product_id = ?";

  db.query(productSql, [product_id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const price = result[0].price;
    const stock = result[0].stock_quantity;
    const total = price * quantity;

    if (quantity > stock) {
      return res.status(400).json({ message: "Not enough stock available" });
    }
    //create order
    const orderSql = `INSERT INTO orders (user_id, total_amount, delivery_address) VALUES (?,?,?)`;

    db.query(
      orderSql,
      [user_id, total, delivery_address],
      (err, orderResult) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: err.message,
          });
        }

        const orderId = orderResult.insertId;

        //insert order items

        const itemSql = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)`;

        db.query(itemSql, [orderId, product_id, quantity, price], (err) => {
          if (err) {
            console.log(err);

            return res.status(500).json({
              message: err.message,
            });
          }

        const updateStockSql = `UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ?`;

          db.query(updateStockSql, [quantity, product_id], (err) => {
            if (err) {
              console.log(err);

              return res.status(500).json({
                message: err.message,
              });
            }

            res.json({
              message: "Order created successfully",
              order_id: orderId,
            });
          });
        });
      },
    );
  });
};