import React, { Component } from 'react';
import { Consumer } from './IntlContext';

const injectIntl = WrappedComponent => class extends Component {
  static displayName = `injectIntl(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  render() {
    return (
      <Consumer>
        {intl => (
          <WrappedComponent intl={intl} />
        )}
      </Consumer>
    )
  }
}

export default injectIntl
