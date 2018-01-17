import React, { Component } from 'react';
import IntlMessageFormat from 'intl-messageformat';
import { Provider } from './IntlContext';

class IntlProvider extends Component {
  static createIntl(locale, messages) {
    return {
      formatMessage: ({ id, values = {} }) => {
        const intlMessage = new IntlMessageFormat(messages[id], locale);
        return intlMessage.format(values);
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      locale: props.locale,
      messages: props.messages,
      intl: IntlProvider.createIntl(props.locale, props.messages),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.locale && nextProps.messages)
        && (nextProps.locale !== this.props.locale || nextProps.messages !== this.props.messages)
    ) {
      this.setState({
        locale: nextProps.locale,
        messages: nextProps.messages,
        intl: IntlProvider.createIntl(nextProps.locale, nextProps.messages),
      });
    }
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
