import { Router } from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import { getUsers } from "../controllers/user.controller.js";
const router = Router();

router.get("/",protectedRoute,getUsers);


export default router;