import React, { Component, PropTypes } from 'react';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './new-visual-token-widget.sass';


export default class VisualTokenWidget extends Component {
  render() {
    const { items, visualTokenBackground } = this.props;
    return (
      <div className={ styles.wrapper }>
        <StaticRadarChart
          data={ items }
          backgroundColor={ visualTokenBackground }
        />
      </div>
    );
  }
}

VisualTokenWidget.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    axis: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })),
  visualTokenBackground: PropTypes.string,
};

