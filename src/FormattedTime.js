import React, { PureComponent } from 'react';
import IntlConsumer from './IntlConsumer';

const FormattedTime = ({ value, ...props }) => (
  <IntlConsumer>
    {intl => (
      intl.formatTime(value, props)
    )}
  </IntlConsumer>
)

export default FormattedTime;
