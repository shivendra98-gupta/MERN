
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const router = express.Router();//express.router is a class
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("../db/conn");
const User = require("../model/userSchema");
const nodemailer = require("nodemailer");
router.use(cookieParser());
 router.use(express.json({ limit: "30mb" })); // YEH WORK KR RHA HAI //ye isliye jisse ke POSTMAN seh joh data aaye vo yha hum json meh hum smjh sakeh
router.use(express.urlencoded({ limit: "25mb", extended: true }));
router.use(cors(({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow sending cookies with the request
})));


router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "PLEASE FILL ALL THE FIELDS" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "EMAIL ALREADY EXISTS" });;
    } else if (password != cpassword) {
      return res.status(422).json({ error: "PASSWORD DOES NOT MATCH" });
    } else if (password.length <= 8) {
      return res
        .status(422)
        .json({ error: "PASSWORD MUST HAVE ATLEAST 8 CHARACTER" });
    } else {
      const user = new User(req.body);
      const userSave = await user.save();
      if (userSave) {
        return res
          .status(201)
          .json({ message: "user REGISTERED SUCCESSFULLY" });
      }
    }
  }
   catch (err) {
    console.log(err);
  }
  console.log(req.body); 
  res.json({ message: req.body });
});


//                =======LOGIN START =================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    console.log(userLogin)
    if (userLogin) {
      const token = await userLogin.generateAuthToken(); // CREATING TOKEN
      const isMatch = await User.findOne({ password: password }); 
      if (isMatch)
      {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      res.cookie("jwtoken", token, { 
        expires:new Date(Date.now() + oneDayInMilliseconds),
        credentials: "include",
      });
      res.cookie("ID", userLogin._id, { 
        expires:new Date(Date.now() + oneDayInMilliseconds),
        credentials: "include",
      });
        res.json({ token: token }); 
      } else {
        return res.status(400).json({ error: "INVALID CREDENTIAL PASSWORD" });
      }
    } else {
      return res.status(400).json({ error: "INVALID EMAIL" });
    }
  } catch (err) {
    console.log(err);
  }
});

//=================LOGOUT PAGE----------START----
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/login" });
  res.status(200).send("user logout");
});


//==================HOME PAGE==========START----
router.post("/", authenticate,async (req, res) => {        
  // console.log(req.body)                                      // WORKING COORECTLY
  const body = await req.body.data;
  try {
    const userID=req.cookies.ID;// STORING (DB ID) into userID
    console.log(userID);
    const newImage = await User.updateOne({ _id: userID }, { $set: { myFile: body } });
    console.log("TESTING123456789",);
    res.status(201) .json({ message: "new image uploaded", createdPost: newImage });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
});

//CONTACT US PAGE=====START
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "s7842322@gmail.com",
    pass: "",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});
router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "s7842322@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

//ABOUT PAGE----------START----
router.get("/about", (req, res) => {
  res.send(req.rootuser);
  console.log(`COOKIES MILEH KYA${req.cookies.jwt}`);
});

module.exports = router;

// {
//     "name":"hello",
//     "email":"hello@gmail.com",
//     "password":"123",
//     "cpassword":"123"

// }
