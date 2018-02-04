import React, { Component } from 'react'
import { render } from 'react-dom'

import {
  IntlProvider,
  FormattedMessage,
  FormattedNumber,
  FormattedDate,
  FormattedRelative,
  addLocaleData,
} from '../../src'
import zhHantLocaleData from '../../src/locale-data/zh-Hant';

addLocaleData(zhHantLocaleData);

const messages = {
  'en': {
    'hello.world': 'Hello, {name}!',
    'dailyjack.elevator': 'When {name} is being locked up in the elevator, it\'s actually us being locked up outside of the elevator.',
  },
  'zh-Hant': {
    'hello.world': '嗨，{name}！',
    'dailyjack.elevator': '當 {name} 被關在電梯裡面，實際上是我們所有人被關在電梯外面。',
  },
};

const DEFAULT_LOCALE = 'zh-Hant';

class Blocker extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return this.props.children;
  }
}

class Demo extends Component {
  constructor() {
    super();

    this.state = {
      locale: DEFAULT_LOCALE,
    };
  }

  handleSwitchLocale = (e) => {
    this.setState({
      locale: e.target.value,
    });
  }

  render() {
    const { locale } = this.state;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <Blocker>
          <h1>
            <FormattedMessage
              id="hello.world"
              defaultMessage="Hello World!"
              values={{
                name: 'Jack',
              }}
            />
          </h1>
          <p>
            <FormattedMessage
              id="dailyjack.elevator"
              defaultMessage="當 {name} 被關在電梯裡面，實際上是我們所有人被關在電梯外面。"
              values={{
                name: <b>Jack</b>
              }}
            />
          </p>
          <p>
            <FormattedNumber
              value={12345}
              style="currency"
              currency="TWD"
            />
          </p>
          <p>
            <FormattedDate
              value={new Date()}
              year="numeric"
              month="2-digit"
              day="2-digit"
            />
          </p>
          <p>
            <FormattedRelative
              value={new Date()}
              updateInterval={1000}
            />
          </p>
        </Blocker>
        <select value={locale} onChange={this.handleSwitchLocale}>
          {Object.keys(messages).map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </IntlProvider>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
