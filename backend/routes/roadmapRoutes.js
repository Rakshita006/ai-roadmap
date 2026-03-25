import express from "express";
import { deleteRoadmap, generateRoadmap, getSingleRoadmap, getUserRoadmap } from "../controllers/roadmapController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate-roadmap",authMiddleware, generateRoadmap);

router.get("/my-roadmaps",authMiddleware,getUserRoadmap)

router.delete('/delete-roadmap/:id',authMiddleware,deleteRoadmap)

router.get('/roadmap/:id',authMiddleware,getSingleRoadmap)

export default router;