import React, { PureComponent } from 'react';
import IntlMessageFormat from 'intl-messageformat';
import Aux from './Aux';
import Intl from './Intl';
import { Provider } from './IntlContext';

class IntlProvider extends PureComponent {
  static defaultProps = {
    loadingTimeout: 500, // 500 ms of blank instead of fallback message
    WrappedComponent: null, // default to not render the wrapper element
  };

  constructor(props) {
    super(props);

    this.state = {
      isTimeout: false,
    };
  }

  componentDidMount() {
    this.setTimeout();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isTimeout: false,
    }, () => {
      this.setTimeout();
    });
  }

  setTimeout = () => {
    this.timeout = global.setTimeout(() => {
      this.setState({
        isTimeout: true,
      });
    }, this.props.loadingTimeout);
  }

  render() {
    const { locale, messages, WrappedComponent, children } = this.props;
    const intl = new Intl(locale, messages);
    const { isTimeout } = this.state;

    const context = {
      intl,
      isTimeout,
      WrappedComponent,
    };

    return (
      <Provider value={context}>
        {children}
      </Provider>
    );
  }
}

export default IntlProvider;
