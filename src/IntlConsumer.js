import React, { PureComponent } from 'react';
import { Consumer } from './IntlContext';

const IntlConsumer = ({ fallbackMessage, children }) => (
  <Consumer>
    {({ intl, isTimeout, WrappedComponent }) => {
      let formatted = children(intl, {
        isTimeout,
      });

      if (formatted == null && isTimeout) {
        formatted = fallbackMessage;
      }

      return WrappedComponent
        ? (
          <WrappedComponent>{formatted}</WrappedComponent>
        )
        : formatted;
    }}
  </Consumer>
);

export default IntlConsumer;
