import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';

export const addLocaleData = (data = []) => {
  [].concat(data).forEach(localeData => {
    if (localeData && localeData.locale) {
      IntlMessageFormat.__addLocaleData(localeData);
      IntlRelativeFormat.__addLocaleData(localeData);
    }
  });
};
