import User from "../models/user.model.js";

export const getUsers = async(req,res) =>{
    try {
        const user_id = req.user._id;
        const allUsers = await User.find({ _id: { $ne: user_id } }).select("-password -salt");
        res.status(200).json(allUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({Error:"Internal_Server_Error",success:false})   
    }
};