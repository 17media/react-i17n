import React from 'react';
import { create } from 'react-test-renderer';
import IntlProvider from '../IntlProvider';
import Format from '../Format';

describe('<Format />', () => {
  const locale = 'en';
  const messages = {};

  test('format number', () => {
    const number = Math.floor(Math.random() * 1000000);

    const testRenderer = create(
      <IntlProvider locale={locale} messages={messages}>
        <Format>{number}</Format>
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toBe(
      Intl.NumberFormat(locale).format(number)
    );
  });

  test('format number with options', () => {
    const number = Math.floor(Math.random() * 1000000);

    const testRenderer = create(
      <IntlProvider locale={locale} messages={messages}>
        <Format style="currency" currency="TWD">
          {number}
        </Format>
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toBe(
      Intl.NumberFormat(locale, { style: 'currency', currency: 'TWD' }).format(
        number
      )
    );
  });

  test('format date object', () => {
    const date = new Date();

    const testRenderer = create(
      <IntlProvider locale={locale} messages={messages}>
        <Format>{date}</Format>
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toBe(
      Intl.DateTimeFormat(locale).format(date)
    );
  });

  test('format date object with options', () => {
    const date = new Date();

    const testRenderer = create(
      <IntlProvider locale={locale} messages={messages}>
        <Format hour="2-digit" minute="2-digit" second="2-digit">
          {date}
        </Format>
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toBe(
      Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(date)
    );
  });

  test('format date string', () => {
    const date = new Date().toString();

    const testRenderer = create(
      <IntlProvider locale={locale} messages={messages}>
        <Format>{date}</Format>
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toBe(
      Intl.DateTimeFormat(locale).format(new Date(date))
    );
  });

  test('fallback to <Translate />', () => {
    const string = 'Hello World';
    const messageID = 'id';

    const testRenderer = create(
      <IntlProvider
        locale={locale}
        messages={{ [locale]: { [messageID]: string } }}
      >
        <Format>{messageID}</Format>
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toBe(string);
  });

  test('throw error for unknown value', () => {
    // suppress console.error() call when componentDidCatch catches error
    jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    const value = {};

    const expected = 'expected';

    class ErrorBoundary extends React.Component {
      state = {
        hasError: false,
      };

      componentDidCatch(error) {
        expect(error).toMatchSnapshot();

        this.setState({
          hasError: true,
        });
      }

      render() {
        return this.state.hasError ? expected : this.props.children;
      }
    }

    const testRenderer = create(
      <ErrorBoundary>
        <IntlProvider locale={locale} messages={messages}>
          <Format>{value}</Format>
        </IntlProvider>
      </ErrorBoundary>
    );

    expect(testRenderer.toJSON()).toBe(expected);

    console.error.mockRestore();
  });
});
