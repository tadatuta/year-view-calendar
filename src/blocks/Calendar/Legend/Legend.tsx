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
          .map(event => (
            <li className={cnCalendar('LegendItem')} style={{ color: event.color, fontSize: '50px', lineHeight: '24px' }}>
              <span style={{ fontSize: '14px', verticalAlign: 'middle' }}>
                <strong>
                  {
                    event.start.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
                  }
                </strong>
                {' '}
                {event.summary}
              </span>
            </li>
          ))
      }
    </ul>
  );
}
