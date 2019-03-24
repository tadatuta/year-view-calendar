import React from 'react';

import { cnCalendar } from '..';
import { IEvent } from '../date';

interface ILegendProps {
  data: IEvent[];
}

export function Legend({ data }: ILegendProps) {
  const filteredData = data.filter(event => event.summary);

  interface IColorLegend {
    [key: string]: string;
  }

  const colorLegend = filteredData.reduce((acc: IColorLegend, event) => {
    acc[event.color] = event.type || '???';

    return acc;
  }, {} as IColorLegend);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let isTodayMarked = false;

  return (
    <div className={cnCalendar('Legend')}>
      <ul className={cnCalendar('LegendList')}>
        {
          Object.keys(colorLegend).map((color, idx) => (
            <li
              className={cnCalendar('LegendItem')}
              style={{ color }}
              key={idx}
            >
              <span className={cnCalendar('LegendItemText')}>{colorLegend[color]}</span>
            </li>
          ))
        }
      </ul>
      <ul className={cnCalendar('LegendList')}>
        {
          filteredData.map((event, idx) => {
            const eventStartStr = event.start.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
            const eventEndStr = event.end.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
            let shouldMarkToday = false;

            if (!isTodayMarked && today < event.start) {
              isTodayMarked = true;
              shouldMarkToday = true;
            }

            return (<li
              className={cnCalendar('LegendItem', {
                passed: event.end < today,
                markToday: shouldMarkToday
              })}
              style={{ color: event.color }}
              key={event.start.toString() + idx}
            >
              <span className={cnCalendar('LegendItemText')}>
                <strong>
                  {
                    eventStartStr !== eventEndStr ?
                      [eventStartStr, eventEndStr].join('-') :
                      eventStartStr
                  }
                </strong>
                {' '}
                {event.summary}
              </span>
            </li>)
          })
        }
    </ul>
    </div>
  );
}
