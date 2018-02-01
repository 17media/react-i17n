import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';

const toDate = value => value instanceof global.Date ? value : new Date(value);

class Intl {
  constructor(locale, messages) {
    this.locale = locale;
    this.messages = messages;
  }

  formatMessage(id, { defaultMessage, values = {} } = {} ) {
    let message;

    try {
      const intlMessage = new IntlMessageFormat(this.messages[this.locale][id], this.locale);
      message = intlMessage.format(values);
    } catch (err) {
      message = new IntlMessageFormat(defaultMessage, this.locale).format(values);
    }

    return message;
  }

  formatNumber(value, options = {}) {
    return new global.Intl.NumberFormat(this.locale, options).format(value);
  }

  formatDate(value, options = {}) {
    const date = toDate(value);
    return new global.Intl.DateTimeFormat(this.locale, options).format(date);
  }

  formatTime(value, options = {}) {
    return this.formatDate(value, {
      hour: 'numeric',
      minute: 'numeric',
      ...options,
    });
  }

  formatRelative(value, options = {}) {
    const date = toDate(value);
    const intlRelative = new IntlRelativeFormat(this.locale, options);
    return intlRelative.format(date);
  }
}

export default Intl;
