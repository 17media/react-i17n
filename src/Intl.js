import { isValidElement } from 'react';
import IntlMessageFormat from 'intl-messageformat';
import memoizeFormatConstructor from 'intl-format-cache';
import { TOKEN_PREFIX, getRandomID } from './utils';

const getMessageFormatter = memoizeFormatConstructor(IntlMessageFormat);
const getNumberFormatter = memoizeFormatConstructor(global.Intl.NumberFormat);
const getDateTimeFormatter = memoizeFormatConstructor(
  global.Intl.DateTimeFormat
);

class Intl {
  constructor(locale, messages) {
    this.locale = locale;
    this.messages = messages;
  }

  setLocale = locale => {
    this.locale = locale;
  };

  updateMessages = updater => {
    this.messages = updater(this.messages);
  };

  formatMessage(id, { defaultMessage, values = {} }) {
    try {
      const tokens = new Map();

      const tokenizedValues = Object.keys(values).reduce((tokenized, key) => {
        let value = values[key];

        if (isValidElement(value)) {
          const tokenID = getRandomID();
          tokens.set(tokenID, value);

          value = tokenID;
        }

        return {
          ...tokenized,
          [key]: value,
        };
      }, {});

      const formattedMessage = getMessageFormatter(
        this.messages[this.locale][id],
        this.locale
      ).format(tokenizedValues);

      if (!tokens.size) {
        return formattedMessage;
      }

      const formattedMessageFragment = formattedMessage.split(
        new RegExp(`(${[...tokens.keys()].join('|')})`)
      );

      return formattedMessageFragment.map(
        message => (tokens.has(message) ? tokens.get(message) : message)
      );
    } catch (err) {
      return defaultMessage || '';
    }
  }

  formatNumber(value, options) {
    return getNumberFormatter(this.locale, options).format(value);
  }

  formatDateTime(value, options) {
    return getDateTimeFormatter(this.locale, options).format(value);
  }
}

export default Intl;
