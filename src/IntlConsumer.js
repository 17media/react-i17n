import React, { PureComponent } from 'react';
import { Consumer } from './IntlContext';

const IntlConsumer = ({ fallbackMessage, children, ...props }) => (
  <Consumer>
    {({ intl, isTimeout }) => {
      const formatted = children(intl, {
        isTimeout,
      });

      if (formatted == null && isTimeout) {
        return fallbackMessage;
      }

      return formatted;
    }}
  </Consumer>
);

export default IntlConsumer;
