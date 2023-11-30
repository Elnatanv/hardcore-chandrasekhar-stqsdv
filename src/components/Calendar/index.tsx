import React, { FunctionComponent } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "./style/index.css";
import he from "date-fns/locale/he"; // the locale you want
import addDaysToDate from "./helpers/addDaysToDate";
import getHebrewDay from "./helpers/getHebrewDay";

interface CalendarProps {
  selectedDate: {
    date: Date | null;
    day: string | null;
    dateOnly: string | null;
    dateFormatted: string | null;
  };
  setSelectedDate: (date: {
    date: Date | null;
    day: string | null;
    dateOnly: string | null;
    dateFormatted: string | null;
  }) => void;
}

const HebrewDatePicker: FunctionComponent<CalendarProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  registerLocale("he", he);

  const onCalendarDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate({
        date,
        day: getHebrewDay(date),
        dateOnly: moment(date).format("YYYY-MM-DD"),
        dateFormatted: moment(date).format("DD-MM-YYYY"),
      });
    } else {
      setSelectedDate({
        date: null,
        day: null,
        dateOnly: null,
        dateFormatted: null,
      });
    }
  };

  return (
    <div dir="rtl">
      <DatePicker
        direction="rtl"
        selected={selectedDate.date}
        onChange={(date: Date) => onCalendarDateChange(date)}
        dateFormat="dd/MM/yyyy"
        calendarClassName="standalone-calendar" // You can apply custom styling using this className
        inline // Renders the calendar as a standalone component
        shouldCloseOnSelect={false} // Prevents the calendar from closing when a date is selected
        locale="he" // Set the locale to Hebrew
        showMonthDropdown
        showYearDropdown
        minDate={addDaysToDate(new Date(), 1)} // Disable dates before today
      />
    </div>
  );
};

export default HebrewDatePicker;
