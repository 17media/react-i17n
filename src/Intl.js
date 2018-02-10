import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import memoizeIntlConstructor from 'intl-format-cache';

const toDate = value =>
  value instanceof global.Date ? value : new Date(value);

class Intl {
  constructor(locale, messages, options = {}) {
    this.locale = locale;
    this.messages = messages;

    this.defaultLocale = options.defaultLocale || this.locale;

    this.formatters = {
      getDateTimeFormat: memoizeIntlConstructor(global.Intl.DateTimeFormat),
      getNumberFormat: memoizeIntlConstructor(global.Intl.NumberFormat),
      getMessageFormat: memoizeIntlConstructor(IntlMessageFormat),
      getRelativeFormat: memoizeIntlConstructor(IntlRelativeFormat),
    };
  }

  shouldUseFallback = (id, locale = this.locale) => {
    return !(this.messages[locale] && this.messages[locale][id]);
  };

  formatMessage = ({ id, defaultMessage = '' }, values = {}) => {
    // no message found
    if (this.shouldUseFallback(id)) {
      // fallback to defaultMessage if possible
      if (defaultMessage || this.shouldUseFallback(id, this.defaultLocale)) {
        return this.formatters
          .getMessageFormat(defaultMessage, this.locale)
          .format(values);
      }

      // fallback to defaultLocale message
      return this.formatters
        .getMessageFormat(
          this.messages[this.defaultLocale][id],
          this.defaultLocale,
        )
        .format(values);
    }

    // message found, format and return
    const intlMessage = this.formatters.getMessageFormat(
      this.messages[this.locale][id],
      this.locale,
    );
    return intlMessage.format(values);
  };

  formatNumber = (value, options = {}) => {
    return this.formatters.getNumberFormat(this.locale, options).format(value);
  };

  formatDate = (value, options = {}) => {
    const date = toDate(value);
    return this.formatters.getDateTimeFormat(this.locale, options).format(date);
  };

  formatTime = (value, options = {}) => {
    return this.formatDate(value, {
      hour: 'numeric',
      minute: 'numeric',
      ...options,
    });
  };

  formatRelative = (value, options = {}) => {
    const date = toDate(value);
    const intlRelative = this.formatters.getRelativeFormat(
      this.locale,
      options,
    );
    return intlRelative.format(date);
  };
}

export default Intl;
