import React, { Component } from 'react';
import IntlMessageFormat from 'intl-messageformat';
import Aux from './Aux';
import Intl from './Intl';
import { Provider } from './IntlContext';

class IntlProvider extends Component {
  static defaultProps = {
    loadingTimeout: 500, // 500 ms of blank instead of fallback message
    WrappedComponent: null, // default to not render the wrapper element
  };

  constructor(props) {
    super(props);

    this.state = {
      isTimeout: !props.loadingTimeout,
    };
  }

  componentDidMount() {
    this.setTimeout();
  }

  setTimeout = () => {
    if (!this.state.isTimeout) {
      this.timeout = global.setTimeout(() => {
        this.setState({
          isTimeout: true,
        });
      }, this.props.loadingTimeout);
    }
  };

  render() {
    const {
      locale,
      messages,
      defaultLocale,
      WrappedComponent,
      children,
    } = this.props;
    const { isTimeout } = this.state;
    const intl = new Intl(locale, messages, {
      defaultLocale,
    });

    const context = {
      intl,
      isTimeout,
      WrappedComponent,
    };

    return <Provider value={context}>{children}</Provider>;
  }
}

export default IntlProvider;
