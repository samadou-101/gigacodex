import { Router } from "express";
import { handlePlanLoad } from "./plan.controller.js";

const planRouter = Router();

planRouter.get("/load", handlePlanLoad);

export default planRouter;
