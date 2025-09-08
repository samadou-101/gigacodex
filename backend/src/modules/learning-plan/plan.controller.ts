import { Request, Response } from "express";
import { loadPlanFromCache, loadPlanFromDB } from "./plan.service.js";

export const handlePlanLoad = async (req: Request, res: Response) => {
  const userId = req.session.user?.id;

  if (!userId) {
    res.status(403).json({ message: "Unauthorized!" });
    return;
  }
  try {
    let planFromCache = await loadPlanFromCache(userId);
    if (!planFromCache) {
      const planFromDB = await loadPlanFromDB(userId);
      res.status(200).json({ learningPlan: planFromDB });
      console.log("from db");
      return;
    }
    res.status(200).json({ learningPlan: planFromCache });
    console.log("from cache");
    return;
  } catch (error) {
    res.status(500).send("Unexpected Error!");
  }
};
