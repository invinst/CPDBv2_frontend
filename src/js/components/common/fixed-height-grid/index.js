import React, { PropTypes } from 'react';
import { chunk } from 'lodash';
import { columnStyle } from './fixed-height-grid.style';

function FixedHeightGrid(props) {
  const { children, childHeight, childWidth, availableHeight, style } = props;
  const numberOfRows = Math.max(1, Math.floor(availableHeight / childHeight));
  const columns = chunk(children, numberOfRows);

  return (
    <div style={ style }>
      { columns.map((column, index) => (
        <div
          className='test--fixed-height-grid-column'
          key={ index }
          style={ { ...columnStyle, width: childWidth } }
        >
          { column }
        </div>
      )) }
    </div>
  );
}

FixedHeightGrid.propTypes = {
  children: PropTypes.array,
  childHeight: PropTypes.number,
  childWidth: PropTypes.number,
  availableHeight: PropTypes.number,
  style: PropTypes.object,
};

FixedHeightGrid.defaultProps = {
  childHeight: 1,
  style: {},
};

export default FixedHeightGrid;
