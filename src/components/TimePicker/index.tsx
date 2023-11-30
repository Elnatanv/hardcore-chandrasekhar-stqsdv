import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import isTimeBetween from "./helpers/isTimeBetween";
import { useAvailability } from "../../context/MainValues";

interface TimePickerProps {
  selectedDate: string;
  START_WORK_HOUR: string;
  END_WORK_HOUR: string;
}
const TimePicker: React.FC = ({
  selectedDate,
  START_WORK_HOUR,
  END_WORK_HOUR,
}: TimePickerProps) => {
  const {
    skipTime,
    setSkipTime,
    breakTime,
    setBreakTime,
    durationTime,
    setDurationTime,
    bookedTimes,
    setBookedTimes,
  } = useAvailability();

  const SKIP_TIME = skipTime;
  const BREAK_TIME = breakTime;
  const DURATION_TIME = durationTime;
  const disabledTimes = bookedTimes;
  const [selectedTime, setSelectedTime] = useState<string>("");

  const startWorkHour = parseInt(START_WORK_HOUR.split(":")[0]);
  const startWorkMinute = parseInt(START_WORK_HOUR.split(":")[1]);
  const endWorkHour = parseInt(END_WORK_HOUR.split(":")[0]);
  const endWorkMinute = parseInt(END_WORK_HOUR.split(":")[1]);

  interface TimeSlot {
    time: string;
    endTime: string;
    disabled: boolean;
    users: string[];
  }

  const timeSlots: TimeSlot[] = [];
  let startTime: Moment = moment()
    .set("hour", startWorkHour)
    .set("minute", startWorkMinute);
  const endTime: Moment = moment()
    .set("hour", endWorkHour)
    .set("minute", endWorkMinute);

  while (startTime.isBefore(endTime)) {
    const endTimeSlot = startTime.clone();
    endTimeSlot.add(DURATION_TIME ? DURATION_TIME : SKIP_TIME, "minutes");

    const currentTime: string = startTime.format("HH:mm");
    const currentEndTime: string = endTimeSlot.format("HH:mm");
    if (!endTimeSlot.isAfter(endTime)) {
      timeSlots.push({
        time: currentTime,
        endTime: currentEndTime,
        disabled: false,
        users: [],
      });
    }

    let skipTime = SKIP_TIME;
    if (!DURATION_TIME) skipTime = SKIP_TIME + BREAK_TIME;

    startTime = startTime.clone().add(skipTime, "minutes");
  }

  const BOOKED_TIMES_TEST = [
    { start: "09:00", end: "10:30", user: "userOne" },
    { start: "15:00", end: "16:00", user: "userOne" },
    { start: "09:00", end: "10:30", user: "userTwo" },
    { start: "15:00", end: "16:00", user: "userTwo" },
    { start: "09:00", end: "10:30", user: "userThree" },
    { start: "15:00", end: "16:00", user: "userThree" },

    // ... other booked slots for user1
  ];

  for (const timeSlot of timeSlots) {
    for (const disabledTime of BOOKED_TIMES_TEST) {
      const isBetween: boolean = isTimeBetween(
        timeSlot.time,
        timeSlot.endTime,
        disabledTime,
      );

      if (!isBetween) {
        timeSlot.users.push(disabledTime.user);
      }
    }
  }
  console.log(timeSlots);
  const handleTimeSelection = (time: string): void => {
    setSelectedTime(time);
  };

  return (
    <div>
      {selectedDate && <h2>{selectedDate}</h2>}
      <h3>בחר שעה:</h3>
      <ul>
        {timeSlots.map(({ time, endTime, disabled, users }, index) => (
          <li
            key={index}
            onClick={() => {
              const isDisabled = users?.length === 0;
              console.log(users);
              isDisabled ? false : handleTimeSelection(`${time}-${endTime}`);
              setBookedTimes((prev) => [
                ...prev,
                { start: time, end: endTime },
              ]);
            }}
            style={{
              color: users?.length === 0 ? "grey" : "black",
              cursor: users?.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            {time}-{endTime}
          </li>
        ))}
      </ul>
      {selectedTime && (
        <div style={{ color: "black" }}>Selected Time: {selectedTime}</div>
      )}
    </div>
  );
};

export default TimePicker;
