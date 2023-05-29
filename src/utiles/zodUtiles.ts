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

export const zodConvertibleDateType = z.date().or(z.string()).transform((data) => {
    if (typeof data === "string" && data !== "") {
        const [day, month, yearAndTime] = data.split('/');
        const [year, ...rest] = yearAndTime.split(' ');
        const [hours, minutes, secondsAndMillis] = rest.join(' ').split(':');
        const [seconds, milliseconds] = secondsAndMillis.split('.');

        return new Date(
            parseInt(year),
            parseInt(month) - 1, // Note: JavaScript counts months from 0 (January) to 11 (December), so subtract 1
            parseInt(day),
            parseInt(hours),
            parseInt(minutes),
            parseInt(seconds),
            parseInt(milliseconds)
        );
    }
    // If data is not a string, assume it's already a Date object
    return data;
}).transform((data) => {
    // If data is an invalid Date object, return "חסר תאריך". Otherwise, return the Date object converted to a string in the format "dd/MM/yyyy HH:mm:ss"
    if (data === "") return "חסר תאריך";
    if (isNaN(data.getTime())) return "תאריך לא תקין";
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}:${data.getMilliseconds()}`;
});

