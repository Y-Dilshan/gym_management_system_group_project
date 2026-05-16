// import Header from "../components/Header.jsx";
import Header from "../components/header.jsx";

export default function HomePage() {
    return(
        <div className=" bg-[#333333]">
            <Header />

            {/*home*/}
            <div className = "w-full px-[100px]">
                    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                    <img src="homepage.jpg" alt="homepage" className="w-[1320px] h-[650px] blur-sm object-cover"/>
                </div>
            <div>
                <h1 className = "text-4xl font-bold text-center text-[#D4AF37] pt-[50px]">Unleash Your Potential</h1>
                <p className = "text-center text-lg text-white mt-4 px-4 max-w-[800px] mx-auto">
                    Join the ultimate fitness experience designed to build strength, improve endurance, and boost your confidence through expert guidance and modern training methods.
                </p>

            <div className = "flex items-center justify-center py-[50px]">
                <button className="bg-[#333333] text-white  rounded w-[150px] h-[35px] flex items-center justify-center gap-2 text-[20px] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition duration-300 font-bold">Get Started </button>
            </div>
              
            </div>
            </div>

            {/*about*/} 
            <div >
                    <h1 className = "text-4xl font-bold text-center text-[#D4AF37] py-[50px]">About Us</h1>
                <div className = "flex items-center justify-center mt-[30px] gap-10">

                    <p className = "text-center text-lg text-white mt-4 px-4 max-w-[800px] ml-[100px]">
                        Welcome to our fitness gym, where we help people of all levels achieve their health and fitness goals. With modern equipment, expert trainers, and personalized programs, we create a supportive and motivating environment for everyone.

                        We believe fitness is more than just exercise it’s about building confidence, discipline, and a healthier lifestyle. Join us and start your journey toward a stronger, better you.
                    </p>

                <img src = "about.jpg " alt = "about us" className="w-[480px] h-[280px] object-cover mt-[30px] mr-[100px]"/>
            </div>
            </div>

            {/*Our Services*/} 
            <div>
                <h1 className = "text-4xl font-bold text-center text-[#D4AF37] py-[50px]">Our Services</h1>
            </div>


           <div className="px-[100px] py-[50px]">

           <div className="grid grid-cols-3 gap-4 ">
               <div className="p-6 flex items-center justify-center shadow  shadow-2xl shadow-black bg-[#E7DBB8] rounded-[15px] flex flex-col text-center">
                <h3 className = "text-black text-bold text-2xl">Schedules</h3>
                <p className = "py-[10px]">Flexible workout schedules designed to fit your daily routine and keep you consistent.</p>
               </div>

               <div className="p-6 flex items-center justify-center shadow shadow-2xl shadow-black bg-[#E7DBB8] rounded-[15px] flex flex-col text-center">
                <h3 className = "text-black text-bold text-2xl">Trainers</h3>
                <p className = "py-[10px]">Certified and experienced trainers who guide and motivate you to reach your fitness goals.</p>
               </div>

               <div className="p-6 flex items-center justify-center shadow shadow-2xl shadow-black bg-[#E7DBB8] rounded-[15px] flex flex-col text-center">
                <h3 className = "text-black text-bold text-2xl">Supplements</h3>
                <p className = "py-[10px]">High-quality supplements to support performance, recovery, and overall health.</p>
               </div>

               <div className="p-6 flex items-center justify-center shadow shadow-2xl shadow-black bg-[#E7DBB8] rounded-[15px] flex flex-col text-center">
                <h3 className = "text-black text-bold text-2xl">Diet Plans</h3>
                <p className = "py-[10px]">Customized diet plans to help you maintain a balanced and healthy lifestyle.</p>
               </div>

               <div className="p-6 flex items-center justify-center shadow shadow-2xl shadow-black bg-[#E7DBB8] rounded-[15px] flex flex-col text-center">
                <h3 className = "text-black text-bold text-2xl">Personal Training</h3>
                <p className = "py-[10px]">One-on-one training sessions tailored to your specific fitness needs and goals.</p>
               </div>

               <div className="p-6 flex items-center justify-center shadow shadow-2xl shadow-black bg-[#E7DBB8] rounded-[15px] flex flex-col text-center">
                <h3 className = "text-black text-bold text-2xl">Modern gym equipment</h3>
                <p className = "py-[10px]">State-of-the-art gym equipment for effective and safe workouts.</p>
               </div>
           </div>

        </div>


        {/*Contact Us*/} 
        <div>
            <div>
                <h1 className = "text-4xl font-bold text-center text-[#D4AF37] py-[50px]">Contact Us</h1>
            </div>

            <div className = "flex justify-center pt-[20px]">
                <input type="text" placeholder="Enter your email" className = "w-[800px] h-[50px] bg-white items-center justify-center rounded-[15px] pl-[20px]" />
            </div>

            <div className = "flex justify-center pt-[20px]">
                <input type="text" placeholder="Enter your name" className = "w-[800px] h-[50px] bg-white items-center justify-center rounded-[15px] pl-[20px]" />
            </div>

            <div className = "flex justify-center pt-[20px]">
                <textarea type="text" placeholder="Message" className = "w-[800px] h-[150px] bg-white items-center justify-center rounded-[15px] pl-[20px]" />
            </div>

             <div className = " flex justify-center pt-[20px]">
                <button className="flex items-center justify-center gap-2 border text-white text-2xl border-[#D4AF37] border-[2px] w-[800px] h-[50px] rounded-2xl hover:bg-[#D4AF37] hover:text-black">Submit</button>
            </div>
        </div>

        {/*BMI*/} 

        <div>
            <div>
                <h1 className = "text-4xl font-bold text-center text-[#D4AF37] py-[50px]">Calculate Your BMI</h1>
            </div>


            {/*Left side */}
            <div className="flex items-center justify-center">
                <div className="w-[800px] h-[600px] bg-white flex">

                    <div className = "w-[400px]">
                        <img src = "bmi.jpg" />
                    </div>

                    {/*Right side */}
                    <div className = "w-[400px] bg-[#1F1F1F] flex flex-col">
                        <h1 className = "text-[25px] text-[#D4AF37] text-center text-bold pt-[20px]">BMI calculator</h1>

                        <div className = "flex items-center pl-[20px]  gap-4 pt-[20px]">
                        <label className = "text-white pl-[20px] ">Age :</label>
                        <input className = "w-[200px] h-[30px] bg-[#E7DBB8] rounded-[15px]" />
                        </div>

                        <div className = "flex items-center pl-[20px]  gap-4 pt-[20px]">
                        <label className = "text-white pl-[20px]">Height :</label>
                        <input className = "w-[200px] h-[30px] bg-[#E7DBB8] rounded-[15px]" />
                        <label className = "text-white">Cm</label>
                        </div>

                        <div className = "flex items-center pl-[20px]  gap-4 pt-[20px]">
                        <label className = "text-white pl-[20px]">Weight :</label>
                        <input className = "w-[200px] h-[30px] bg-[#E7DBB8] rounded-[15px]" />
                        <label className = "text-white">kg</label>
                        </div>

                        <div className="flex items-center pl-[20px]  gap-4 pt-[20px]">
                            <label className = "text-white pl-[20px]"> Gender </label>

                            <select className="w-[200px] h-[30px] px-4 rounded-2xl bg-[#E7DBB8] outline-none border-2 border-transparent focus:border-[#D4AF37] text-black shadow-md">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className = "text-white text-center text-[20px] pt-[30px]">
                            <button className = " border border-[#D4AF37] border-[2px] w-[300px] h-[40px] rounded-2xl text-black bg-[#D4AF37] hover:bg-[#333333] hover:outline-[#333333] hover:text-white">Calculate</button>
                        </div>

                        <div className = "text-white text-center text-[20px] pt-[30px]">
                            <button className = " border border-[#D4AF37] border-[2px] w-[300px] h-[40px] rounded-2xl bg-[#333333] hover:bg-[#D4AF37] hover:outline-[#D4AF37] hover:text-black">Clear</button>
                        </div>

                        <div className = "text-white text-[25px] pt-[20px] text-center">Result</div>

                        <div className = "text-white text-[25px] pt-[20px] text-center">BMI = _ _</div>

                        <div className = "text-white text-[20px] pt-[20px] text-center">Healthy BMI range: 18.5 - 25</div>

                    </div>

                    
                </div>
            </div>
        </div>
        </div>
    )
}