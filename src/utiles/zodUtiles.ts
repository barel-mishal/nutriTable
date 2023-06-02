import { z } from "zod";

export const NOT_VALID_NUMBER = -1;

export const zodConvertibleNumericType = z.union([z.number(), z.string()]).transform((data) => {
    if (typeof data === "string") {
        const parsed = parseFloat(data);
        if (isNaN(parsed)) return NOT_VALID_NUMBER;
        return parseFloat(data);
    }
    return data;
});
function stringToDate(str: string | Date) {
    if (str instanceof Date) return str;
    if (!str) return null;

    // Split the string into date and time components.
    const [datePart, timePart] = str.split(' ');

    if (!datePart || !timePart) return null;

    // Split the date part into day, month, and year.
    const [day, month, year] = datePart.split('/').map(Number);

    // Split the time part into hour, minute, second, and millisecond.
    // eslint-disable-next-line prefer-const
    let [hour, minute, second, millisecond] = timePart.split(':').map(Number);

    // Make sure millisecond is in 3-digit format.
    if (millisecond < 10) {
        millisecond *= 100;
    } else if (millisecond < 100) {
        millisecond *= 10;
    }

    // Create a new Date object with the extracted components.
    // Please note that months are 0-indexed in JavaScript.
    return new Date(year, month - 1, day, hour, minute, second, millisecond);
}
export const zodConvertibleDateType = z.date().or(z.string()).transform((data) => {
    // If data is not a string, assume it's already a Date object
    return stringToDate(data);
}).transform((data) => {
    // If data is an invalid Date object, return "חסר תאריך". Otherwise, return the Date object converted to a string in the format "dd/MM/yyyy HH:mm:ss"
    if (data === null) return "חסר תאריך";
    if (isNaN(data.getTime())) return "תאריך לא תקין";
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}:${data.getMilliseconds()}`;
});

