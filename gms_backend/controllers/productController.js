import db from "../config.js";

const isAdmin = (user) => user && user.role.toLowerCase() === "admin";
const VALID_CATEGORIES = [
  "protein",
  "pre-workout",
  "health",
  "performance",
  "recovery"
];

// create product
export const createProduct = (req, res) => {
  const user = req.user;

  if (!isAdmin(user)) {
    return res.status(403).json({ message: "Only admins can create products" });
  }

  const {product_name,category,description,price,stock_quantity,image_url,status} = req.body;

  if (!product_name || !category || !price) {
    return res.status(400).json({
      message: "Missing required fields: product_name, category, price",
    });
  }

  if (!VALID_CATEGORIES.includes(category.toLowerCase())) {
    return res.status(400).json({
      message: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}`,
    });
  }

  const sql = "INSERT INTO products (product_name, category, description, price, stock_quantity, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const params = [product_name, category.toLowerCase(), description, price, stock_quantity, image_url, status || "active"];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error creating product:", err);
      if (err.code === "ER_DATA_TOO_LONG" || err.message?.includes("too long")) {
        db.query("ALTER TABLE products MODIFY COLUMN image_url LONGTEXT", () => {
          db.query(sql, params, (retryErr, retryResult) => {
            if (retryErr) {
              console.error("Error retrying create product:", retryErr);
              return res.status(500).json({ message: retryErr.message || "Failed to create product" });
            }
            return res.status(201).json({
              message: "Product created successfully",
              productId: retryResult.insertId,
            });
          });
        });
        return;
      }
      return res.status(500).json({ message: err.message || "Failed to create product" });
    }
    return res.status(201).json({
      message: "Product created successfully",
      productId: result.insertId,
    });
  });
};

export const getProducts = (req, res) => {
  const { category } = req.query;

  let sql = "SELECT * FROM products";
  let params = [];

  if (category && category !== "all") {
    if (!VALID_CATEGORIES.includes(category.toLowerCase())) {
      return res.status(400).json({
        message: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}`,
      });
    }
    sql = "SELECT * FROM products WHERE category = ?";
    params = [category.toLowerCase()];
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ message: "Failed to fetch products" });
    }
    return res.status(200).json({
      message: "Products fetched successfully",
      count: results.length,
      products: results,
    });
  });
};

export const getProductById = (req, res) => {
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const sql = "SELECT * FROM products WHERE product_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ message: "Failed to fetch product" });
    } else if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      message: "Product found successfully",
      product: results[0],
    });
  });
};

export const updateProduct = (req, res) => {
  const user = req.user;

  if (!isAdmin(user)) {
    return res.status(403).json({ message: "Only admins can update products" });
  }

  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (
    req.body.category &&
    !VALID_CATEGORIES.includes(req.body.category.toLowerCase())
  ) {
    return res.status(400).json({
      message: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}`,
    });
  }

  if (req.body.category) {
    req.body.category = req.body.category.toLowerCase();
  }

  const sql = "UPDATE products SET ? WHERE product_id = ?";
  db.query(sql, [req.body, id], (err, results) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ message: "Failed to update product" });
    } else if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product updated successfully" });
  });
};

// export const deleteProduct = (req, res) => {
//   const user = req.user;

//   if (!isAdmin(user)) {
//     return res.status(403).json({ message: "Only admins can delete products" });
//   }

//   const id = req.params.id;

//   if (!id || isNaN(id)) {
//     return res.status(400).json({ message: "Invalid product ID" });
//   }

//   const sql = "DELETE FROM products WHERE product_id = ?";
//   db.query(sql, [id], (err, results) => {
//     if (err) {
//       console.error("Error deleting product:", err);
//       return res.status(500).json({ message: "Failed to delete product" });
//     } else if (results.affectedRows === 0) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     return res.status(200).json({ message: "Product deleted successfully" });
//   });
// };
export const deleteProduct = (req, res) => {
  const user = req.user;

  if (!isAdmin(user)) {
    return res.status(403).json({ message: "Only admins can delete products" });
  }

  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  // Attempt hard delete first
  const deleteSql = "DELETE FROM products WHERE product_id = ?";
  db.query(deleteSql, [id], (err, results) => {
    if (err) {
      console.error("Error deleting product:", err);

      // If product is linked to customer orders (Foreign key error ER_ROW_IS_REFERENCED_2),
      // perform a Soft Delete (mark status as 'inactive') instead of failing.
      if (err.code === "ER_ROW_IS_REFERENCED_2" || err.message?.includes("foreign key constraint")) {
        const softDeleteSql = "UPDATE products SET status = 'inactive' WHERE product_id = ?";
        db.query(softDeleteSql, [id], (softErr) => {
          if (softErr) {
            return res.status(500).json({ message: "Failed to deactivate product" });
          }
          return res.status(200).json({ message: "Product deactivated (marked inactive due to existing order history)" });
        });
        return;
      }

      return res.status(500).json({ message: err.message || "Failed to delete product" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  });
};

