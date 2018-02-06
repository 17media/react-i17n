import React, { isValidElement, createElement } from 'react';
import { generate } from 'shortid';
import IntlConsumer from './IntlConsumer';
import Aux from './Aux';

const FormattedMessage = ({ id, defaultMessage, values = {}, WrappedComponent, ...props }) => {
  const elements = new Map();

  const tokenizedValues = Object.keys(values)
    .reduce((obj, key) => {
      let value = values[key];

      if (isValidElement(value)) {
        const token = generate();
        elements.set(token, value);
        value = token;
      }

      return {
        ...obj,
        [key]: value,
      };
    }, {});

  return (
    <IntlConsumer>
      {(intl) => {
        const formatted = {
          isFallback: intl.shouldUseFallback(id),
          WrappedComponent,
          children: intl.formatMessage(
            {
              id,
              defaultMessage,
            },
            tokenizedValues
          ),
        };

        const tokens = Array.from(elements.keys());

        // no react elements found in values, return simple string
        if (!tokens.length) {
          return formatted;
        }

        const tokensRegex = new RegExp(`(${tokens.join('|')})`, 'g');

        formatted.children = formatted.children.split(tokensRegex)
          .filter(Boolean)
          .map(token => elements.has(token) ? elements.get(token) : token);

        return formatted;
      }}
    </IntlConsumer>
  );
};

export default FormattedMessage;
