import React, { PureComponent } from 'react';
import IntlConsumer from './IntlConsumer';

const FormattedTime = ({ value, WrappedComponent, ...props }) => (
  <IntlConsumer>
    {intl => ({
      WrappedComponent,
      children: intl.formatTime(value, props),
    })}
  </IntlConsumer>
)

export default FormattedTime;
