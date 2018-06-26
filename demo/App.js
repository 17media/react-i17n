import React from 'react';
import { hot } from 'react-hot-loader';

import { Intl, IntlProvider, Relative } from '../src';
import zhHantLocaleData from '../src/locale-data/zh-Hant';
import messages from './messages';

Intl.addLocaleData(zhHantLocaleData);

const LOCALES = ['en', 'zh-Hant'];
const now = Date.now();

class App extends React.Component {
  state = {
    locale: LOCALES[0],
  };

  changeLocale = locale => {
    this.setState({
      locale,
    });
  };

  render() {
    const { locale } = this.state;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <select
          onChange={e => {
            this.changeLocale(e.target.value);
          }}
        >
          {LOCALES.map(lang => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <Relative>{now}</Relative>
      </IntlProvider>
    );
  }
}

export default hot(module)(App);
