/**
 * Fragment polyfill to support react < 16.2
 */
import { Fragment } from 'react';

const Aux = ({ children }) => children;

Aux.displayName = 'Aux';

export default Fragment || Aux;
