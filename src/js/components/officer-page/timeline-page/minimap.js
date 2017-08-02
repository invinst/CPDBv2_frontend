import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import MinimapItem from './minimap-item';
import { wrapperStyle, yearStyle, itemsStyle, rowStyle } from './minimap.style';


export default class Minimap extends Component {
  constructor(props) {
    super(props);
    this.handleMinimapItemHover = this.handleMinimapItemHover.bind(this);
  }

  handleMinimapItemHover(index) {
    const { onItemHover } = this.props;
    onItemHover(index);
  }

  render() {
    const { minimap, hoveredItemIndex, selectedItemIndex, onItemClick } = this.props;
    return (
      <div style={ wrapperStyle }>
        { map(minimap, ({ year, items }) => (
          <div style={ rowStyle } key={ year }>
            <div className='test--year-label' style={ yearStyle }>{ year }</div>
            <div style={ itemsStyle }>
              { map(items, ({ kind, index }) => (
                <MinimapItem className='test--minimapitem' text={ kind }
                  key={ index } active={ selectedItemIndex === index }
                  onClick={ () => onItemClick(index) }
                  onHover={ (hovered) => this.handleMinimapItemHover(hovered ? index : null) }
                  timelineItemHovered={ hoveredItemIndex === index }/>
              )) }
            </div>
          </div>
        )) }
      </div>
    );
  }
}

Minimap.propTypes = {
  minimap: PropTypes.array,
  onItemClick: PropTypes.func,
  onItemHover: PropTypes.func,
  sortDescending: PropTypes.bool,
  hoveredItemIndex: PropTypes.number,
  selectedItemIndex: PropTypes.number
};

Minimap.defaultProps = {
  onItemHover: () => {},
  onItemClick: () => {}
};
