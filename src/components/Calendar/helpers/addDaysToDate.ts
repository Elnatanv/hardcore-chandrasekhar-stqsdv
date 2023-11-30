const addDaysToDate = (inputDate: Date, daysToAdd: number): Date => {
  const newDate = new Date(inputDate);
  newDate.setDate(newDate.getDate() + daysToAdd);
  return newDate;
};

export default addDaysToDate;
