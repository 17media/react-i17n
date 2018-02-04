import React, { PureComponent } from 'react';
import IntlConsumer from './IntlConsumer';

const FormattedNumber = ({ value, ...props }) => (
  <IntlConsumer>
    {intl => (
      intl.formatNumber(value, props)
    )}
  </IntlConsumer>
)

export default FormattedNumber;
