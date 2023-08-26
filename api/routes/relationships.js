import express from "express";
import { getRelationships, addRelationship, deleteRelationship, getFollowerCount,getFollowingCount} from "../controllers/relationship.js";

const router = express.Router()

router.get("/", getRelationships)
router.post("/", addRelationship)
router.delete("/", deleteRelationship)
router.get("/followerscount", getFollowerCount);
router.get("/followingcount", getFollowingCount);

export default router