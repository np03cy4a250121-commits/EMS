import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

import "../styles/UserAuth.css";


function UserSignup() {

const navigate = useNavigate();


const [data,setData] = useState({
    name:"",
    email:"",
    password:""
});



const handleChange = (e)=>{

    setData({
        ...data,
        [e.target.name]: e.target.value
    });

};




const handleSignup = async(e)=>{

e.preventDefault();


try{


const res = await API.post(
    "/user/signup",
    data
);



console.log(res.data);


alert("Account Created Successfully");


navigate("/user/login");



}catch(err){

console.log(err.response?.data);


alert(
    err.response?.data?.message ||
    "Signup Failed"
);


}


};




return (

<div className="auth-container">


<h2>
Create Account 🚀
</h2>


<form onSubmit={handleSignup}>


<input

type="text"

name="name"

placeholder="Full Name"

value={data.name}

onChange={handleChange}

/>



<input

type="email"

name="email"

placeholder="Email"

value={data.email}

onChange={handleChange}

/>



<input

type="password"

name="password"

placeholder="Password"

value={data.password}

onChange={handleChange}

/>



<button
type="submit"
className="login-btn"
>

Signup

</button>



<p>

Already have account?

<Link to="/user/login">
 Login
</Link>

</p>



</form>


</div>

);


}


export default UserSignup;