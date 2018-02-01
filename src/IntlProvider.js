import React, { PureComponent } from 'react';
import IntlMessageFormat from 'intl-messageformat';
import Intl from './Intl';
import { Provider } from './IntlContext';

class IntlProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      intl: new Intl(props.locale, props.messages),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      intl: new Intl(nextProps.locale, nextProps.messages),
    });
  }

  render() {
    const { children } = this.props;
    const { intl } = this.state;

    return (
      <Provider value={intl}>
        {children}
      </Provider>
    );
  }
}

export default IntlProvider;
