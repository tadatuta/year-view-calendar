import React, { Fragment } from 'react';
import { IDay, IEvent } from '../date';

interface IDayProps {
  day: IDay;
  isCurrent: boolean;
  events: IEvent[];
  isWeekend: boolean;
  isPassed: boolean;
  className?: string;
}

import { cnCalendar } from '..';

function getBackground(events: IEvent[]): string {
  if (events.length === 1) {
    return events[0].color;
  }

  // TODO: проверить больше 2 событий в день

  return 'linear-gradient(to bottom, ' + events.map(event => {
    return event.color + ' ' + (100 / events.length) + '%';
  }).join(', ') + ')';
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
      style={hasEvents ?
        { background: getBackground(events) } :
        undefined
      }
    >
      {isCurrent ?
        <span className={cnCalendar('DayInner')}>{currentDate}</span> :
        currentDate
      }
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
