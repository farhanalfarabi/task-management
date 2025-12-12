import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string().optional(),
  memberName: z.string(),
  title: z.string(),
  name: z.string().optional(),
  avatar: z.string().optional(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  deadline: z.string().optional(),
})
