import React, { PropTypes, Component } from 'react';

import { textStyle, crStyle, circleStyle, wrapperStyle } from './legend.style';


export default class Legend extends Component {
  textContent(index) {
    const { mostCrs, leastCrs, nodeShades } = this.props;
    let text, cr;

    if (index === 0) {
      text = 'Officer with most Complaints';
      cr = mostCrs;
    } else if (index === nodeShades.length - 1) {
      text = 'Officer with least Complaints';
      cr = leastCrs;
    }

    return (
      <span>
        <span style={ textStyle }>{ text }</span>
        <span
          className='test--social-graph-legend-cr-num'
          style={ crStyle }>
          { cr }
        </span>
      </span>
    );
  }

  render() {
    const { nodeShades } = this.props;
    return (
      <div style={ wrapperStyle }>
        {
          nodeShades.map((shade, index) => (
            <div key={ index }>
              <span
                style={ circleStyle(shade) }
                className='test--social-graph-legend-shade'
              />
              { this.textContent(index) }
            </div>
          ))
        }
      </div>
    );
  }
}

Legend.propTypes = {
  mostCrs: PropTypes.number,
  leastCrs: PropTypes.number,
  nodeShades: PropTypes.array
};
