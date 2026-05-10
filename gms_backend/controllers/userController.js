import db from '../config.js';

const createUser = (req, res) => {
    const {user_id, full_name, email, password, phone, role, status, profile_picture, created_at} = req.body; 
    
    // Add validation
    if (!full_name || !email || !password) {
        return res.status(400).json({error: 'Missing required fields'});
    }
    
    const sql = 'INSERT INTO users (user_id, full_name, email, password, phone, role, status, profile_picture, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [user_id, full_name, email, password, phone, role, status, profile_picture, created_at], (err, result) => {
        if(err){
            console.error('Error creating user: ', err);
            res.status(500).json({error: 'Failed to create user'});
        } else {
            res.status(201).json({message: 'User created successfully', userId: result.insertId});
        }
    });
};

export default createUser;