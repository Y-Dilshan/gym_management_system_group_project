import user from '../models/user.js';
import bcrypt from 'bcrypt';

export function createUser(req, rs){
    if(req.user == null){
        res.json({
            message : "Can not find user please try again!"
        })
    }
    if(req.user.role != "admin"){
        res.json({
            message : "Only admin can create user!"
        })
    }
    const data = req.body;

    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const user = new User({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
        role : data.role
    });

    user.save().then(
        ()=>{
            return res.json({
                message : "User saved successfully"
            });
        }
    );
}

async function loginUser(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const users = await User.find({email : email});

    if(users[0] == null){
        return res.json({
            message : "User not found"
        });
    } else {
        const user = users[0]; 

        const isPasswordCorrect = await bcrypt.compare(password, user.password); // ✅ fixed

        if(isPasswordCorrect){

            const payload = {
                email : user.email,
                firstName : user.firstName,
                lastName : user.lastName,
                role : user.role,
                isEmailVerified : user.isEmailVerified,
                image : user.image
            };

            const token = jwt.sign(payload, "secretKey96$2025", { expiresIn: "2h" });

            return res.json({
                message : "Login successful",
                token : token
            });

        } else {
            return res.json({
                message : "Incorrect password"
            });
        }
    }
}

export { createUser, loginUser };

export function isAdmin(req){
    if(req.user == null){
        return false;
    }
    if(req.user.role != "admin"){
        return false;
    }
    
    return true;    
}