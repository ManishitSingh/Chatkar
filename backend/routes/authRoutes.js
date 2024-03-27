import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
const router = Router();
//routes for /api/auth/ 

//Signup route
router.post("/signup",signup);

//Login route
router.post("/login",login);

//Logout route
router.post("/logout",logout);

export default router;