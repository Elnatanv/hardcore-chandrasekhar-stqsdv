import moment, { Moment } from "moment";
const isTimeBetween = (
  start: string,
  end: string,
  target: { start: string; end: string },
): boolean => {
  const startTime = moment(start, "HH:mm");
  const endTime = moment(end, "HH:mm");
  const targetTime = moment(target.start, "HH:mm");
  const targetEndTime = moment(target.end, "HH:mm");

  // Convert times to minutes since midnight for comparison
  const startMinutes = startTime.hours() * 60 + startTime.minutes();
  const endMinutes = endTime.hours() * 60 + endTime.minutes();
  const targetMinutes = targetTime.hours() * 60 + targetTime.minutes();
  const targetEndMinutes = targetEndTime.hours() * 60 + targetEndTime.minutes();

  return (
    (targetMinutes >= startMinutes && targetMinutes <= endMinutes) ||
    (targetEndMinutes >= startMinutes && targetEndMinutes <= endMinutes)
  );
};
export default isTimeBetween;
