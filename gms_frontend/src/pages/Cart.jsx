import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

function Cart() {

const products = Array(9).fill({
name:"Gold Standard 100% Whey Protein",
price:"Rs. 8,999.00",
image:"https://m.media-amazon.com/images/I/71W8P9T0mXL.jpg"
})

return (
<div style={styles.page}>

{/* Navbar */}

<div style={styles.navbar}>

<div style={styles.logo}>
POWER ZONE
</div>

<div style={styles.menu}>
<p>Home</p>
<p>About</p>
<p>Our Services</p>
<p>Contacts</p>
<p>Orders</p>
</div>

<div>
<FaUserCircle
size={38}
color="white"
/>
</div>

</div>

{/* Title */}

<div style={styles.header}>

<h1 style={styles.heading}>
Premium Supplements
</h1>

<p style={styles.subtitle}>
Enhance your fitness journey with premium supplements
that support performance, strength and recovery
</p>

</div>

{/* Category Buttons */}

<div style={styles.categorySection}>

<div style={styles.categories}>

<button style={styles.activeBtn}>
All
</button>

<button style={styles.btn}>
Pre-Workout
</button>

<button style={styles.btn}>
Health
</button>

<button style={styles.btn}>
Performance
</button>

<button style={styles.btn}>
Recovery
</button>

<button style={styles.btn}>
Protein
</button>

</div>

<FaShoppingCart
size={28}
color="white"
/>

</div>

{/* Products */}

<div style={styles.grid}>

{products.map((product,index)=>(

<div
key={index}
style={styles.card}
>

<img
src={product.image}
style={styles.image}
/>

<h3 style={styles.productTitle}>
{product.name}
</h3>

<div style={styles.details}>
<p>• High quality whey protein</p>
<p>• Lean sugar</p>
<p>• Low fat</p>
<p>• Supports muscle growth</p>
</div>

<div style={styles.bottom}>

<h4 style={styles.price}>
{product.price}
</h4>

<button style={styles.cartBtn}>
Add to Cart
</button>

</div>

</div>

))}

</div>

<div style={styles.viewContainer}>

<button style={styles.viewBtn}>
View More
</button>

</div>

</div>

)

}

const styles={

page:{
background:"#2d2d2d",
minHeight:"100vh",
padding:"30px",
color:"white"
},

navbar:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"15px",
borderBottom:"1px solid #E5B93E"
},

logo:{
fontSize:"24px",
fontWeight:"bold",
color:"#E5B93E"
},

menu:{
display:"flex",
gap:"35px"
},

header:{
textAlign:"center",
marginTop:"30px"
},

heading:{
color:"#E5B93E"
},

subtitle:{
color:"#ccc"
},

categorySection:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginTop:"30px"
},

categories:{
display:"flex",
gap:"15px",
flexWrap:"wrap"
},

btn:{
padding:"10px 18px",
borderRadius:"8px",
border:"none",
cursor:"pointer"
},

activeBtn:{
padding:"10px 18px",
background:"#E5B93E",
border:"none",
borderRadius:"8px"
},

grid:{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"30px",
marginTop:"40px"
},

card:{
background:"#e7e7e7",
padding:"15px",
borderRadius:"15px",
color:"black"
},

image:{
width:"100%",
height:"170px",
objectFit:"contain"
},

productTitle:{
fontSize:"16px"
},

details:{
fontSize:"13px"
},

bottom:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginTop:"15px"
},

price:{
fontSize:"14px"
},

cartBtn:{
background:"#E5B93E",
border:"none",
padding:"8px 12px",
borderRadius:"7px",
cursor:"pointer"
},

viewContainer:{
display:"flex",
justifyContent:"center",
marginTop:"50px"
},

viewBtn:{
padding:"15px 40px",
background:"transparent",
border:"2px solid #E5B93E",
color:"white",
borderRadius:"10px",
fontSize:"18px"
}

}

export default Cart
