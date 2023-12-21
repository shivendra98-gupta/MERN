import React, { useState } from 'react'
import"./Navbar.css"
import'bootstrap/dist/css/bootstrap.css';
import {NavLink} from "react-router-dom"

const Navbar = () => {
 const[activeLink,setActiveLink]= useState("")
  return (      
<>
<nav className="navbar navbar-expand-lg py-3 navbar-light bg-">       
  <p className="fs-2"  to="#">Deep Media</p>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto" onClick={(e)=>{setActiveLink(e.target.href.split("/")[3])}}>

     <li className={`nav-item ${activeLink==="home"?"active":""}`} >
       <NavLink className="nav-link font-weight-bold"  to="/">Home </NavLink>
      </li>  
      <li className="nav-item text-warning">   <NavLink className="nav-link" style={{active: "green"}}  to="/about">About</NavLink>    </li>

      <li className="nav-item" >
        <NavLink className="nav-link " to="/contact">Contact</NavLink>
      </li>

      <li className="nav-item ">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      
      <li className="nav-item ">
        <NavLink className="nav-link " to="/register">Registration</NavLink>
      </li>

      <li className="nav-item ">
        <NavLink className="nav-link me-11" to="/logout">Logout</NavLink>
      </li>
    </ul>
  </div>
</nav>
</>
  )
}

export default Navbar