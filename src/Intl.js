import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import memoizeIntlConstructor from 'intl-format-cache';

const toDate = value => value instanceof global.Date ? value : new Date(value);

class Intl {
  constructor(locale, messages) {
    this.locale = locale;
    this.messages = messages;

    this.formatters = {
      getDateTimeFormat: memoizeIntlConstructor(global.Intl.DateTimeFormat),
      getNumberFormat: memoizeIntlConstructor(global.Intl.NumberFormat),
      getMessageFormat: memoizeIntlConstructor(IntlMessageFormat),
      getRelativeFormat: memoizeIntlConstructor(IntlRelativeFormat),
    };
  }

  shouldUseFallback = (id) => {
    return !(this.messages[this.locale] && this.messages[this.locale][id]);
  }

  formatMessage = ({ id, defaultMessage = '' }, values = {}) => {
    if (this.shouldUseFallback(id)) {
      // no message found and fallback to default message
      return this.formatters.getMessageFormat(defaultMessage, this.locale).format(values);
    }

    // message found, format and return
    const intlMessage = this.formatters.getMessageFormat(this.messages[this.locale][id], this.locale);
    return intlMessage.format(values);
  }

  formatNumber = (value, options = {}) => {
    return this.formatters.getNumberFormat(this.locale, options).format(value);
  }

  formatDate = (value, options = {}) => {
    const date = toDate(value);
    return this.formatters.getDateTimeFormat(this.locale, options).format(date);
  }

  formatTime = (value, options = {}) => {
    return this.formatDate(value, {
      hour: 'numeric',
      minute: 'numeric',
      ...options,
    });
  }

  formatRelative = (value, options = {}) => {
    const date = toDate(value);
    const intlRelative = this.formatters.getRelativeFormat(this.locale, options);
    return intlRelative.format(date);
  }
}

export default Intl;
