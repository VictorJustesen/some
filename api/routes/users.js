import express from "express";
import { getUser,updateUser,searchUsers } from "../controllers/user.js";
const router = express.Router();

router.get("/find/:userid",getUser)
router.put("/", updateUser)
router.get("/search/:query", searchUsers);
export default router