import React, { isValidElement, createElement } from 'react';
import { generate } from 'shortid';
import { Consumer } from './IntlContext';
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
    <Consumer>
      {(intl) => {
        const formattedMessage = intl.formatMessage(id, {
          defaultMessage,
          values: tokenizedValues,
        });

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
    </Consumer>
  );
};

export default FormattedMessage;
