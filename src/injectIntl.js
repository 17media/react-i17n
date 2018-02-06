import React, { Component } from 'react';
import IntlConsumer from './IntlConsumer';

const injectIntl = WrappedComponent => class extends Component {
  static displayName = `injectIntl(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  render() {
    return (
      <IntlConsumer>
        {intl => ({
          WrappedComponent: null,
          children: (
            <WrappedComponent
              intl={intl}
              {...this.props}
            />
          ),
        })}
      </IntlConsumer>
    )
  }
}

export default injectIntl
