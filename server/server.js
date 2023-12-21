const bodyParser=require('body-parser');// FOR CONVERTING STRING TO JSON
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require("cors");
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(bodyParser.json());
dotenv.config({path:'./config.env'})
require('./db/conn');
const User=require('./model/userSchema');
const PORT=process.env.PORT;
app.use(require('./router/auth')); 
app.listen(PORT,()=>{console.log(`listening on port ${PORT}`);});