import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (id,res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
    // console.log("Token",token);
    res.cookie("token", token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true, //prevent XSS attacks cross site scripting attacks
        sameSite:"Strict",//CSRF attacks cross site request forgery attacks
        secure:process.env.NODE_ENV === "production" ? true : false
    })
};

export default generateTokenAndSetCookie;