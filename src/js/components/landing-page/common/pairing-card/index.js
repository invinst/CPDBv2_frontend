import React, { Component, PropTypes } from 'react';

import PairingChart from 'components/landing-page/common/pairing-card/pairing-chart/index';
import { wrapperStyle, secondSectionStyle, firstOfficerStyle, secondOfficerStyle } from './pairing-card.style';
import OfficerInfo from 'components/landing-page/common/pairing-card/officer-info';


export default class PairingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null,
    };
    this.changeGradientDirection = this.changeGradientDirection.bind(this);
  }

  changeGradientDirection(direction) {
    this.setState({ direction: direction });
  }

  render() {
    const { officer1, officer2, coaccusalCount, openOfficerPage } = this.props;
    const { direction } = this.state;

    return (
      <div className='test--pair-card' style={ wrapperStyle(direction) }>
        <PairingChart
          coaccusalCount={ coaccusalCount }
          background1={ officer1.backgroundColor }
          background2={ officer2.backgroundColor }
        />
        <div style={ secondSectionStyle }>
          <OfficerInfo
            info={ officer1 }
            style={ firstOfficerStyle }
            openOfficerPage={ openOfficerPage }
            onMouseOver={ () => this.changeGradientDirection('right') }
            onMouseOut={ () => this.changeGradientDirection(null) }
          />
          <OfficerInfo
            info={ officer2 }
            style={ secondOfficerStyle }
            openOfficerPage={ openOfficerPage }
            onMouseOver={ () => this.changeGradientDirection('left') }
            onMouseOut={ () => this.changeGradientDirection(null) }
          />
        </div>
      </div>
    );
  }
}

PairingCard.propTypes = {
  officer1: PropTypes.object,
  officer2: PropTypes.object,
  coaccusalCount: PropTypes.number,
  openOfficerPage: PropTypes.func,
};

PairingCard.defaultProps = {
  openOfficerPage: () => {},
};
