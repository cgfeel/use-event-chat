import z from 'zod';

export const toastItem = z.object({
  duration: z.number(),
  id: z.string(),
  title: z.string(),
  type: z.enum(['success', 'error', 'warning', 'info']),
  message: z.string().optional(),
});
