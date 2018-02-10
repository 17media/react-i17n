import PropTypes from 'prop-types';
import Intl from './Intl';

export const intlShape = PropTypes.instanceOf(Intl);

export const contextShape = PropTypes.objectOf({
  intl: intlShape.isRequired,
  isTimeout: PropTypes.bool.isRequired,
  WrappedComponent: PropTypes.node,
});
