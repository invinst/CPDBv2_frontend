import React, { Component, PropTypes } from 'react';

import Report from './report';
import { groupStyle, rightGutterStyle } from './report-group.style';


export const SINGLE_STORY_1 = 'SINGLE_STORY_1';
export const SINGLE_STORY_2 = 'SINGLE_STORY_2';
export const SINGLE_STORY_3 = 'SINGLE_STORY_3';
export const TWO_STORY = 'TWO_STORY';
export const FOUR_STORY = 'FOUR_STORY';

export default class ReportGroup extends Component {
  render() {
    const { reports, reportStyle, style, onReportClick } = this.props;

    return (
      <div style={ { ...groupStyle, ...style } }>
      {
        reports.map((report, ind) => (
          <Report
            key={ ind }
            report={ report }
            onClick={ onReportClick }
            style={ {
              title: reportStyle.title,
              base: {
                ...reportStyle.base,
                ...(ind % 2 ? {} : rightGutterStyle)
              }
            } }/>
        ))
      }
      </div>
    );
  }

}

ReportGroup.propTypes = {
  reports: PropTypes.array,
  onReportClick: PropTypes.func,
  reportStyle: PropTypes.object,
  style: PropTypes.object
};
