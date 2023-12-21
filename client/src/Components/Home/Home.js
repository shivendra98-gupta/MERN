import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
      console.log("CODE ");
    }
  });
  const [postImage, setpostImage] = useState({
    myFile: "",
  });
  const [base64String, setbase64String]=useState("")
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [imgposition,setimgposition] = useState()
  const createPost = async (postImage) => {
    try {
       await fetch("http://localhost:5000/", {
        method: "POST",
        // mode:'no-cors',
        crossDomain: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
          "Access-Control-Allow-Origin":"*",
        },
         body: JSON.stringify({data: postImage.myFile}),     
        credentials: "include",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost(postImage);// TO STORE IN MONGODB DB
    // console.log(postImage)
    setimgposition(base64String)
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      //TO CONVERT INTO BASE64
      var fileReader = new FileReader(); //TO CONVERT INTO BASE64
      fileReader.readAsDataURL(file); //TO CONVERT INTO BASE64
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleImageUpload = async (event) => {
    let file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setbase64String(base64)    
    setpostImage({ ...postImage, myFile:base64 });
    // console.log(base64);
  };
  useEffect(() => {
    console.log(postImage);
  }, [postImage]);          

  const handleCheckboxChange = (checkboxId) => {
        const updatedCheckboxes = [...selectedCheckboxes];
        const checkboxIndex = updatedCheckboxes.indexOf(checkboxId);
    
        if (checkboxIndex === -1) {
          updatedCheckboxes.push(checkboxId);
        } else {
          updatedCheckboxes.splice(checkboxIndex, 1);
        }
    
        setSelectedCheckboxes(updatedCheckboxes);
      };
  return (
    <div className="home__container">
      <div className="enhancer_container">
        <div className="enhancer_options">
        <div method="POST">
          <h1>Select your Image </h1>
          {postImage &&(
            <div className="UploadBox">
              {postImage.myFile !== "" && (
                <>
                  <img
                    className="image"
                    alt="not found"
                    width={"250px"}
                    src={postImage.myFile}
                  />&nbsp;&nbsp;&nbsp;<img src={imgposition} alt="" />
                  <br />
                  <br />
                  <button
                    className="remove-btn"
                    onClick={() => setpostImage(null)}>
                    Remove
                  </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button className="remove-btn" id="home-but"onClick={handleSubmit}>Submit</button>
                </>
              )}
            </div>
          )}
          <input
            className="img-load"
            type="file"
            name="myImage"
            onChange={(event) => {
              handleImageUpload(event);
            }}
          />
        </div>
      </div>
      </div>
      <div className="enhancer_drop-shadow">
           <div className="options_box options_title">Enhance Options:</div>
           <div className="options_content enhancer_scrollbar"
             style={{ paddingRight: "6px" }}
           >
             <div className="options_box">
               <div className="checkbox options_checkbox">
                 <input
                   type="checkbox"
                   id="upscale"
                   checked={selectedCheckboxes.includes("upscale")}
                   onChange={() => handleCheckboxChange("upscale")}
                 />
                 <label htmlFor="upscale">Upscale</label>
               </div>
               <div className="checkbox options_checkbox">
                 <input
                   type="checkbox"
                   id="Framing"
                   checked={selectedCheckboxes.includes("Framing")}
                   onChange={() => handleCheckboxChange("Framing")}
                 />
                 <label htmlFor="Framing">Framing</label>
               </div>
               <div className="checkbox options_checkbox">
                 <input
                   type="checkbox"
                   id="Background-Processing"
                   checked={selectedCheckboxes.includes("Background-Processing")}
                   onChange={() => handleCheckboxChange("Background-Processing")}
                 />
                 <label htmlFor="Background-Processing">
                   Background-Processing
                 </label>
               </div>
               <div className="checkbox options_checkbox">
                 <input
                   type="checkbox"
                   id="Enhance-face-details"
                   checked={selectedCheckboxes.includes("Enhance-face-details")}
                   onChange={() => handleCheckboxChange("Enhance-face-details")}
                 />
                 <label htmlFor="Enhance-face-details">
                   Enhance-face-details
                 </label>
               </div>
               <div className="checkbox options_checkbox">
                 <input
                   type="checkbox"
                   id="Reduce-Noise"
                   checked={selectedCheckboxes.includes("Reduce-Noise")}
                   onChange={() => handleCheckboxChange("Reduce-Noise")}
                 />
                 <label htmlFor="Reduce-Noise">Reduce-Noise</label>
              </div>
    </div>
    </div>
    </div>
    </div>
  );
};
export default Home;