import { z } from "zod";

export const assessmentSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().min(10).max(100),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
  goals: z.array(z.string()).min(1),
  knownLanguages: z.array(z.string()).optional(),
  learningStyle: z.enum(["visual", "auditory", "kinesthetic"]).optional(),
  timePerWeek: z.number().int().min(1),
  hasComputer: z.boolean(),
  preferredTrack: z.enum(["frontend", "backend", "fullstack"]),
  otherNotes: z.string().optional(),
});

export type Assessment = z.infer<typeof assessmentSchema>;
