import React, { Component, PropTypes } from 'react';

export default class PairingChart extends Component {
  render() {
    const { coaccused } = this.props;
    return (
      <div>
        { coaccused }
      </div>
    );
  }
}

PairingChart.propTypes = {
  coaccused: PropTypes.number,
};
