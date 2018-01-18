import React, { Component } from 'react'
import { render } from 'react-dom'

import { IntlProvider, FormattedMessage } from '../../src'

const messages = {
  HELLO_WORLD: 'Hello, {name}!',
  CATS_AND_DOGS: 'I have {numCats} cats. You have {numDogs} dogs.',
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
        <FormattedMessage
          id="CATS_AND_DOGS"
          defaultMessage="Hello World!"
          values={{
            numCats: <span>2</span>,
            numDogs: <span>3</span>,
          }}
        />
      </IntlProvider>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
