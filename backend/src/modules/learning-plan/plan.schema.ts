import { z } from "zod";

const PlanSchema = z.object({
  plan: z.array(
    z.object({
      nodeTitle: z.string(),
      description: z.string(),
      concepts: z.array(
        z.object({
          name: z.string(),
          subTopics: z
            .array(z.string())
            .min(1, "Each concept must have at least 1 subtopic")
            .max(5, "Each concept can have at most 5 subtopics"),
        })
      ),
      whyImportant: z.string(),
    })
  ),
});

export type LearningPlanType = z.infer<typeof PlanSchema>;
export { PlanSchema };
