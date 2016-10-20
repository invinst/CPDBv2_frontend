import React, { PropTypes, Component } from 'react';

import {
  reportWrapperStyle, publicationStyle, publishDateStyle,
  titleStyle, sourceWrapperStyle, hoverColorStyle, responsiveWrapperStyle
} from './report.style';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import Hoverable from 'components/common/higher-order/hoverable';


class Report extends Component {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        publication: publicationStyle.extraWide,
        publishDate: publishDateStyle.extraWide
      },
      [DESKTOP]: {
        publication: publicationStyle.desktop,
        publishDate: publishDateStyle.desktop
      },
      [TABLET]: {
        publication: publicationStyle.tablet,
        publishDate: publishDateStyle.tablet
      }
    };
  }

  renderWithResponsiveStyle(responsiveStyle) {
    const {
      report, onClick, style, hovering
    } = this.props;

    return (
      <div
        style={ { ...reportWrapperStyle, ...style.base } }
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
            ...titleStyle.base, ...style.title,
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
  style: PropTypes.object,
  hovering: PropTypes.bool
};

Report.defaultProps = {
  style: {}
};

export default Hoverable(Report);
