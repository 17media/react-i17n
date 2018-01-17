import React, { isValidElement, createElement, Fragment } from 'react';
import { generate } from 'shortid';
import { Consumer } from './IntlContext';

const TOKEN_DELIMITER = generate();

const FormattedMessage = ({ id, defaultMessage, values }) => {
  const tokenizedValues = {};
  const elements = new Map();

  if (values && Object.keys(values).length > 0) {
    Object.keys(values)
      .forEach((key) => {
        const value = values[key];

        if (isValidElement(value)) {
          const token = generate();
          tokenizedValues[key] = `${TOKEN_DELIMITER}${token}${TOKEN_DELIMITER}`;
          elements.set(token, value);
        } else {
          tokenizedValues[key] = value;
        }
      });
  }

  return (
    <Consumer>
      {(intl) => {
        const formattedMessage = intl.formatMessage({
          id,
          values: tokenizedValues,
        });

        const nodes = formattedMessage.split(TOKEN_DELIMITER)
          .filter(Boolean)
          .map(token => elements.has(token) ? elements.get(token) : token);

        return createElement(Fragment, null, ...nodes);
      }}
    </Consumer>
  );
};

export default FormattedMessage;
