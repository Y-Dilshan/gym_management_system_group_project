import db from '../config.js';

const userSchema = new db.Schema({
    firstName :{
        type : String,
        required : true 
    },

    lastName :{
        type : String,
        required : true 
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    role : {
        type : String,
        default : 'user'
    },

    isBlocked : {
        type : Boolean,
        default : false
    },
    isEmailVerified : {
        type : Boolean,
        default : false
    },
    image : {
        type : String,
        required : true,
        default : "default.jpg"
    },

    phoneNumber : {
        type : String,
        required : true
    }
});

const User = db.model('User', userSchema);

export default User;