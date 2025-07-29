import { Request, Response, NextFunction } from "express";
import { assessmentSchema } from "@shared/schemas/assessment.js";

export const validateAssessment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = assessmentSchema.safeParse(req.body);

  if (!validationResult.success) {
    res.status(400).json({
      error: "Invalid assessment data",
      details: validationResult.error.flatten(),
    });
    return;
  }

  req.body = validationResult.data;

  next();
};
