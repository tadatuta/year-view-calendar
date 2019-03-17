import React from 'react';

import { cnCalendar } from '..';
import { IEvent } from '../date';

interface ILegendProps {
  data: IEvent[];
}

export function Legend({ data }: ILegendProps) {
  return (
    <ul className={cnCalendar('Legend')}>
      {
        data
          .filter(event => event.summary)
          .map(event => {
            const eventStartStr = event.start.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
            const eventEndStr = event.end.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });

            return (<li
              className={cnCalendar('LegendItem')}
              style={{ color: event.color, fontSize: '50px', lineHeight: '24px' }}
              key={event.start.toString()}
            >
              <span style={{ fontSize: '14px', verticalAlign: 'middle' }}>
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
          }
        )
      }
    </ul>
  );
}
