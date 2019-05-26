import React, { Component } from 'react';

import {
  buildYearArr,
  getEventsByDay,
  parseHumanEvents,
  getDayId,
  isSameDay,
  IEvent,
  IEventsByDay
} from './date';

import { cnCalendar } from '.';
import './Calendar.css';

import { Day } from './Day/Day';
import { DaysOfWeek } from './DaysOfWeek/DaysOfWeek';
import { Legend } from './Legend/Legend';

interface ICalendarProps {
  data: string;
  year?: number;
}

export class Calendar extends Component<ICalendarProps> {
  constructor(props: ICalendarProps) {
    super(props);

    // TODO: это преобразование должно быть снаружи компонента
    this.normalizedEvents = parseHumanEvents(this.props.data);
    this.events = getEventsByDay(this.normalizedEvents);
  }

  private events: IEventsByDay;

  private normalizedEvents: IEvent[];

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const now = new Date();
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);

      window.history.pushState(null, '', '#' + today.toLocaleDateString('en-US', { month: 'long' }));
    }
  }

  render() {
    const now = new Date();
    const year = buildYearArr(this.props.year || now.getFullYear());
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    return (
      <div className={cnCalendar()}>
        <div className={cnCalendar('Year')}>
          {
            year.map((month, idx) => {
              const monthDate = new Date();
              monthDate.setMonth(idx);

              return (
                <div className={cnCalendar('Month')} key={idx}>
                  <h2 className={cnCalendar('MonthName')} id={monthDate.toLocaleDateString('en-US', { month: 'long' })}>
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
                              const currentEvents = this.events[dayId] || [];

                              return (<Day
                                day={day}
                                isCurrent={isSameDay(dayDate, now)}
                                isWeekend={idx > 4}
                                events={currentEvents}
                                isPassed={day.date < today}
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
        <Legend data={this.normalizedEvents} />
      </div>
    );
  }
}
