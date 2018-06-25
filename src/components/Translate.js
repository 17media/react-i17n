import React, { createElement, Fragment } from 'react';
import { IntlConsumer } from '../IntlContext';

const Translate = ({ id, children, defaultMessage, values }) => (
  <IntlConsumer>
    {intl => {
      const message = intl.formatMessage(children || id, {
        defaultMessage,
        values,
      });

      if (typeof message === 'string') {
        return message;
      }

      return createElement(Fragment, {}, ...message);
    }}
  </IntlConsumer>
);

export default Translate;
