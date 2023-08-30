const timeZone = "America/Sao_Paulo";

const getTimeZoneOffset = (timeZone: string) => {
  const timeZoneOffset = new Date()
    .toLocaleString("en-US", { timeZoneName: "short", timeZone })
    .match(/([-+]\d{2}):?\d{2}$/);
  const timeZoneOffsetNumber = !!timeZoneOffset
    ? parseInt(timeZoneOffset[1])
    : 0;
  return timeZoneOffsetNumber * 60;
};

export const adjustedDate = (date: string) => {
  const dateReturn = new Date(
    new Date(date).getTime() +
      new Date(date).getTimezoneOffset() * 60000 +
      getTimeZoneOffset(timeZone) * 60000
  );
  return dateReturn instanceof Date && isValidDate(dateReturn) ? dateReturn : undefined;
};

export const isValidDate = (value: any): boolean => {
  return !isNaN(Date.parse(value));
};
