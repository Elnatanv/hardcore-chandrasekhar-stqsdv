import { useEffect, useState } from "react";
import "./App.css";
import moment from "moment";
import HebrewDatePicker from "./components/Calendar";
import CustomTimePicker from "./components/TimePicker";
import { WeekAvailability, weekAvailablity } from "./constants";
import addDaysToDate from "./components/Calendar/helpers/addDaysToDate";
import getHebrewDay from "./components/Calendar/helpers/getHebrewDay";

interface SelectedDateState {
  date: Date | null;
  day: string;
  dateOnly: string | undefined;
  dateFormatted: string | undefined;
}
function App() {
  const initDay = getHebrewDay(addDaysToDate(new Date(), 1));
  const [selectedDate, setSelectedDate] = useState<SelectedDateState>({
    date: addDaysToDate(new Date(), 1),
    day: initDay,
    dateOnly: moment(new Date()).format("YYYY-MM-DD"),
    dateFormatted: moment(new Date()).format("DD-MM-YYYY"),
  });
  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const dayOfWeek = selectedDate.day as keyof WeekAvailability;
  return (
    <div dir="rtl" className="App wrapper justify-center">
      <div className="container flex justify-between">
        <HebrewDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <CustomTimePicker
          selectedDate={selectedDate.dateFormatted}
          START_WORK_HOUR={weekAvailablity[dayOfWeek].START_WORK_HOUR}
          END_WORK_HOUR={weekAvailablity[dayOfWeek].END_WORK_HOUR}
        />
      </div>
    </div>
  );
}

export default App;
