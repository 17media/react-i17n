import React, { isValidElement, createElement, Fragment } from 'react';
import { generate } from 'shortid';
import { Consumer } from './IntlContext';

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
        const formattedMessage = intl.formatMessage({
          id,
          values: tokenizedValues,
        });

        const tokens = Array.from(elements.keys());
        const tokensRegex = new RegExp(`(${tokens.join('|')})`, 'g');

        const nodes = formattedMessage.split(tokensRegex)
          .filter(Boolean)
          .map(token => elements.has(token) ? elements.get(token) : token);

        return createElement(Fragment, null, ...nodes);
      }}
    </Consumer>
  );
};

export default FormattedMessage;
