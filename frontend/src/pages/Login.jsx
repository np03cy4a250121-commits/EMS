import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }


    if (!password.trim()) {
      alert("Please enter your password.");
      return;
    }


    try {

      setLoading(true);


      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );
      console.log(res.data);

localStorage.setItem(
 "token",
 res.data.token
);

localStorage.setItem(
 "admin",
 JSON.stringify(res.data.admin)
);


      console.log("LOGIN RESPONSE:", res.data);



      // Store admin token
      localStorage.setItem(
        "token",
        res.data.token
      );


      // Store admin details
      localStorage.setItem(
        "admin",
        JSON.stringify(
          res.data.admin
        )
      );


      alert("✅ Login Successful");


      navigate("/admin/dashboard");



    } catch (error) {


      console.error(error);


      alert(
        error.response?.data?.message ||
        "Invalid email or password"
      );


    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="login-container">


      <h1>
        Event Management System
      </h1>


      <p className="subtitle">
        Administrator Login
      </p>



      <form onSubmit={handleSubmit}>


        <div className="form-group">

          <label>
            Email Address
          </label>


          <input

            type="email"

            placeholder="Enter admin email"

            value={email}

            onChange={(e)=>
              setEmail(e.target.value)
            }

          />

        </div>



        <div className="form-group">


          <label>
            Password
          </label>


          <input

            type="password"

            placeholder="Enter password"

            value={password}

            onChange={(e)=>
              setPassword(e.target.value)
            }

          />


        </div>




        <button

          type="submit"

          className="login-btn"

          disabled={loading}

        >

          {
            loading
            ? "Logging in..."
            : "Login"
          }


        </button>



      </form>


    </div>

  );

}


export default Login;