interface WeekDates {
    startOfWeek: Date;
    endOfWeek: Date;
    weekNumber: number;
    formattedStartOfWeek: string;
    formattedEndOfWeek: string;
}

export const getWeekDates = (weekNumber?: number): WeekDates => {
    const currentDate = new Date();
    const currentWeekNumber = getWeekNumber(currentDate);

    const startOfWeek = getStartOfWeekByWeekNumber(currentDate.getFullYear(), weekNumber || currentWeekNumber);
    const endOfWeek = getEndOfWeekByWeekNumber(currentDate.getFullYear(), weekNumber || currentWeekNumber);

    const formattedStartOfWeek = formatDate(startOfWeek);
    const formattedEndOfWeek = formatDate(endOfWeek);

    return { startOfWeek, endOfWeek, weekNumber: currentWeekNumber, formattedStartOfWeek, formattedEndOfWeek };
};

export const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const getStartOfWeekByWeekNumber = (year: number, weekNumber: number): Date => {
    const januaryFirst = new Date(year, 0, 1);
    const daysOffset = (weekNumber - 1) * 7;
    const daysOffsetDate = new Date(januaryFirst.getTime() + daysOffset * 86400000);
    const startOfWeek = new Date(daysOffsetDate);
    startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() + 1) % 7);
    return startOfWeek;
};

const getEndOfWeekByWeekNumber = (year: number, weekNumber: number): Date => {
    const startOfWeek = getStartOfWeekByWeekNumber(year, weekNumber);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
};

const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };

    return date.toLocaleDateString(undefined, options);
};