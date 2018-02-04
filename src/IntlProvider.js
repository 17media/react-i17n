import React, { PureComponent } from 'react';
import IntlMessageFormat from 'intl-messageformat';
import Intl from './Intl';
import { Provider } from './IntlContext';

class IntlProvider extends PureComponent {
  static defaultProps = {
    loadingTimeout: 500, // 500 ms of blank instead of fallback message
  };

  constructor(props) {
    super(props);

    this.state = {
      intl: new Intl(props.locale, props.messages),
      isTimeout: false,
    };
  }

  componentDidMount() {
    this.setTimeout();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      intl: new Intl(nextProps.locale, nextProps.messages),
      isTimeout: false,
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
    const { children } = this.props;

    return (
      <Provider value={this.state}>
        {children}
      </Provider>
    );
  }
}

export default IntlProvider;
