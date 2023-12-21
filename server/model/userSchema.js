const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const validator = require("validator"); 
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  //userSchema is a instance
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(
          "PASSWORD MUST CONTAIN ATLEAST ONE UPPERCASE AND ONE SPECIAL CHARACTER AND ONE NUMERIC VALUE "
        );
      }
    },
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
  myFile: {
    type:String,
  },
});

//                                                  we are generating token----------start----------
userSchema.methods.generateAuthToken = async function () {
  try {
    let token11 = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token11 }); 
    await this.save(); 
    return token11;
  } catch (e) {
    console.log(e);
  }
};
const User = mongoose.model("USER", userSchema); //collection name is 'USER'
module.exports = User;
