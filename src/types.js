// @flow
import type { ComponentType, Node } from 'react';

export type Locale = string;

export type LocaleMessages = {
  [id: string]: string | LocaleMessages,
};

export type IntlProviderProps = {
  locale: Locale,
  messages: { [locale: Locale]: LocaleMessages },
  defaultLocale: Locale,
  loadingTimeout: number,
  WrappedComponent: ?ComponentType<*>,
  children: ?Node,
};
