import React, { Component } from 'react'
import { render } from 'react-dom'

import { IntlProvider, FormattedMessage } from '../../src'

const messages = {
  HELLO_WORLD: 'Hello, {name}!',
};

const locale = 'zh-Hant';

class Demo extends Component {
  render() {
    return (
      <IntlProvider locale={locale} messages={messages}>
        <FormattedMessage
          id="HELLO_WORLD"
          defaultMessage="Hello World!"
          values={{
            name: <span>Kai Hao</span>,
          }}
        />
      </IntlProvider>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
