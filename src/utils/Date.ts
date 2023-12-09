export function addDays(date: Date, days: number) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}

export function dateFromInputToDate(date: string, timeZoneOffset: number) {
    const absTimeZoneOffsetString = Math.abs(timeZoneOffset).toString();
    const dateStr = `${date}T00:00:00.000${timeZoneOffset < 0 ? "-" : "+"}${
        absTimeZoneOffsetString.length > 1 ? "" : "0"
    }${absTimeZoneOffsetString}:00`;

    return new Date(dateStr);
}
