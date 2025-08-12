import { Request, Response, NextFunction } from "express";
import { assessmentSchema } from "./assessment.validation.js";
// import { assessmentSchema } from "@shared/schemas/assessment.js";

export const validateAssessment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Received assessment data:", JSON.stringify(req.body, null, 2));

  const validationResult = assessmentSchema.safeParse(req.body);

  if (!validationResult.success) {
    console.error("Validation failed:", validationResult.error.flatten());
    res.status(400).json({
      error: "Invalid assessment data",
      details: validationResult.error.flatten(),
    });
    return;
  }

  console.log("Validation passed, proceeding with assessment");
  req.body = validationResult.data;

  next();
};
