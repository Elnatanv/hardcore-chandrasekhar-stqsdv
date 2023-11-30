import React, { createContext, useContext, useState, ReactNode } from "react";

interface AvailabilityContextType {
  skipTime: number;
  setSkipTime: React.Dispatch<React.SetStateAction<number>>;
  breakTime: number;
  setBreakTime: React.Dispatch<React.SetStateAction<number>>;
  durationTime: number;
  setDurationTime: React.Dispatch<React.SetStateAction<number>>;
  bookedTimes: { start: string; end: string }[];
  setBookedTimes: React.Dispatch<
    React.SetStateAction<{ start: string; end: string }[]>
  >;
}

const AvailabilityContext = createContext<AvailabilityContextType | undefined>(
  undefined,
);

const SKIP_TIME = 60;
const BREAK_TIME = 15;
const DURATION_TIME = 90;
const BOOKED_TIMES: { start: string; end: string }[] = [
  { start: "10:00", end: "11:00" },
];

export const AvailabilityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [skipTime, setSkipTime] = useState<number>(SKIP_TIME);
  const [breakTime, setBreakTime] = useState<number>(BREAK_TIME);
  const [durationTime, setDurationTime] = useState<number>(DURATION_TIME);
  const [bookedTimes, setBookedTimes] =
    useState<{ start: string; end: string }[]>(BOOKED_TIMES);

  return (
    <AvailabilityContext.Provider
      value={{
        skipTime,
        setSkipTime,
        breakTime,
        setBreakTime,
        durationTime,
        setDurationTime,
        bookedTimes,
        setBookedTimes,
      }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
};

export const useAvailability = (): AvailabilityContextType => {
  const context = useContext(AvailabilityContext);
  if (!context) {
    throw new Error(
      "useAvailability must be used within an AvailabilityProvider",
    );
  }
  return context;
};
