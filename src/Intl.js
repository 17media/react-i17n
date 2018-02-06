import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';

const toDate = value => value instanceof global.Date ? value : new Date(value);

class Intl {
  constructor(locale, messages) {
    this.locale = locale;
    this.messages = messages;
  }

  shouldUseFallback = (id) => {
    return !(this.messages[this.locale] && this.messages[this.locale][id]);
  }

  formatMessage = ({ id, defaultMessage = '' }, values = {}) => {
    if (this.shouldUseFallback(id)) {
      // no message found and fallback to default message
      return new IntlMessageFormat(defaultMessage, this.locale).format(values);
    }

    // message found, format and return
    const intlMessage = new IntlMessageFormat(this.messages[this.locale][id], this.locale);
    return intlMessage.format(values);
  }

  formatNumber = (value, options = {}) => {
    return new global.Intl.NumberFormat(this.locale, options).format(value);
  }

  formatDate = (value, options = {}) => {
    const date = toDate(value);
    return new global.Intl.DateTimeFormat(this.locale, options).format(date);
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
    const intlRelative = new IntlRelativeFormat(this.locale, options);
    return intlRelative.format(date);
  }
}

export default Intl;
