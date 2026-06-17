import { Link, useNavigate } from 'react-router-dom';
import { GoSignIn } from "react-icons/go";
import { SlUserFollowing } from "react-icons/sl";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from 'react';

export default function Header() {

    const [showOption, setShowOption] = useState(false);

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('dashboard');
    }

    return(
        <nav className="bg-black h-[100px] px-[100px] shadow-2xl shadow-[#333333] border-b-1 border-white">
            <div className="flex items-center justify-between h-full">
                <div className = "flex text-white">
                    <img src="logo.png" alt="logo" className="w-[100px] h-[100px]"/>
                    <p>Power <span>Zone</span> </p>
                </div>
                <div className="flex items-center gap-10 text-xl text-white">
                    <a className = "hover:text-[#d4a017]" href="/">Home</a>
                    <a className = "hover:text-[#d4a017]" href="/about">About</a>
                    <a className = "hover:text-[#d4a017]" href="/our_services">Our Services</a>
                    <a className = "hover:text-[#d4a017]" href="/contacts">Contacts</a>
                </div>
 
               <div className = "flex items-center justify-center gap-10">
                <button className = "cursor-pointer"><FaCartShopping size = {40} className = "text-white" /></button>
                <div>
                    <button onClick = {() => setShowOption (!showOption)} className = "w-[80px] h-[80px] rounded-full bg-white cursor-pointer"></button>
                    
                    {showOption && (
                        <div>
                            <button onClick = {handleEdit} ></button>
                            <button  >log Out</button>
                        </div>
                    )}
                </div>
               </div>
            </div>
        </nav>
    )
}