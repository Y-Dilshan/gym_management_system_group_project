import db from "../config.js";
import nodemailer from "nodemailer";

// Create Order (for members)
export const createOrder = (req, res) => {
  const user_id = req.user.user_id;
  const { product_id, quantity, delivery_address, items } = req.body;

  if (items && Array.isArray(items) && items.length > 0) {
    // Bulk checkout from cart
    const productIds = items.map(item => item.product_id);
    const placeholders = productIds.map(() => "?").join(",");
    const productSql = `SELECT product_id, price, stock_quantity, product_name FROM products WHERE product_id IN (${placeholders})`;

    db.query(productSql, productIds, (err, products) => {
      if (err) {
        console.error("Error fetching products for bulk order:", err);
        return res.status(500).json({ message: err.message });
      }

      let total = 0;
      const productMap = {};
      products.forEach(p => {
        productMap[p.product_id] = p;
      });

      for (const item of items) {
        const prod = productMap[item.product_id];
        if (!prod) {
          return res.status(404).json({ message: `Product ID ${item.product_id} not found` });
        }
        if (item.quantity > prod.stock_quantity) {
          return res.status(400).json({ message: `Not enough stock available for ${prod.product_name}` });
        }
        total += prod.price * item.quantity;
      }

      // Create order
      const orderSql = `INSERT INTO orders (user_id, total_amount, delivery_address) VALUES (?,?,?)`;
      db.query(orderSql, [user_id, total, delivery_address], (err, orderResult) => {
        if (err) {
          console.error("Error creating order:", err);
          return res.status(500).json({ message: err.message });
        }

        const orderId = orderResult.insertId;

        // Insert order items
        const itemInsertPromises = items.map(item => {
          const prod = productMap[item.product_id];
          const subtotal = prod.price * item.quantity;
          return new Promise((resolve, reject) => {
            const itemSql = `INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES (?,?,?,?,?)`;
            db.query(itemSql, [orderId, item.product_id, item.quantity, prod.price, subtotal], (err) => {
              if (err) reject(err);
              else {
                const updateStockSql = `UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ?`;
                db.query(updateStockSql, [item.quantity, item.product_id], (err) => {
                  if (err) reject(err);
                  else resolve();
                });
              }
            });
          });
        });

        Promise.all(itemInsertPromises)
          .then(() => {
            res.json({
              message: "Order created successfully",
              order_id: orderId,
            });
          })
          .catch(itemErr => {
            console.error("Error inserting order items:", itemErr);
            res.status(500).json({ message: itemErr.message });
          });
      });
    });
    return;
  }

  // Single Product fallback
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
  const newStatus = order_status ? order_status.toUpperCase() : '';

  if (!newStatus || !validStatuses.includes(newStatus)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const sql = "UPDATE orders SET order_status = ? WHERE order_id = ?";

  db.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      console.error("Error updating order status:", err);
      return res.status(500).json({ message: "Failed to update status" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Automatically send Email when status is changed to DELIVERED
    if (newStatus === "DELIVERED") {
      const getCustomerSql = `
        SELECT o.order_id, o.total_amount, o.delivery_address, u.email, u.full_name
        FROM orders o
        JOIN users u ON o.user_id = u.user_id
        WHERE o.order_id = ?
      `;

      db.query(getCustomerSql, [id], async (fetchErr, customerResults) => {
        if (!fetchErr && customerResults.length > 0) {
          const customer = customerResults[0];

          try {
            const transporter = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
              },
            });

            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: customer.email,
              subject: `📦 Order Delivered! - Power Zone Gym (Order #${customer.order_id})`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; rounded: 10px;">
                  <h2 style="color: #D4AF37;">Great news, ${customer.full_name}! 🎉</h2>
                  <p>Your order <strong>#${customer.order_id}</strong> has been successfully <strong>DELIVERED</strong>.</p>
                  
                  <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Order ID:</strong> #${customer.order_id}</p>
                    <p style="margin: 5px 0;"><strong>Total Amount:</strong> Rs. ${Number(customer.total_amount).toLocaleString()}</p>
                    <p style="margin: 5px 0;"><strong>Delivery Address:</strong> ${customer.delivery_address || 'Provided Address'}</p>
                  </div>
                  
                  <p>Thank you for shopping with <strong>Power Zone Gym</strong>!</p>
                  <p style="font-size: 12px; color: #888;">If you have any questions regarding your order, please feel free to reach out.</p>
                </div>
              `,
            };

            await transporter.sendMail(mailOptions);
            console.log(`Delivery email successfully sent to ${customer.email}`);
          } catch (emailErr) {
            console.error("Error sending delivery notification email:", emailErr);
          }
        }
      });
    }

    res.status(200).json({ message: `Order status updated to ${newStatus} successfully` });
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