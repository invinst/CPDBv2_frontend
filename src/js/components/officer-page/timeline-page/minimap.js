import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import MinimapItem from './minimap-item';
import { wrapperStyle, yearStyle, itemsStyle, rowStyle } from './minimap.style';


export default class Minimap extends Component {
  render() {
    const { minimap } = this.props;
    return (
      <div style={ wrapperStyle }>
        { map(minimap, ({ year, items }) => (
          <div style={ rowStyle } key={ year }>
            <div style={ yearStyle }>{ year }</div>
            <div style={ itemsStyle }>
              { map(items, (item, index) => (
                <MinimapItem text={ item } key={ index }/>
              )) }
            </div>
          </div>
        )) }
      </div>
    );
  }
}

Minimap.propTypes = {
  minimap: PropTypes.array
};
