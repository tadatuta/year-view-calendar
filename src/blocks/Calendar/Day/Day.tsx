import React, { Fragment } from 'react';
import { IDay, IEvent } from '../date';
import { cnCalendar } from '..';

interface IDayProps {
  day: IDay;
  isCurrent: boolean;
  events: IEvent[];
  isWeekend: boolean;
  isPassed: boolean;
  className?: string;
}

function getBackground(events: IEvent[]): string {
  if (events.length === 1) {
    return events[0].color;
  }
  return 'linear-gradient(to bottom, ' +
    events.reduce((acc: string[], event, idx) => {
      acc.push(
        event.color + ' ' + (idx * 100 / events.length) + '%',
        event.color + ' ' + ((idx + 1) * 100 / events.length) + '%'
      );

      return acc;
    }, []).join(', ') +
    ')';
}

export function Day({ day, isCurrent, isWeekend, isPassed, events, className }: IDayProps) {
  const currentDate = day.date.getDate();
  const hasEvents = events.length > 0;

  return (
    <td
      className={cnCalendar('Day', {
        current: isCurrent,
        otherMonth: day.meta && day.meta.otherMonth,
        weekend: isWeekend,
        hasEvents: hasEvents,
        passed: isPassed
      }, [className])}
      tabIndex={1}
    >
      <div
        className={cnCalendar('DayText')}
        style={hasEvents ?
          { background: getBackground(events) } :
          undefined
        }
      >
        {currentDate}
      </div>
      {
        hasEvents && (
          <div className={cnCalendar('DayInfo')}>
            {events.map((event, idx) => (
              <Fragment key={idx}>
                <h3 className={cnCalendar('DayInfoSummary')}>{event.summary}</h3>
                <div className={cnCalendar('DayInfoDescription')}>
                  {
                    [
                      event.description,
                      event.location,
                      event.url
                    ]
                      .filter(Boolean)
                      .map((val, idx) => <p key={idx}>{val}</p>)
                  }
                </div>
              </Fragment>
            ))}
          </div>
        )
      }
    </td>
  );
}
