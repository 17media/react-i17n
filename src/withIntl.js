import React, { Component } from 'react';
import { IntlConsumer } from './IntlContext';

const withIntl = WrappedComponent =>
  class extends Component {
    static displayName = `withIntl(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Unknown'})`;

    render() {
      return (
        <IntlConsumer>
          {intl => <WrappedComponent {...this.props} intl={intl} />}
        </IntlConsumer>
      );
    }
  };

export default withIntl;
