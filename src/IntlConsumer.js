import React, { createElement } from 'react';
import Aux from './Aux';
import { Consumer } from './IntlContext';

const IntlConsumer = ({ children }) => (
  <Consumer>
    {({ intl, isTimeout, WrappedComponent: defaultWrappedComponent }) => {
      const formatted = children(intl);
      let renderedChildren = Array.isArray(formatted.children)
        ? createElement(Aux, null, ...formatted.children)
        : formatted.children;

      // not yet timeout, show null when loading
      if (formatted.isFallback && !isTimeout) {
        renderedChildren = null;
      }

      const WrappedComponent = typeof formatted.WrappedComponent !== 'undefined'
        ? formatted.WrappedComponent
        : defaultWrappedComponent;

      if (WrappedComponent) {
        return (
          <WrappedComponent>
            {renderedChildren}
          </WrappedComponent>
        );
      }

      return renderedChildren;
    }}
  </Consumer>
);

export default IntlConsumer;
