import { Link } from 'react-router-dom';
import { GoSignIn } from "react-icons/go";
import { SlUserFollowing } from "react-icons/sl";

export default function Header() {
    return(
        <nav className="bg-[#333333] h-[90px] px-[100px]">
            <div className="flex items-center justify-between h-full">
                <div>
                    <img src="logo.jpeg" alt="logo" className="w-[90px] h-[90px]"/>
                </div>
                <div className="flex items-center gap-10 text-xl text-white">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/our_services">Our Services</Link>
                    <Link to="/contacts">Contacts</Link>
                </div>

                <div className="flex gap-5">
                    <button className="bg-[#333333] text-white px-4 py-2 rounded w-[150px] h-[35px] flex items-center justify-center gap-2 text-[16px] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition duration-300">
                        Sign in <GoSignIn />
                    </button>

                    <button className="bg-[#D4AF37] text-white px-4 py-2 rounded w-[150px] h-[35px] text-[16px] flex items-center justify-center gap-2 hover:bg-[#333333] hover:text-white transition duration-300">
                        Sign Up <SlUserFollowing />
                    </button>
                </div>
            </div>

        </nav>
    )
}