// @flow
import React, { Component } from 'react';
import IntlMessageFormat from 'intl-messageformat';
import Aux from './Aux';
import Intl from './Intl';
import { Provider } from './IntlContext';
import type { IntlProviderProps } from './types';

type State = {
  isTimeout: boolean,
};

class IntlProvider extends Component<IntlProviderProps, State> {
  timeout: ?number;

  static defaultProps = {
    loadingTimeout: 500, // 500 ms of blank instead of fallback message
    WrappedComponent: null, // default to not render the wrapper element
  };

  constructor(props: IntlProviderProps) {
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
    const { locale, messages, WrappedComponent, children } = this.props;
    const { isTimeout } = this.state;
    const intl = new Intl(locale, messages);

    const context = {
      intl,
      isTimeout,
      WrappedComponent,
    };

    return <Provider value={context}>{children}</Provider>;
  }
}

export default IntlProvider;
