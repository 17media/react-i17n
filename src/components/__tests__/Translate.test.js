import React from 'react';
import { create } from 'react-test-renderer';
import IntlProvider from '../IntlProvider';
import Translate from '../Translate';

describe('<Translate />', () => {
  const locale = 'en';
  const defaultMessageID = 'id';

  const messages = {
    [locale]: {
      [defaultMessageID]: '',
    },
  };

  afterEach(() => {
    messages[locale][defaultMessageID] = '';
  });

  test('translate simple message', () => {
    const message = 'Hello World!';

    messages[locale][defaultMessageID] = message;

    const testRenderer = create(
      <IntlProvider locale={locale} messages={messages}>
        <Translate>{defaultMessageID}</Translate>
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toBe(message);
  });

  test('fallback to default message if the id is not found', () => {
    const defaultMessage = 'Hello World!';

    const testRenderer = create(
      <IntlProvider locale={locale} messages={messages}>
        <Translate defaultMessage={defaultMessage}>no such id</Translate>
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toBe(defaultMessage);
  });

  test('fallback to empty string if both the id and defaultMessage are not found', () => {
    const testRenderer = create(
      <IntlProvider locale={locale} messages={messages}>
        <Translate>no such id</Translate>
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toBe('');
  });

  test('translate message with values', () => {
    const message = 'Hello {name}, Welcome to {site}!';
    const values = {
      name: 'Kai Hao',
      site: '17live',
    };

    messages[locale][defaultMessageID] = message;

    const testRenderer = create(
      <IntlProvider locale={locale} messages={messages}>
        <Translate values={values}>{defaultMessageID}</Translate>
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toBe('Hello Kai Hao, Welcome to 17live!');
  });

  test('translate message with react components as values', () => {
    const Link = props => <a {...props} />;

    const message = 'Hello {name}, Welcome to {site}!';
    const name = <b>Kai Hao</b>;
    const site = <Link href="https://17.live">17live</Link>;
    const values = {
      name,
      site,
    };

    messages[locale][defaultMessageID] = message;

    const testRenderer = create(
      <IntlProvider locale={locale} messages={messages}>
        <Translate values={values}>{defaultMessageID}</Translate>
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
    expect(testRenderer.root.findByType(Link)).toBeTruthy();
  });

  test('take id attribute when children is not specified', () => {
    const message = 'Hello World!';

    messages[locale][defaultMessageID] = message;

    const testRenderer = create(
      <IntlProvider locale={locale} messages={messages}>
        <Translate id={defaultMessageID} />
      </IntlProvider>
    );

    expect(testRenderer.toJSON()).toBe(message);
  });
});
