import React, { PureComponent } from 'react';
import { Consumer } from './IntlContext';

const FormattedTime = ({ value, ...props }) => (
  <Consumer>
    {intl => (
      intl.formatTime(value, props)
    )}
  </Consumer>
)

export default FormattedTime;
