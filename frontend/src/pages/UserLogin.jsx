import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import "../styles/UserAuth.css";

function UserLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/user/login", data);

      // Save token
      localStorage.setItem("userToken", res.data.token);

      // Save user details
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful!");
      localStorage.setItem(
      "userToken",
      res.data.token
      );


      localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
      );

      // Redirect to Home page
      navigate("/users");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">

     <>
    <h1>EventMS</h1>

    <p style={{marginBottom:"30px"}}>
        Welcome Back 👋
    </p>
    </>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/user/signup">
          Sign Up
        </Link>
      </p>

    </div>
  );
}

export default UserLogin;