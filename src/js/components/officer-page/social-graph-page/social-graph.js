import React, { PropTypes, Component } from 'react';

import D3Elements from './d3-elements';
import { whiteTwoColor } from 'utils/styles';
import { getVisualTokenShade } from 'utils/visual-token';
import { svgStyle, textStyle } from './social-graph.style';


export default class SocialGraph extends Component {
  render() {
    const { simulation, links } = this.props;
    /* istanbul ignore next */
    return (
      <svg
        width='1120'
        height='600'
        viewBox='-560 -300 1120 600'
        style={ svgStyle }
        className='test--social-graph'
      >
        <D3Elements
          elementName='line'
          dynamicAttrs={ {
            x1: d => d.source.x,
            y1: d => d.source.y,
            x2: d => d.target.x,
            y2: d => d.target.y
          } }
          staticAttrs={ {
            className: 'link',
            stroke: whiteTwoColor
          } }
          data={ links }
          simulation={ simulation }
        />

        <D3Elements
          elementName='circle'
          dynamicAttrs={ {
            cx: data => data.x,
            cy: data => data.y
          } }
          staticAttrs={ {
            r: '5',
            style: d => `fill: ${getVisualTokenShade(d.crs)};`
          } }
          data={ simulation.nodes() }
          simulation={ simulation }
        />

        <D3Elements
          elementName='text'
          dynamicAttrs={ {
            x: data => data.x - 5,
            y: data => data.y + 20
          } }
          staticAttrs={ {
            style: textStyle
          } }
          text={ data => data.name }
          data={ simulation.nodes() }
          simulation={ simulation }
        />
      </svg>
    );
  }
}

SocialGraph.propTypes = {
  simulation: PropTypes.object,
  links: PropTypes.array
};
