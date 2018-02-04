import React, { PureComponent } from 'react';
import IntlConsumer from './IntlConsumer';

const FormattedDate = ({ value, ...props }) => (
  <IntlConsumer>
    {intl => (
      intl.formatDate(value, props)
    )}
  </IntlConsumer>
)

export default FormattedDate;
