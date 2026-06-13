import { Link, useNavigate } from 'react-router-dom';
import { GoSignIn } from "react-icons/go";
import { SlUserFollowing } from "react-icons/sl";
import { FaCartShopping } from "react-icons/fa6";

export default function Header() {

    const navigate = useNavigate();

    const handleSignin = () => {
        navigate('/signin');
    }

    const handleSignUp = () => {
        navigate('/signup');
    }
    return(
        <nav className="bg-black h-[100px] px-[100px] shadow-2xl shadow-[#333333] border-b-1 border-white">
            <div className="flex items-center justify-between h-full">
                <div>
                    <img src="logo.png" alt="logo" className="w-[100px] h-[100px]"/>
                </div>
                <div className="flex items-center gap-10 text-xl text-white">
                    <a className = "hover:text-[#d4a017]" href="/">Home</a>
                    <a className = "hover:text-[#d4a017]" href="/about">About</a>
                    <a className = "hover:text-[#d4a017]" href="/our_services">Our Services</a>
                    <a className = "hover:text-[#d4a017]" href="/contacts">Contacts</a>
                </div>
 
               <div className = "flex items-center justify-center gap-10">
                <button className = "cursor-pointer"><FaCartShopping size = {40} className = "text-white" /></button>
                <div className = "w-[80px] h-[80px] rounded-full bg-white"></div>
               </div>
            </div>

        </nav>
    )
}