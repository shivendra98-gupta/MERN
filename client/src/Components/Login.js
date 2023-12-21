import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "js-cookie";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),

      credentials: "include",
    });
    const data = await res.json(); 
    console.log(data.token); 
     if (data.token) {
      sessionStorage.setItem("token", data.token); 
    } else {
      navigate("/login");
    }

    console.log(data.error);
    if (res.status === 400 || !data) {
      toast.error(data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      //window.alert("LOGIN SUCCESSFUL")
      toast.success("LOGIN SUCCESSFUL", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/"); 
      }, 4000);

      const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 
      const SetCookie = (jwttoken, token) => {
        Cookie.set(jwttoken, token, {
          expires: new Date(Date.now() + oneDayInMilliseconds),
          secure: true,
         });
      };
      SetCookie("jwttoken", JSON.stringify(data.token));
    } // Closing of ELSE BLOCK
  };

  return (
    <>
      <div className="login-body">
        <section>
          <form>
            <h1>Login</h1>
            <div className="login-inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>
            <div className="login-inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>
            <button className="login-button" onClick={loginUser}>
              Log in
            </button>

            <div className="register1">
              <p>
                Don't have an account. <a href="/register">Register</a>
              </p>
            </div>
          </form>
        </section>
      </div>

      <ToastContainer />
    </>
  );
};
export default Login;