interface WorkHours {
  START_WORK_HOUR: string;
  END_WORK_HOUR: string;
}

export interface WeekAvailability {
  ראשון: WorkHours;
  שני: WorkHours;
  שלישי: WorkHours;
  רביעי: WorkHours;
  חמישי: WorkHours;
  שישי: WorkHours;
  שבת: WorkHours;
}

export const weekAvailablity: WeekAvailability = {
  ראשון: { START_WORK_HOUR: "9:30", END_WORK_HOUR: "19:30" },
  שני: { START_WORK_HOUR: "9:00", END_WORK_HOUR: "19:00" },
  שלישי: { START_WORK_HOUR: "08:15", END_WORK_HOUR: "20:20" },
  רביעי: { START_WORK_HOUR: "11:45", END_WORK_HOUR: "19:45" },
  חמישי: { START_WORK_HOUR: "9:00", END_WORK_HOUR: "14:30" },
  שישי: { START_WORK_HOUR: "9:30", END_WORK_HOUR: "19:30" },
  שבת: { START_WORK_HOUR: "00:00", END_WORK_HOUR: "00:00" },
};
