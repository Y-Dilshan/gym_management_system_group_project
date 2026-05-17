import "../styles/Home.css";
import logo from "../assets/logo.jpeg";
function Home() {

const services = [
{
title:"Schedule",
desc:"Flexible workouts designed to fit your routine and help you stay consistent."
},
{
title:"Trainers",
desc:"Certified and passionate trainers who guide you every step."
},
{
title:"Supplements",
desc:"High-quality supplements to support your performance."
},
{
title:"Diet Plans",
desc:"Customized diet plans to achieve your goals."
},
{
title:"Personal Training",
desc:"One-on-one sessions tailored to fitness needs."
},
{
title:"Modern Gym Equipment",
desc:"State-of-the-art equipment for safe workouts."
}
];

return (

<div className="home">

{/* NAVBAR */}

<nav className="navbar">

<div className="logo">

<img
src={logo}
alt="Power Zone Logo"
/>

</div>

<ul>
<li>Home</li>
<li>About</li>
<li>Our Services</li>
<li>Contact Us</li>
</ul>

<div className="buttons">

<button className="signin">
Sign In
</button>

<button className="signup">
Sign Up
</button>

</div>

</nav>


{/* HERO */}

<section className="hero">

<div className="overlay">

<div className="heroText">

<h4>
UNLEASH YOUR POTENTIAL
</h4>

<h1>
STRONGER
<br/>

<span>EVERYDAY</span>

</h1>

<p>
Join the ultimate fitness experience designed to
build strength, improve endurance and boost
confidence through expert guidance and modern
training methods.
</p>

<button>
GET STARTED
</button>

</div>

</div>

</section>


{/* STATS */}

<section className="stats">

<div>
<h2>500+</h2>
<p>Happy Members</p>
</div>

<div>
<h2>20+</h2>
<p>Expert Trainers</p>
</div>

<div>
<h2>15+</h2>
<p>Awards Won</p>
</div>

<div>
<h2>100+</h2>
<p>Fitness Programs</p>
</div>

</section>


{/* ABOUT */}

<div className="title">

ABOUT US

</div>

<section className="about">

<div className="aboutText">

<p>

Welcome to our fitness gym where we help people
of all levels achieve health and fitness goals.

<br/><br/>

With modern equipment, certified trainers and
personalized programs, we create a supportive
environment that motivates everyone.

<br/><br/>

It is more than just a gym. It is your partner
in a healthier lifestyle. Join us and start your
journey toward a stronger and better version of
yourself.

</p>

<button>
LEARN MORE
</button>

</div>

<div className="aboutImage">

<img
src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900"
alt=""
/>

</div>

</section>



{/* SERVICES */}

<div className="title">

OUR SERVICES

</div>

<section className="services">

{services.map((item,index)=>(

<div className="serviceCard" key={index}>

<h3>{item.title}</h3>

<p>{item.desc}</p>

</div>

))}

</section>


{/* CONTACT */}

<div className="title">

CONTACT US

</div>


<section className="contact">

<div className="contactForm">

<input placeholder="User Name"/>

<input placeholder="Email"/>

<textarea
rows="5"
placeholder="Message"
/>

<button>
SUBMIT
</button>

</div>


<div className="contactCard">

<p>📍 123 Fitness Street</p>

<p>📞 +1 234567890</p>

<p>✉ info@powerpump.com</p>

<p>🌐 www.powerpump.com</p>

<p>🕒 Mon-Sat : 6AM - 10PM</p>

</div>

</section>


{/* BMI */}


<div className="title">

CALCULATE YOUR BMI

</div>

<section className="bmi">

<div className="bmiImage">

<img
src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/BMI_chart.svg/640px-BMI_chart.svg.png"
alt=""
/>

</div>


<div className="calculator">

<input placeholder="Age"/>

<input placeholder="Height (cm)"/>

<input placeholder="Weight (kg)"/>

<div className="gender">

<label>

<input type="radio"/>
Male

</label>

<label>

<input type="radio"/>
Female

</label>

</div>

<div className="bmiButtons">

<button>
Calculate
</button>

<button>
Clear
</button>

</div>

<h2>0.0</h2>

<p>Healthy BMI range : 18.5 - 24.9</p>

</div>

</section>

</div>

);

}

export default Home;