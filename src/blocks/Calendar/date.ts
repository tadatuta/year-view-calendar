import { colors } from './colors';

/**
 * Возвращает индекс дня недели, начиная с понедельника
 * @param date Date - дата, для которой необходимо вернуть индекс
 */
function getDayOfWeekIndex(date: Date) {
    return (date.getDay() + 6) % 7;
}

/**
 * Возвращает массив названий дней недели для заданной локали
 * По-умолчанию ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
 * @param locale Локаль
 */
export function getWeekDays(locale = 'ru-Ru') {
    const weekDays: string[] = [];
    const toLocaleDateStringOpts = { weekday: 'short' };

    const dateIterator = new Date();

    for (let i = 0; i < 7; i++) {
        dateIterator.setDate(dateIterator.getDate() + 1);
        weekDays[getDayOfWeekIndex(dateIterator)] = dateIterator.toLocaleDateString(locale, toLocaleDateStringOpts);
    }

    return weekDays;
};

/**
 * Возвращает итератор по одному дню от startDate до endDate
 * @param startDate Date - дата начала
 * @param endDate Date — конечная дата
 */
export function *iterateByDay(startDate: Date, endDate: Date): IterableIterator<Date> {
    const dateIterator = new Date(startDate);

    while (dateIterator < endDate) {
        yield dateIterator;
        dateIterator.setDate(dateIterator.getDate() + 1);
    }
}

/**
 * Для переданной даты возвращает строку вида YYYYMMDD
 * @param date Date — дата
 */
export function getDayId(date: Date): string {
    const month = date.getMonth();
    const day = date.getDate();

    return [
        date.getFullYear(),
        (month < 10 ? '0' : '') + month,
        (day < 10 ? '0' : '') + day
    ].join('');
}

/**
 * Проверяет, что две даты — это один и тот же день
 * @param date1 Date
 * @param date2 Date
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    return getDayId(date1) === getDayId(date2);
}

export interface IDay {
    date: Date;
    meta?: IDayMeta;
}

interface IDayMeta {
    current?: boolean;
    otherMonth?: boolean;
}

/**
 * Генерирует массив из 12 месяцев, содержащих массивы недель, содержащие массивы дней
 * @param year number - год, для которого необходимо сгенерировать массив
 */
export function buildYearArr(year?: number) {
    if (!year) {
        const now = new Date();
        year = now.getFullYear();
    }

    const startDate = new Date(year, 0, 1); // 1st Jan of current year
    const dateIterator = new Date(startDate);
    const endDate = new Date(startDate);
    endDate.setFullYear(startDate.getFullYear() + 1);

    const yearArr : Array<Array<Array<IDay>>> = [];
    let weekIdx = 0;

    while (dateIterator < endDate) {
        const monthIdx = dateIterator.getMonth();

        if (!yearArr[monthIdx]) {
            weekIdx = 0;
            yearArr[monthIdx] = [];
        }

        const dayOfWeekIdx = getDayOfWeekIndex(dateIterator);

        if (!yearArr[monthIdx][weekIdx]) {
            yearArr[monthIdx][weekIdx] = [];

            // when month starts not on monday
            // keep the days of previous month
            for (let i = 0; i < dayOfWeekIdx; i++) {
                const prevDate = new Date(dateIterator);
                prevDate.setDate(prevDate.getDate() - dayOfWeekIdx + i);

                yearArr[monthIdx][weekIdx].push({
                    date: prevDate,
                    meta: {
                        otherMonth: true
                    }
                });
            }
        }

        yearArr[monthIdx][weekIdx][dayOfWeekIdx] = {
            date: new Date(dateIterator)
        };

        if (getDayOfWeekIndex(dateIterator) === 6) {
            weekIdx++;
        }

        dateIterator.setDate(dateIterator.getDate() + 1);
    }

    return yearArr;
}

export interface IEvent {
    start: Date;
    end: Date;
    summary?: string;
    description?: string;
    location?: string;
    url?: string;
    color: string;
}

export function icalToInternalFormat(icalData: any[]): IEvent[] {
    return icalData.map((origEvent, idx) => {
        return {
            start: new Date(origEvent.start),
            end: new Date(origEvent.end),
            summary: origEvent.summary,
            description: origEvent.description,
            location: origEvent.location,
            url: origEvent.url && origEvent.url.params.VALUE,
            color: colors[(idx % colors.length + 1) -1]
        };
    })
    .sort((a, b) => +a.start - +b.start); // TODO: check if it's really needed
}

type IEventsByDay = Record<string, IEvent[]>;

export function getEventsByDay(events: IEvent[]) {
    return events.reduce((acc: IEventsByDay, event, idx) => {
        const intervalIterator = iterateByDay(event.start, event.end);

        for (let date of intervalIterator) {
            const dayId = getDayId(date);

            acc[dayId] || (acc[dayId] = []);

            acc[dayId].push(event);
        }

        return acc;
    }, {} as IEventsByDay);
}
