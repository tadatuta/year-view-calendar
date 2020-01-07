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

    while (dateIterator <= endDate) {
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
    type?: string;
}

// TODO: actualy the structure is never used as is anywhere yet
// consider to simplify
const eventTypes = {
    WEEKEND: 'выходной',
    BUSINESS_TRIP: 'командировка',
    VACATION: 'отпуск',
    CONCERT: 'концерт',
    SUBBOTNIK: 'субботник',
    HIKE: 'поход',
    TRAINING: 'тренинг',
    FRIDAY: 'пЯТЬница',
    HACKATHON: 'хакатон',
    CALIBRATION: 'калибровк',
    UNKNOWN: ''
};

function getEventType(origEvent: any) {
    const text = (origEvent.summary + origEvent.description).toLowerCase();

    for (const type of Object.values(eventTypes)) {
        if (text.includes(type)) {
            return type;
        }
    }

    return eventTypes.UNKNOWN;
}

const getColor = (function() {
    const eventTypesVals = Object.values(eventTypes);

    return function(origEvent: any): string {
        return colors[eventTypesVals.indexOf(getEventType(origEvent))];
    }
})();

export function icalToInternalFormat(icalData: any[]): IEvent[] {
    return icalData.reduce((acc: IEvent[], origEvent, idx): IEvent[] => {
        if (origEvent.summary || origEvent.description) {
            acc.push({
                start: new Date(origEvent.start),
                end: new Date(origEvent.end),
                summary: origEvent.summary,
                description: origEvent.description,
                location: origEvent.location,
                url: origEvent.url && origEvent.url.params.VALUE,
                // TODO: not optimal
                color: getColor(origEvent),
                type: getEventType(origEvent)
            });
        }

        return acc;
    }, [])
    .sort((a, b) => +a.start - +b.start); // TODO: check if it's really needed
}

export type IEventsByDay = Record<string, IEvent[]>;

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

function humanDateToJs(humanDate: string, defaultYear?: number) {
    const [day, month, year] = humanDate.split('.');

    return new Date(+year || defaultYear || new Date().getFullYear(), +month - 1, +day);
}

export function parseHumanEvents(eventsDescription: string, defaultYear?: number): IEvent[] {
    const events = eventsDescription.split('\n');

    return events.map(event => {
        const [interval, ...eventsData] = event.split(/\s/);
        const [start, end] = interval.split('-');
        const [summary, ...descriptionData] = eventsData.join(' ').split('.');
        const description = descriptionData.join('.').trim();
        const parsedEvent = {
            start: humanDateToJs(start, defaultYear),
            end: humanDateToJs(end || start, defaultYear),
            summary,
            description
        } as IEvent;

        parsedEvent.type = getEventType(parsedEvent);
        parsedEvent.color = getColor(parsedEvent)

        return parsedEvent;
    })
    .sort((a, b) => (+a.start - +b.start) + (+a.end - +b.end))
}
