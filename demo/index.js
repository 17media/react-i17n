import React from 'react';
import ReactDOM from 'react-dom';

import { IntlProvider } from '../src';
import App from './App';
import messages from './messages';

ReactDOM.render(
  <IntlProvider locale="en" messages={messages}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
