export const calculateDuration = (
  start: string,
  end: string,
  isOvernight: boolean = false
): string => {
  // For overnight shifts, we need to use the next day for the end time
  const startDate = new Date(`2000-01-01T${start}`);
  let endDate: Date;

  if (
    isOvernight ||
    new Date(`2000-01-01T${end}`).getTime() < startDate.getTime()
  ) {
    // If end time is earlier than start time, use next day for end time
    endDate = new Date(`2000-01-02T${end}`);
  } else {
    endDate = new Date(`2000-01-01T${end}`);
  }

  const diff = (endDate.getTime() - startDate.getTime()) / 1000 / 60; // in minutes

  if (diff === 60) {
    return "1 hour";
  } else if (diff < 60) {
    return `${diff} minutes`;
  } else {
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return minutes > 0 ? `${hours}.${minutes} hours` : `${hours} hours`;
  }
};
