import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getMsgs , sendMsg } from "../controllers/msgController.js";

const router = express.Router()

router.get('/:id', protectRoute , getMsgs)
router.post('/sendMsg/:id', protectRoute , sendMsg)



export default router