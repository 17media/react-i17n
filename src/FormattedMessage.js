import React, { isValidElement, createElement } from 'react';
import { generate } from 'shortid';
import IntlConsumer from './IntlConsumer';
import Aux from './Aux';

const TOKEN_DELIMITER = generate();

const FormattedMessage = ({ id, defaultMessage, values = {} }) => {
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
      {(intl, { isTimeout }) => {
        const formattedMessage = intl.formatMessage({
          id,
          defaultMessage: isTimeout && defaultMessage,
        }, tokenizedValues);

        // return null early for Formatted to catch and show loading
        if (!formattedMessage) {
          return null;
        }

        const tokens = Array.from(elements.keys());

        if (!tokens.length) {
          return formattedMessage;
        }

        const tokensRegex = new RegExp(`(${tokens.join('|')})`, 'g');

        const nodes = formattedMessage.split(tokensRegex)
          .filter(Boolean)
          .map(token => elements.has(token) ? elements.get(token) : token);

        return createElement(Aux, null, ...nodes);
      }}
    </IntlConsumer>
  );
};

export default FormattedMessage;
