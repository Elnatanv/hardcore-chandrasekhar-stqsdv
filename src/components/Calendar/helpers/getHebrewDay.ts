const getHebrewDay = (date: Date) => {
  const options = { weekday: "long", locale: "he-IL" }; // Set the locale to Hebrew
  const shortDayOfWeek = date?.toLocaleDateString("he-IL", options);

  return shortDayOfWeek.split(" ")[1];
};

export default getHebrewDay;
