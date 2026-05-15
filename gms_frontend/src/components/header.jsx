import { Link } from 'react-router-dom';

export default function Header() {
    return(
        <div>
        <header className="relative">
            <img src="logo.jpeg" alt="logo" className="absolute w-[80px] h-[80px] items-center" />
            
            <div className="flex gap-5 text-[20px] absolute right-10 top-5 text-center justify-center">
                <Link to="/*" className = "">Home</Link>
                <Link to="/about"> About</Link>
                <Link to="/our_services">Our Services</Link>
                <Link to="/contacts">Contacts</Link>

                <button className="bg-[#FF0000] text-white px-4 py-2 rounded">Sign in</button>
                <button className="bg-[#FF0000] text-white px-4 py-2 rounded">Sign Up</button>                
                
            </div>
            
        </header>
        </div>
    )
}