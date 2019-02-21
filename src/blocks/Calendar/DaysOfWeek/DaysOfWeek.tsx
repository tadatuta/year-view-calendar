import React from 'react';

import { cnCalendar } from '..';
import { getWeekDays } from '../date';

const weekDays = getWeekDays();

export function DaysOfWeek() {
    return (
        <tr className={cnCalendar('DaysOfWeek')}>
            {
                weekDays.map(dayOfWeek =>
                    <th key={dayOfWeek}>{dayOfWeek}</th>
                )
            }
        </tr>
    );
}
