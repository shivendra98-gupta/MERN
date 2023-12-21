import React,{useState} from 'react'  
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import"./Registration.css"

const Signup = () => {
  
const navigate  =  useNavigate();
const[user,setUser]=useState({
  name:"",email:"",password:"",cpassword:""});
 
  let name,value;
  const handleInputs=(event)=>{
    console.log(event)
    name=event.target.name;        
    console.log(name);          
    value=event.target.value; 
    setUser({...user,[name]:value});        
    console.log(user);   
  }

  const PostData=  async (event)=>{
      event.preventDefault();
      const {name,email,password, cpassword }=user;       //OBJECT DESTRUCTURING  
      const res= await fetch( "/register",
      {                         
                method:"POST",     
                body:JSON.stringify({name,email,password,cpassword}),
                headers:{
                         "Content-Type": "application/json"
                  }
      });
      const data=await  res.json();              
       if(res.status===422 || !data)
       {                       
        toast.error(data.error, {  
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        console.log("INVALID REGISTRATION");}
       else
       {
        toast.success("success",{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",}
          );
         console.log("successfully registered");
              navigate("/login",)                                          }             //USING NAVIGATE HOOK
                                                                                    
  }

  return (
    <>
    <div className="regist-body">
    <div className="regist-container">
        <div className="registration-form-container">
            <h1 className='regist-h1'>Registration</h1>

            <form method="POST" id="registration-form">
                    <div className="regist-inputbox">
                    <input type="text" name="name" id="fullname" autoComplete='off' 
                    value={user.name}
                    onChange={handleInputs} required/>
                    <label htmlFor="">Name</label>
                    </div>
                
            <div className="regist-inputbox">
                    <ion-icon name="mail-outline"></ion-icon>
                    <input type="email" name="email" id="email"  autoComplete='off'
                    value={user.email}
                    onChange={handleInputs} required/>
                    <label for="">Email</label>
            </div>

            <div className="regist-inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" name="password" id="password" autoComplete='off'
                    value={user.password}
                    onChange={handleInputs} required/>
                    <label htmlFor="">Password</label>
            </div>

            <div className="regist-inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" id="confirm-password" name="cpassword" autoComplete='off' 
                    value={user.cpassword}
                    onChange={handleInputs} required/>
                    <label htmlFor="">Confirm Password</label>
            </div>
                <button type="submit" name="signup" id="signup" className='regist-button' value="Register"
                onClick={PostData}>Register</button>
            </form>

            </div>
            </div>
            </div>
           
            <ToastContainer/>
    </>         
  )
}

export default Signup