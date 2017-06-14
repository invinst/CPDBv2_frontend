import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import MinimapItem from './minimap-item';
import { wrapperStyle, yearStyle, itemsStyle, rowStyle } from './minimap.style';


export default class Minimap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemIndex: null
    };
    this.handleMinimapItemClick = this.handleMinimapItemClick.bind(this);
    this.handleMinimapItemHover = this.handleMinimapItemHover.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sortDescending !== this.props.sortDescending) {
      this.setState({ selectedItemIndex: null });
    }
  }

  handleMinimapItemClick(index) {
    this.setState({ selectedItemIndex: index });
    const { onItemClick } = this.props;
    onItemClick(index);
  }

  handleMinimapItemHover(index) {
    const { onItemHover } = this.props;
    onItemHover(index);
  }

  render() {
    const { minimap, hoveredItemIndex } = this.props;
    const { selectedItemIndex } = this.state;
    return (
      <div style={ wrapperStyle }>
        { map(minimap, ({ year, items }) => (
          <div style={ rowStyle } key={ year }>
            <div className='test--year-label' style={ yearStyle }>{ year }</div>
            <div style={ itemsStyle }>
              { map(items, ({ kind, index }) => (
                <MinimapItem className='test--minimapitem' text={ kind }
                  key={ index } active={ selectedItemIndex === index }
                  onClick={ () => this.handleMinimapItemClick(index) }
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
  hoveredItemIndex: PropTypes.number
};

Minimap.defaultProps = {
  onItemHover: () => {},
  onItemClick: () => {}
};
