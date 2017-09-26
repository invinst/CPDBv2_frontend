import React, { PropTypes } from 'react';
import lodashFind from 'lodash/find';
import { Sparklines, SparklinesLine } from 'react-sparklines';

import HoverPoint from './hover-point';
import { wrapperStyle, hoverOverlayStyle, sparklinesStyle, HEIGHT } from './sparklines.style';


const width = 600;

export default class SimpleSparklines extends React.Component {
  hoverPointClickHandler(year) {
    const { router, selectMinimapItem, officerId, minimapItems } = this.props;
    router.push(`/officer/${officerId}/timeline/`);
    const index = lodashFind(minimapItems, item => item.year == year).items[0].index;
    selectMinimapItem(index);
    // TODO: This scrolling feature should be handled in Office Timeline itself via URL params
  }

  renderHoverPoints(data) {
    if ( data.length === 0 ) {
      return [];
    }
    const points = new Array(data.length);
    const length = data.length;
    const maxCount = data[length - 1]['count'];
    const minCount = data[0]['count'];
    const defaultHoverPointWidth = width / (length - 1);
    const halfHoverPointWidth = defaultHoverPointWidth / 2;

    let currentSustainedCount = 0;
    for (let i = 0; i < length; i++ ) {
      const { year, count, sustained_count } = data[i]; // eslint-disable-line camelcase
      const sustainedCount = sustained_count;           // eslint-disable-line camelcase
      let hoverPointWidth = defaultHoverPointWidth;
      let alignment = 'middle';
      if (i === 0) {
        alignment = 'left';
        hoverPointWidth = halfHoverPointWidth;
      } else if (i === length - 1) {
        alignment = 'right';
        hoverPointWidth = halfHoverPointWidth;
      }

      let hasSustainedCR = false;
      if (sustainedCount > currentSustainedCount) {
        hasSustainedCR = true;
        currentSustainedCount = sustainedCount;
      }

      const y = (count-minCount) / maxCount * HEIGHT + 3.5;
      points[i] = (
        <HoverPoint
          clickHandler={ this.hoverPointClickHandler.bind(this, year) }
          i={ i }
          y={ y }
          hasSustainedCR={ hasSustainedCR }
          width={ hoverPointWidth }
          alignment={ alignment }
          height={ HEIGHT }
          key={ 'hover-' + i }
          tooltipData={ { 'year': year, 'count': count } }
        />
      );
    }
    return points;
  }

  render() {
    const { data } = this.props;
    const sparklineData = data.map(d => d['count']);
    return (
      <div className='test--sparkline' style={ wrapperStyle(width) }>
        <Sparklines
          data={ sparklineData }
          height={ HEIGHT }
          width={ width }
        >
          <SparklinesLine style={ sparklinesStyle } />
        </Sparklines>
        <div style={ hoverOverlayStyle }>
          { this.renderHoverPoints(data) }
        </div>
      </div>
    );
  }
}

SimpleSparklines.propTypes = {
  data: PropTypes.array,
  router: PropTypes.object,
  selectMinimapItem: PropTypes.func,
  officerId: PropTypes.number,
  minimapItems: PropTypes.array
};

SimpleSparklines.defaultProps = {
  data: [],
  minimapItems: []
};
