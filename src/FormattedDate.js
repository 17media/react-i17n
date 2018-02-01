import React, { PureComponent } from 'react';
import { Consumer } from './IntlContext';

const FormattedDate = ({ value, ...props }) => (
  <Consumer>
    {intl => (
      intl.formatDate(value, props)
    )}
  </Consumer>
)

export default FormattedDate;
