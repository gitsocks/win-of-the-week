const getCurrentWeekNumber = () => {
    const now: Date = new Date();
    const startOfYear: Date = new Date(now.getFullYear(), 0, 1);
    const startOfWeek: Date = new Date(startOfYear);
    startOfWeek.setDate(startOfYear.getDate() + (1 - startOfYear.getDay()));

    const millisecondsPerWeek: number = 7 * 24 * 60 * 60 * 1000;
    const millisecondsSinceStartOfWeek: number = now.getTime() - startOfWeek.getTime();
    const weekNumber: number = Math.ceil(millisecondsSinceStartOfWeek / millisecondsPerWeek);

    return weekNumber;
};

export const getCurrentWeek = () => {
    const now: Date = new Date();

    const startOfTheWeek: Date = new Date(now);
    startOfTheWeek.setDate(now.getDate() - (now.getDay() + 6) % 7 + 1);
    const formattedStartOfTheWeek: string = startOfTheWeek.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const endOfTheWeek: Date = new Date(now);
    endOfTheWeek.setDate(now.getDate() + (5 - now.getDay()));
    const formattedEndOfTheWeek: string = endOfTheWeek.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return { startOfTheWeek: formattedStartOfTheWeek, endOfTheWeek: formattedEndOfTheWeek, weekNumber: getCurrentWeekNumber() };
};