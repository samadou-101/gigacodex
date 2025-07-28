import Router from "express";
import { validateAssessment } from "./assessment.middleware.js";

const router = Router();

router.post("/assessment", validateAssessment);
