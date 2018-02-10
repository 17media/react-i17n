// @flow
import type { ComponentType, Node } from 'react';

export type LocaleMessages = {
  [id: string]: string | LocaleMessages,
};

export type IntlProviderProps = {
  locale: string,
  messages: { [string]: LocaleMessages },
  loadingTimeout: number,
  WrappedComponent: ?ComponentType<*>,
  children: ?Node,
};
