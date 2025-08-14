import dayjs from "dayjs";

export const calculateDuration = (start: string, end: string): string => {
  const startTime = dayjs(start, "HH:mm");
  const endTime = dayjs(end, "HH:mm");

  let diffMinutes = endTime.diff(startTime, "minute");

  if (diffMinutes < 0) {
    // Handle overnight times (e.g. 22:00 -> 02:00)
    diffMinutes += 24 * 60;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours}h ${minutes}m`;
};

export function convertTimeToISO(time: string) {
  const date = new Date();
  const [hours, minutes] = time.split(":");
  const isoDate = new Date(date);
  isoDate.setHours(parseInt(hours));
  isoDate.setMinutes(parseInt(minutes));
  isoDate.setSeconds(0);
  isoDate.setMilliseconds(0);
  return isoDate.toISOString();
}

export function convertISOToTimeHHMM(isoString: string) {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function convertISOToTimeString(isoString: string): string {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${hours.toString().padStart(2, "0")}:${minutes} ${period}`;
}

export function formatTo12Hour(timeString: string): string {
  const [hoursStr, minutesStr] = timeString.split(":");
  const hours = parseInt(hoursStr);
  const minutes = minutesStr;
  const isPM = hours >= 12;
  const formattedHours = hours % 12 || 12; // converts 0 -> 12
  const suffix = isPM ? "pm" : "am";

  return `${formattedHours}:${minutes}${suffix}`;
}

export function to12HourFormat(time24: string): string {
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const suffix = hour >= 12 ? "pm" : "am";

  hour = hour % 12 || 12; // 0 becomes 12, 13 becomes 1, etc.

  return `${hour}:${minute}${suffix}`;
}
