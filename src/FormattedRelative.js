import React, { PureComponent } from 'react';
import { Consumer } from './IntlContext';

const getUpdateTimeInterval = deltaTime => (
  [
    24 * 60 * 60 * 1000, // day
    60 * 60 * 1000, // hour
    60 * 1000, // minute
    1000, // second
  ]
    .find(updateTime => deltaTime > updateTime)
    || 1000
);

class FormattedRelative extends PureComponent {
  static defaultProps = {
    updateInterval: 10 * 1000, // 10 seconds
  };

  componentDidMount() {
    this.setInterval(this.props.updateInterval);
  }

  componentWillReceiveProps(nextProps) {
    this.dateTime = new Date(nextProps.value).getTime();

    if (nextProps.updateInterval !== this.props.updateInterval) {
      this.clearInterval();
      this.setInterval(nextProps.updateInterval);
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  clearInterval = () => {
    if (this.interval) {
      global.clearTimeout(this.interval);
    }
  }

  setInterval = (updateInterval) => {
    this.interval = global.setTimeout(
      () => {
        this.forceUpdate();

        this.clearInterval();
        this.setInterval(this.props.updateInterval)
      },
      Math.max(getUpdateTimeInterval(Date.now() - this.dateTime), updateInterval)
    );
  }

  render() {
    const { value, children, updateInterval, ...props } = this.props;

    return (
      <Consumer>
        {intl => {
          const formatted = intl.formatRelative(value, props);
          return typeof children === 'function'
            ? children(formatted)
            : formatted;
        }}
      </Consumer>
    );
  }
}

export default FormattedRelative;
