import React from 'react';

import { storiesOf } from '@storybook/react';

import { Calendar } from './Calendar';

import data from '../../events.js';

storiesOf('Calendar', module).add('default', () => (
    <Calendar data={data} />
));
