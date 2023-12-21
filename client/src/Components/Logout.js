import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  
  useEffect(() => {
    sessionStorage.clear("token");
    if (sessionStorage.getItem("token") === null) {
      navigate("/login");
    }
  });

  return (
    <>
      <h1>LOGOUT PAGE</h1>
    </>
  );
};

export default Logout;
