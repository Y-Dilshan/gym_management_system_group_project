import db from "../config.js";

// Create Order (for members)
export const createOrder = (req, res) => {
  const user_id = req.user.user_id;
  const { product_id, quantity, delivery_address } = req.body;

  const productSql = "SELECT price, stock_quantity FROM products WHERE product_id = ?";

  db.query(productSql, [product_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
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

    // create order
    const orderSql = `INSERT INTO orders (user_id, total_amount, delivery_address) VALUES (?,?,?)`;

    db.query(
      orderSql,
      [user_id, total, delivery_address],
      (err, orderResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: err.message });
        }

        const orderId = orderResult.insertId;

        // insert order items
        const itemSql = `INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES (?,?,?,?,?)`;

        db.query(itemSql, [orderId, product_id, quantity, price, total], (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
          }

          const updateStockSql = `UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ?`;

          db.query(updateStockSql, [quantity, product_id], (err) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ message: err.message });
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

// Get All Orders (for admin)
export const getOrders = (req, res) => {
  const sql = `
    SELECT o.order_id, o.order_date, o.total_amount, o.order_status, o.delivery_address, 
           u.full_name AS customer_name, u.email AS customer_email,
           oi.quantity, oi.unit_price, p.product_name, p.image_url
    FROM orders o
    JOIN users u ON o.user_id = u.user_id
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    ORDER BY o.order_date DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching all orders:", err);
      return res.status(500).json({ message: "Failed to fetch orders" });
    }

    res.status(200).json({ orders: results });
  });
};

// Get My Orders (for member)
export const getMyOrders = (req, res) => {
  const user_id = req.user.user_id;

  const sql = `
    SELECT o.order_id, o.order_date, o.total_amount, o.order_status, o.delivery_address,
           oi.quantity, oi.unit_price, p.product_name, p.image_url
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    WHERE o.user_id = ?
    ORDER BY o.order_date DESC
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching user orders:", err);
      return res.status(500).json({ message: "Failed to fetch your orders" });
    }

    res.status(200).json({ orders: results });
  });
};

// Update Order Status (for admin)
export const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { order_status } = req.body;

  const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  if (!order_status || !validStatuses.includes(order_status.toUpperCase())) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const sql = "UPDATE orders SET order_status = ? WHERE order_id = ?";

  db.query(sql, [order_status.toUpperCase(), id], (err, result) => {
    if (err) {
      console.error("Error updating order status:", err);
      return res.status(500).json({ message: "Failed to update status" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated successfully" });
  });
};

// Delete Order (for admin)
export const deleteOrder = (req, res) => {
  const { id } = req.params;

  // First delete order items
  db.query("DELETE FROM order_items WHERE order_id = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting order items:", err);
      return res.status(500).json({ message: "Failed to delete order items" });
    }

    db.query("DELETE FROM orders WHERE order_id = ?", [id], (err, result) => {
      if (err) {
        console.error("Error deleting order:", err);
        return res.status(500).json({ message: "Failed to delete order" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ message: "Order deleted successfully" });
    });
  });
};