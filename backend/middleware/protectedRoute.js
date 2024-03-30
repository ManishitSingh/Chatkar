import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async(req, res, next) => {
    try {
        const Token = req.cookies.token;
        // console.log("Token", Token);
        if (!Token) {
            return res.status(401).json({ Error: "Unauthorized", success: false });
        }
        const decoded = jwt.verify(Token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ Error: "Unauthorized", success: false });
        
        }
        const userId = decoded.id;
        const user = await User.findById(userId).select("-password -salt");
        if(!user){
            return res.status(404).json({ Error: "User not found", success: false });
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Protected Route", error);
        return res
            .status(500)
            .json({ Error: "Internal Server Error", success: false });
        
    }
};

export default protectedRoute;