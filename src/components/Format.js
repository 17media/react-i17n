import React from 'react';
import { IntlConsumer } from '../IntlContext';
import Translate from './Translate';

const Format = ({ children: value, ...props }) => (
  <IntlConsumer>
    {intl => {
      if (typeof value === 'number') {
        return intl.formatNumber(value, props);
      } else if (value instanceof global.Date || Date.parse(value)) {
        return intl.formatDateTime(value, props);
      } else if (typeof value === 'string') {
        return <Translate {...props}>{value}</Translate>;
      }

      throw new Error(`Error parsing value ${value} in <Format> children`);
    }}
  </IntlConsumer>
);

export default Format;
