import db from '../config.js';

export const createUser = (req, res) => {
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

export const getUsers = (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users: ', err);
            res.status(500).json({error: 'Failed to fetch users'});
        } else {
            res.status(200).json({users: results});
        }
    });
};

export const getUserById = (req, res) => { 
    const {id} = req.params;
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching user: ', err);
            res.status(500).json({error: 'Failed to fetch user'});
        } else if (results.length === 0) {
            res.status(404).json({error: 'User not found'});
        } else {
            res.status(200).json({user: results[0]});
        }   
    });
}

export const updateUser = (req, res) => {
    const {id} = req.params;
    const {full_name, email, password, phone, role, status, profile_picture} = req.body;
    const sql = 'UPDATE users SET full_name = ?, email = ?, password = ?, phone = ?, role = ?, status = ?, profile_picture = ? WHERE user_id = ?';
    db.query(sql, [full_name, email, password, phone, role, status, profile_picture, id], (err, result) => {
        if (err) {
            console.error('Error updating user: ', err);
            res.status(500).json({error: 'Failed to update user'});
        } else if (result.affectedRows === 0) {
            res.status(404).json({error: 'User not found'});
        } else {
            res.status(200).json({message: 'User updated successfully'});
        }
    });
}   

export const deleteUser = (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM users WHERE user_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting user: ', err);        
            res.status(500).json({error: 'Failed to delete user'});
        } else if (result.affectedRows === 0) { 
            res.status(404).json({error: 'User not found'});
        }else {
            res.status(200).json({message: 'User deleted successfully'});
        }
    });
}
