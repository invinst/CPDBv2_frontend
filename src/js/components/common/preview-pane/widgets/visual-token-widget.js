import PropTypes from 'prop-types';
import React from 'react';

import StaticRadarChart from 'components/common/radar-chart';
import { wrapperStyle } from './visual-token-widget.style';


export default function VisualTokenWidget(props) {
  const { items, visualTokenBackground } = props;
  return (
    <div style={ wrapperStyle }>
      <StaticRadarChart
        data={ items }
        backgroundColor={ visualTokenBackground }
      />
    </div>
  );
}

VisualTokenWidget.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    axis: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })),
  visualTokenBackground: PropTypes.string,
};

