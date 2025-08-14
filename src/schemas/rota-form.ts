import { z } from "zod";

export const rotaFormSchema = z
  .object({
    rotaName: z.string().min(2, "Rota name is required"),
    description: z.string().optional(),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    duration: z.string().optional(),
  })
  .refine(
    (data) => {
      // Skip validation if either time is missing
      if (!data.startTime || !data.endTime) return true;

      const start = new Date(`2000-01-01T${data.startTime}`);
      const end = new Date(`2000-01-01T${data.endTime}`);

      // Get hours for validating allowed overnight time frame
      const startHour = start.getHours();
      const endHour = end.getHours();

      // If end time is earlier than start time (potential overnight shift)
      if (end < start) {
        // Only allow overnight shifts that start between 22:00 - 23:59
        if (startHour >= 22) {
          // End time must be between 00:00 - 01:00
          const adjustedEnd = new Date(`2000-01-02T${data.endTime}`);
          // Allow if end is at or before 1:00 and after start
          return endHour <= 1 && adjustedEnd > start;
        }
        // If start time is earlier than 22:00, don't allow overnight shift
        return false;
      }

      // For same-day shifts, ensure end time is after start time
      return end >= start;
    },
    {
      message:
        "For overnight shifts, start time must be between 22:00-23:59 and end time between 00:00-01:00",
      path: ["endTime"],
    }
  );
