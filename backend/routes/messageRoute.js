import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
const router = Router();


router.get('/:id',protectedRoute,getMessages);

//route to send message to a user
router.post('/send/:id',protectedRoute,sendMessage);

export default router;