import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static("matchPassword",async function(email,password,res){
  const user = await this.findOne({email});
  if(!user)  return {message:"User not found",success:false};
  const salt = user.salt;
  const hashedPassword = user.password;
  const hashedPasswordInput = createHmac("sha256",salt).update(password).digest("hex");
  if(hashedPassword !== hashedPasswordInput) return {message:"Password does not match",success:false};

  generateTokenAndSetCookie(user._id,res);
  console.log("User Logged In from model"); 
  return {message:"Password matched",success:true};
})

const User = model("User", userSchema);
export default User;
