import { z } from "zod";

const TopicSchema = z.object({
  title: z.string().min(1, "Topic title is required"),
  details: z.string().min(1, "Topic details are required"),
});

const PlanSchema = z.object({
  plan: z.array(
    z.object({
      nodeTitle: z.string().min(1, "Node title is required"),
      description: z.string().min(1, "Description is required"),
      whyImportant: z.string().min(1, "Why Important is required"),
      topics: z
        .array(TopicSchema)
        .min(1, "Each node must have at least one topic"),
    })
  ),
});

export type LearningPlanType = z.infer<typeof PlanSchema>;
export { PlanSchema };
