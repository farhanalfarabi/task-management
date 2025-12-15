import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  endOfDay,
  endOfMonth,
  getDate,
  getDaysInMonth,
  isSameDay,
  startOfDay,
  startOfMonth,
} from "date-fns";

export const getsDaysIn = (range) => {
  let fn = (_date) => 1;
  if (range === "monthly" || range === "quarterly") {
    fn = getDaysInMonth;
  }
  return fn;
};

export const getDifferenceIn = (range) => {
  let fn = differenceInDays;
  if (range === "monthly" || range === "quarterly") {
    fn = differenceInMonths;
  }
  return fn;
};

export const getInnerDifferenceIn = (range) => {
  let fn = differenceInHours;
  if (range === "monthly" || range === "quarterly") {
    fn = differenceInDays;
  }
  return fn;
};

export const getStartOf = (range) => {
  let fn = startOfDay;
  if (range === "monthly" || range === "quarterly") {
    fn = startOfMonth;
  }
  return fn;
};

export const getEndOf = (range) => {
  let fn = endOfDay;
  if (range === "monthly" || range === "quarterly") {
    fn = endOfMonth;
  }
  return fn;
};

export const getAddRange = (range) => {
  let fn = addDays;
  if (range === "monthly" || range === "quarterly") {
    fn = addMonths;
  }
  return fn;
};

export const getDateByMousePosition = (context, mouseX) => {
  const timelineStartDate = new Date(context.timelineData[0].year, 0, 1);
  const columnWidth = (context.columnWidth * context.zoom) / 100;
  const offset = Math.floor(mouseX / columnWidth);
  const daysIn = getsDaysIn(context.range);
  const addRange = getAddRange(context.range);
  const month = addRange(timelineStartDate, offset);
  const daysInMonth = daysIn(month);
  const pixelsPerDay = Math.round(columnWidth / daysInMonth);
  const dayOffset = Math.floor((mouseX % columnWidth) / pixelsPerDay);
  const actualDate = addDays(month, dayOffset);
  return actualDate;
};

export const createInitialTimelineData = (today) => {
  const data = [];

  data.push(
    { year: today.getFullYear() - 1, quarters: new Array(4).fill(null) },
    { year: today.getFullYear(), quarters: new Array(4).fill(null) },
    { year: today.getFullYear() + 1, quarters: new Array(4).fill(null) }
  );

  for (const yearObj of data) {
    yearObj.quarters = new Array(4).fill(null).map((_, quarterIndex) => ({
      months: new Array(3).fill(null).map((_, monthIndex) => {
        const month = quarterIndex * 3 + monthIndex;
        return {
          days: getDaysInMonth(new Date(yearObj.year, month, 1)),
        };
      }),
    }));
  }

  return data;
};

export const getOffset = (date, timelineStartDate, context) => {
  const parsedColumnWidth = (context.columnWidth * context.zoom) / 100;
  const differenceIn = getDifferenceIn(context.range);
  const startOf = getStartOf(context.range);
  const fullColumns = differenceIn(startOf(date), timelineStartDate);

  if (context.range === "daily") {
    return parsedColumnWidth * fullColumns;
  }

  const partialColumns = date.getDate();
  const daysInMonth = getDaysInMonth(date);
  const pixelsPerDay = parsedColumnWidth / daysInMonth;

  return fullColumns * parsedColumnWidth + partialColumns * pixelsPerDay;
};

export const getWidth = (startAt, endAt, context) => {
  const parsedColumnWidth = (context.columnWidth * context.zoom) / 100;

  if (!endAt) {
    return parsedColumnWidth * 2;
  }

  const differenceIn = getDifferenceIn(context.range);

  if (context.range === "daily") {
    const delta = differenceIn(endAt, startAt);
    return parsedColumnWidth * (delta ? delta : 1);
  }

  const daysInStartMonth = getDaysInMonth(startAt);
  const pixelsPerDayInStartMonth = parsedColumnWidth / daysInStartMonth;

  if (isSameDay(startAt, endAt)) {
    return pixelsPerDayInStartMonth;
  }

  const innerDifferenceIn = getInnerDifferenceIn(context.range);
  const startOf = getStartOf(context.range);

  if (isSameDay(startOf(startAt), startOf(endAt))) {
    return innerDifferenceIn(endAt, startAt) * pixelsPerDayInStartMonth;
  }

  const startRangeOffset = daysInStartMonth - getDate(startAt);
  const endRangeOffset = getDate(endAt);
  const fullRangeOffset = differenceIn(startOf(endAt), startOf(startAt));
  const daysInEndMonth = getDaysInMonth(endAt);
  const pixelsPerDayInEndMonth = parsedColumnWidth / daysInEndMonth;

  return (
    (fullRangeOffset - 1) * parsedColumnWidth +
    startRangeOffset * pixelsPerDayInStartMonth +
    endRangeOffset * pixelsPerDayInEndMonth
  );
};

export const calculateInnerOffset = (date, range, columnWidth) => {
  const startOf = getStartOf(range);
  const endOf = getEndOf(range);
  const differenceIn = getInnerDifferenceIn(range);
  const startOfRange = startOf(date);
  const endOfRange = endOf(date);
  const totalRangeDays = differenceIn(endOfRange, startOfRange);
  const dayOfMonth = date.getDate();

  return (dayOfMonth / totalRangeDays) * columnWidth;
};

