import React, { PropTypes, Component } from 'react';

import {
  reportWrapperStyle, publicationStyle, publishDateStyle,
  titleStyle, sourceWrapperStyle, hoverColorStyle, responsiveWrapperStyle
} from './report.style';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import Hoverable from 'components/common/higher-order/hoverable';
import reportTypes from './report-types';


class Report extends Component {
  responsiveStyle() {
    const { type } = this.props;
    const reportType = reportTypes[type];
    return {
      [EXTRA_WIDE]: {
        publication: publicationStyle.extraWide,
        publishDate: publishDateStyle.extraWide,
        base: reportType[EXTRA_WIDE].base,
        title: reportType[EXTRA_WIDE].title
      },
      [DESKTOP]: {
        publication: publicationStyle.desktop,
        publishDate: publishDateStyle.desktop,
        base: reportType[DESKTOP].base,
        title: reportType[DESKTOP].title
      },
      [TABLET]: {
        publication: publicationStyle.tablet,
        publishDate: publishDateStyle.tablet,
        base: reportType[TABLET].base,
        title: reportType[TABLET].title
      }
    };
  }

  renderWithResponsiveStyle(responsiveStyle) {
    const {
      report, onClick, hovering, wrapperStyle
    } = this.props;

    return (
      <div
        style={ { ...reportWrapperStyle, ...responsiveStyle.base, ...wrapperStyle } }
        onClick={ () => { onClick(report.id); } }
        onMouseOver={ () => this.setState({ hover: true }) }
        onMouseOut={ () => this.setState({ hover: false }) }>
        <div style={ sourceWrapperStyle }>
          <span
            className='link--transition'
            style={ {
              ...responsiveStyle.publication,
              ...(hovering ? hoverColorStyle : {})
            } }>
            { report.publicationName }
          </span>
          <span
            className='link--transition'
            style={ {
              ...responsiveStyle.publishDate,
              ...(hovering ? hoverColorStyle : {})
            } }>
            { report.publishDate }
          </span>
        </div>
        <div
          className='link--transition'
          style={ {
            ...titleStyle.base, ...responsiveStyle.title,
            ...(hovering ? hoverColorStyle : {})
          } }>
          { report.title }
        </div>
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

Report.propTypes = {
  report: PropTypes.object,
  onClick: PropTypes.func,
  hovering: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  type: PropTypes.number
};

Report.defaultProps = {
  style: {},
  type: 0
};

export default Hoverable(Report);
