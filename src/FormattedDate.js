import React, { PureComponent } from 'react';
import IntlConsumer from './IntlConsumer';

const FormattedDate = ({ value, WrappedComponent, ...props }) => (
  <IntlConsumer>
    {intl => ({
      WrappedComponent,
      children: intl.formatDate(value, props),
    })}
  </IntlConsumer>
);

export default FormattedDate;
