import React from 'react';
import { Provider } from '../IntlContext';
import Intl from '../Intl';

class IntlProvider extends React.PureComponent {
  static getDerivedStateFromProps(props, state) {
    if (
      state.intl.locale !== props.locale ||
      state.intl.messages !== props.messages
    ) {
      return {
        intl: new Intl(props.locale, props.messages),
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      intl: new Intl(props.locale, props.messages),
    };
  }

  render() {
    const { intl } = this.state;
    const { children } = this.props;

    return <Provider value={intl}>{children}</Provider>;
  }
}

export default IntlProvider;
