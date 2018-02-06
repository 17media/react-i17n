import React, { PureComponent } from 'react';
import IntlConsumer from './IntlConsumer';

const FormattedNumber = ({ value, WrappedComponent, ...props }) => (
  <IntlConsumer>
    {intl => ({
      WrappedComponent,
      children: intl.formatNumber(value, props),
    })}
  </IntlConsumer>
)

export default FormattedNumber;
