import React, { Component } from 'react';

import {
  buildYearArr,
  getEventsByDay,
  parseHumanEvents,
  getDayId,
  isSameDay
} from './date';

import { cnCalendar } from '.';
import './Calendar.css';

import { Day } from './Day/Day';
import { DaysOfWeek } from './DaysOfWeek/DaysOfWeek';
import { Legend } from './Legend/Legend';

import data from '../../events.js';
// TODO: это преобразование должно быть снаружи компонента
const normalizedEvents = parseHumanEvents(data);
const events = getEventsByDay(normalizedEvents);

interface ICalendarProps {
  year?: number;
}

export class Calendar extends Component<ICalendarProps> {
  render() {
    const now = new Date();
    const year = buildYearArr(this.props.year || now.getFullYear());

    return (
      <div className={cnCalendar()}>
        <div className={cnCalendar('Year')}>
          {
            year.map((month, idx) => {
              const monthDate = new Date();
              monthDate.setMonth(idx);

              return (
                <div className={cnCalendar('Month')} key={idx}>
                  <h2 className={cnCalendar('MonthName')}>
                    {monthDate.toLocaleDateString('ru-RU', { month: 'long' })}
                  </h2>
                  <table className={cnCalendar('MonthTable')}><tbody>
                    <DaysOfWeek />
                    {
                      month.map((week, idx) => (
                        <tr className={cnCalendar('Week')} key={idx}>
                          {
                            week.map((day, idx) => {
                              const dayDate = day.date;
                              const dayId = getDayId(dayDate);
                              const currentEvents = events[dayId] || [];

                              return (<Day
                                day={day}
                                isCurrent={isSameDay(dayDate, now)}
                                isWeekend={idx > 4}
                                events={currentEvents}
                                isPassed={day.date < now}
                                key={dayId}
                              />);
                            })
                          }
                        </tr>
                      ))
                    }
                  </tbody></table>
                </div>
              );
            })
          }
        </div>
        <Legend data={normalizedEvents} />
      </div>
    );
  }
}
