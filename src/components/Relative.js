import React, { PureComponent } from 'react';
import withIntl from '../withIntl';
import { getNextInterestingTick } from '../utils';

class Relative extends PureComponent {
  constructor(props) {
    super(props);

    const { children: value, intl, ...options } = props;

    this.state = {
      formatted: intl.formatRelative(value, options),
    };
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate() {
    this.clearTimer();
    this.setValue();
    this.setTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  setValue = () => {
    const { children: value, intl, ...options } = this.props;

    this.setState({
      formatted: intl.formatRelative(value, options),
    });
  };

  clearTimer = () => {
    clearInterval(this.timer);
  };

  setTimer = () => {
    const { children: value } = this.props;

    const relativeMS = Math.abs(
      (typeof value === 'number' ? value : Date.parse(value)) - Date.now()
    );

    this.timer = setInterval(this.setValue, getNextInterestingTick(relativeMS));
  };

  render() {
    const { formatted } = this.state;

    return formatted;
  }
}

export default withIntl(Relative);
