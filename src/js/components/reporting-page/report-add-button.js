import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import { buttonStyle, responsiveWrapperStyle, hiderStyle } from './report-add-button.style';


export default class ReportAddButton extends Component {

  renderWithResponsiveStyle(responsiveStyle) {
    const { onClick } = this.props;

    return (
      <div onClick={ onClick } style={ responsiveStyle.button }>
        [+]
        <div style={ responsiveStyle.hider }/>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        style={ responsiveWrapperStyle }
        responsiveStyle={ {
          [EXTRA_WIDE]: {
            button: buttonStyle[EXTRA_WIDE],
            hider: hiderStyle[EXTRA_WIDE]
          },
          [DESKTOP]: {
            button: buttonStyle[DESKTOP],
            hider: hiderStyle[DESKTOP]
          },
          [TABLET]: {
            button: buttonStyle[TABLET],
            hider: hiderStyle[TABLET]
          }
        } }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>

    );
  }
}

ReportAddButton.propTypes = {
  onClick: PropTypes.func
};
