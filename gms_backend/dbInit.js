import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function initDb(db) {
  console.log("Initializing database tables...");

  const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  };

  try {
    // 1. Users Table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) DEFAULT NULL,
        phone VARCHAR(20) DEFAULT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'MEMBER',
        status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
        profile_picture VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Trainers Table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS trainers (
        trainer_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        specialization VARCHAR(255) DEFAULT NULL,
        bio TEXT DEFAULT NULL,
        experience_years INT DEFAULT 0,
        profile_picture VARCHAR(255) DEFAULT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      )
    `);

    // 3. Admins Table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS admins (
        admin_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        position VARCHAR(255) DEFAULT 'Staff',
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      )
    `);

    // 4. Trainer Applications Table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS trainer_applications (
        application_id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) DEFAULT NULL,
        specialization VARCHAR(255) NOT NULL,
        bio TEXT DEFAULT NULL,
        experience_years INT DEFAULT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reviewed_at TIMESTAMP NULL DEFAULT NULL,
        admin_note TEXT DEFAULT NULL
      )
    `);

    // 5. Products Table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        description TEXT DEFAULT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock_quantity INT DEFAULT 0,
        image_url VARCHAR(255) DEFAULT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'active'
      )
    `);

    // 6. Orders Table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS orders (
        order_id INT AUTO_INCREMENT PRIMARY KEY,
        member_id INT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        order_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
        delivery_address TEXT DEFAULT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (member_id) REFERENCES users(user_id) ON DELETE CASCADE
      )
    `);

    // 7. Order Items Table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS order_items (
        item_id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
      )
    `);

    // 8. Bookings Table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS bookings (
        booking_id INT AUTO_INCREMENT PRIMARY KEY,
        member_id INT NOT NULL,
        trainer_id INT NOT NULL,
        booking_date DATE NOT NULL,
        time_slot VARCHAR(50) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (member_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (trainer_id) REFERENCES trainers(trainer_id) ON DELETE CASCADE
      )
    `);

    console.log("Database tables checked/created successfully.");

    // Seeding default Admin
    const adminCheck = await executeQuery("SELECT * FROM users WHERE email = 'admin@powerzone.com'");
    if (adminCheck.length === 0) {
      console.log("Seeding default admin...");
      const hashedPassword = await bcrypt.hash("admin123", SALT_ROUNDS);
      const userResult = await executeQuery(
        "INSERT INTO users (full_name, email, password, phone, role, status) VALUES (?, ?, ?, ?, ?, ?)",
        ["PowerZone Admin", "admin@powerzone.com", hashedPassword, "0771234567", "ADMIN", "ACTIVE"]
      );
      await executeQuery(
        "INSERT INTO admins (user_id, position) VALUES (?, ?)",
        [userResult.insertId, "General Manager"]
      );
    }

    // Seeding default Trainers
    const trainerCheck = await executeQuery("SELECT * FROM users WHERE role = 'TRAINER'");
    if (trainerCheck.length === 0) {
      console.log("Seeding default trainers...");
      const trainersData = [
        { name: "Mike Davidson", email: "mike@powerzone.com", spec: "strength", exp: 5, bio: "Expert in strength conditioning and powerlifting." },
        { name: "Sara Karunaratne", email: "sara@powerzone.com", spec: "yoga", exp: 4, bio: "Passionate yoga practitioner helping you find balance." },
        { name: "Tom Richards", email: "tom@powerzone.com", spec: "cardio", exp: 6, bio: "Cardio and HIIT training to push you to the limit." }
      ];

      for (const t of trainersData) {
        const passwordHash = await bcrypt.hash("trainer123", SALT_ROUNDS);
        const userResult = await executeQuery(
          "INSERT INTO users (full_name, email, password, phone, role, status) VALUES (?, ?, ?, ?, ?, ?)",
          [t.name, t.email, passwordHash, "0777654321", "TRAINER", "ACTIVE"]
        );
        await executeQuery(
          "INSERT INTO trainers (user_id, specialization, bio, experience_years, profile_picture) VALUES (?, ?, ?, ?, ?)",
          [userResult.insertId, t.spec, t.bio, t.exp, "/uploads/default-trainer.png"]
        );
      }
    }

    // Seeding default products/supplements
    const productCheck = await executeQuery("SELECT COUNT(*) as count FROM products");
    if (productCheck[0].count === 0) {
      console.log("Seeding default supplements...");
      const productsData = [
        ["Gold Standard 100% Whey Protein", "protein", "High quality whey protein for muscle building.", 8999.00, 25, "/s1.png"],
        ["Muscletech NitroTech", "protein", "Advanced muscle building whey protein formula.", 9500.00, 15, "/s2.png"],
        ["C4 Original Pre Workout", "pre-workout", "Explosive energy and focus for intense training.", 6500.00, 30, "/s3.png"],
        ["BCAA Energy", "performance", "Amino acids with energy support for workout fuel.", 5999.00, 20, "/s4.png"],
        ["Mass Gainer", "performance", "High calorie mass builder supplement.", 10500.00, 10, "https://m.media-amazon.com/images/I/71m6Cw7Y6ML.jpg"],
        ["Creatine Monohydrate", "recovery", "Pure creatine monohydrate to improve strength and power.", 4999.00, 40, "https://m.media-amazon.com/images/I/61f+P1H3iLL.jpg"],
        ["Fish Oil Omega 3", "health", "Premium essential fatty acids for cardiovascular and joint health.", 3999.00, 50, "https://m.media-amazon.com/images/I/71J8jQxP2KL.jpg"],
        ["Multivitamin Tablets", "health", "Daily health support with key vitamins and minerals.", 2999.00, 45, "https://m.media-amazon.com/images/I/71d6i6QfAOL.jpg"]
      ];

      for (const p of productsData) {
        await executeQuery(
          "INSERT INTO products (product_name, category, description, price, stock_quantity, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [p[0], p[1], p[2], p[3], p[4], p[5], "active"]
        );
      }
    }

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
