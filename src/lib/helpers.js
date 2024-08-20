import { format } from "date-fns";

// function to get the short format
export function formatTimeDifference(date) {
  const now = new Date();
  const differenceInSeconds = Math.floor((now - new Date(date)) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds}s`; // seconds
  } else if (differenceInSeconds < 3600) {
    return `${Math.floor(differenceInSeconds / 60)}m`; // minutes
  } else if (differenceInSeconds < 86400) {
    return `${Math.floor(differenceInSeconds / 3600)}h`; // hours
  } else {
    return format(date, "d MMM yyyy"); // if older than a day, show date like "Aug 20"
  }
}