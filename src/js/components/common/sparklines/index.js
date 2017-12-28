import React, { PropTypes } from 'react';
import { range, keyBy } from 'lodash';
import { Sparklines, SparklinesLine } from 'react-sparklines';

import HoverPoint from './hover-point';
import { getThisYear } from 'utils/date';
import { wrapperStyle, hoverOverlayStyle, sparklinesStyle, HEIGHT } from './sparklines.style';


export const width = 600;

export default class SimpleSparklines extends React.Component {
  constructor(props) {
    super(props);
  }

  fillEmptyDataYear(data, begin = 2000, end = 2017) {
    /* Fills empty years with previous data, to ensure no sudden jump between years
     */
    if (!data || data.length === 0) {
      return [];
    }
    const yearRange = range(begin, end + 1);
    const yearData = keyBy(data, 'year');
    let dummyRecord = Object.assign({}, data[0],
      { 'year': begin, count: 0, 'sustained_count': 0, 'aggCount': 0 });
    return yearRange.map(function (value) {
      if (value in yearData) {
        const currentYear = yearData[value];
        dummyRecord.aggCount += currentYear.count;
        return {
          ...currentYear,
          aggCount: dummyRecord.aggCount
        };
      }
      else {
        let result = Object.assign({}, dummyRecord);
        result['year'] = value;
        return result;
      }
    });
  }

  hoverPointClickHandler(year) {
    const { router, getTimelineLink } = this.props;
    router.push(getTimelineLink(year));
  }

  renderHoverPoints(data) {
    if (data.length === 0) {
      return [];
    }

    const length = data.length;
    const maxCount = data[length - 1]['count'];
    const minCount = data[0]['count'];
    const defaultHoverPointWidth = length === 1 ? width : width / (length - 1);
    const halfHoverPointWidth = defaultHoverPointWidth / 2;

    let currentSustainedCount = 0;
    return data.map((point, i) => {
      const { year, count } = point;
      const sustainedCount = point.sustained_count;
      let hoverPointWidth = defaultHoverPointWidth;
      let alignment = 'middle';
      if (length !== 1) {
        if (i === 0) {
          alignment = 'left';
          hoverPointWidth = halfHoverPointWidth;
        } else if (i === length - 1) {
          alignment = 'right';
          hoverPointWidth = halfHoverPointWidth;
        }
      }

      let hasSustainedCR = false;
      if (sustainedCount > currentSustainedCount) {
        hasSustainedCR = true;
        currentSustainedCount = sustainedCount;
      }

      const y = (count - minCount) / maxCount * HEIGHT + 3.5;
      return (
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
    });
  }

  render() {
    const { data, startYear } = this.props;
    const endYear = getThisYear();
    let filledData = this.fillEmptyDataYear(data, startYear, endYear);
    const sparklineData = filledData.map(d => d['aggCount']);
    return (
      <div className='test--sparkline' style={ wrapperStyle(width) }>
        <Sparklines
          data={ sparklineData }
          height={ HEIGHT }
          width={ width }
        >
          <SparklinesLine style={ sparklinesStyle }/>
        </Sparklines>
        <div style={ hoverOverlayStyle }>
          { this.renderHoverPoints(filledData) }
        </div>
      </div>
    );
  }
}

SimpleSparklines.propTypes = {
  data: PropTypes.array,
  router: PropTypes.object,
  officerId: PropTypes.number,
  startYear: PropTypes.number,
  getTimelineLink: PropTypes.func
};

SimpleSparklines.defaultProps = {
  data: [],
  minimapItems: []
};
