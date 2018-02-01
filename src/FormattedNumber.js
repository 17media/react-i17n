import React, { PureComponent } from 'react';
import { Consumer } from './IntlContext';

const FormattedNumber = ({ value, ...props }) => (
  <Consumer>
    {intl => (
      intl.formatNumber(value, props)
    )}
  </Consumer>
)

export default FormattedNumber;
