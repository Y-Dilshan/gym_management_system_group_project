import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import {useNavigate} from "react-router-dom"


export default function SigninPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
  };

  

  return (
    <div className = "bg-[url('login_page.jpg')] w-full h-screen flex justify-center items-center">
       <div className="w-[500px] h-[500px] bg-[#333333] shadow-2xl shadow-gray-600 pt-10 relative rounded-xl w-[400px]">
    
        {/* Back Button */}
            <button className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition duration-300 absolute left-10 top-10">
                <GoArrowLeft className="text-[20px]" />
                <span onClick = {handleBack}>Back</span>
            </button>

        {/* Title */}
            <h1 className="text-[32px] text-[#D4AF37] text-center font-semibold">
            Sign In
            </h1>
            
            <div className="flex flex-col items-center pt-[20px]">

                <div className="w-[400px] flex flex-col"> 
                    <label className="text-white mb-2 text-[16px]"> Email </label>
                    <input type="email" placeholder="Enter your email" className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                    </div>

    
                <div className="w-[400px] flex flex-col pt-[20px]">
                    <label className="text-white mb-2 text-[16px]"> Password </label>
                    <input type="email" placeholder="Enter your password" className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]"/>
                </div>
            </div>

            <div className = "text-white text-center text-[20px] pt-[30px]">
                <button className = " border border-[#D4AF37] border-[2px] w-[400px] h-[40px] rounded-2xl bg-[#D4AF37] hover:bg-[#333333] hover:outline-[#333333] hover:text-black">Sign in</button>
            </div>

            <div className = "pt-[30px] flex pl-[50px] text-white gap-2">
                <span>You already haven’t an account?</span> 
                <button onClick = {handleSignup}>Sign Up</button>
            </div>

            <div className = "pt-[30px] flex pl-[50px] text-white gap-2 justify-end pr-[50px]">
                <span>Forgot Password?</span> 
                <button>Reset here</button>
            </div>

        </div>
    </div>
    
  );
}