import React, { Component, PropTypes } from 'react';

import Report from 'components/common/report/report';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import { groupStyle, responsiveWrapperStyle } from './report-group.style';
import { groupStyles } from './group-types';


export default class ReportGroup extends Component {
  responsiveStyle() {
    const { type } = this.props;
    const style = groupStyles[type];
    return {
      [EXTRA_WIDE]: {
        base: style[EXTRA_WIDE]
      },
      [DESKTOP]: {
        base: style[DESKTOP]
      },
      [TABLET]: {
        base: style[TABLET]
      }
    };
  }

  renderWithResponsiveStyle(responsiveStyle) {
    const { reports, reportType, onReportClick } = this.props;

    return (
      <div style={ { ...groupStyle, ...responsiveStyle.base } }>
        {
        reports.map((report, ind) => (
          <Report
            key={ ind }
            report={ report }
            onClick={ onReportClick }
            type={ reportType }/>
        ))
      }
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        style={ responsiveWrapperStyle }
        responsiveStyle={ this.responsiveStyle() }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }

}

ReportGroup.propTypes = {
  reports: PropTypes.array,
  onReportClick: PropTypes.func,
  type: PropTypes.number,
  reportType: PropTypes.number,
  reportStyle: PropTypes.object
};

ReportGroup.defaultProps = {
  type: 1,
  reports: []
};
