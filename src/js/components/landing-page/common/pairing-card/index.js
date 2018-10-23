import React, { Component, PropTypes } from 'react';

import PairingChart from 'components/landing-page/common/pairing-card/pairing-chart';
import { wrapperStyle, secondSectionStyle, firstOfficerStyle, secondOfficerStyle } from './pairing-card.style';
import OfficerInfo from 'components/landing-page/common/pairing-card/officer-info';
import HalfPane from './half-pane';


export default class PairingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredPart: null
    };
  }

  handleHover(hoveredPart) {
    this.setState({ hoveredPart: hoveredPart });
  }

  render() {
    const { officer1, officer2, coaccusalCount } = this.props;
    const { hoveredPart } = this.state;

    return (
      <div className='test--pair-card' style={ wrapperStyle(hoveredPart) }>
        <PairingChart
          coaccusalCount={ coaccusalCount }
          background1={ officer1.backgroundColor }
          background2={ officer2.backgroundColor }
        />
        <div style={ secondSectionStyle }>
          <OfficerInfo
            hovering={ hoveredPart === 'left' }
            info={ officer1 }
            style={ firstOfficerStyle }
          />
          <OfficerInfo
            hovering={ hoveredPart === 'right' }
            info={ officer2 }
            style={ secondOfficerStyle }
          />
        </div>

        <HalfPane
          position='left'
          onHovering={ (hovering) => this.handleHover(hovering ? 'left' : null) }
          officerId={ officer1.id }
        />
        <HalfPane
          position='right'
          onHovering={ (hovering) => this.handleHover(hovering ? 'right': null) }
          officerId={ officer2.id }
        />
      </div>
    );
  }
}

PairingCard.propTypes = {
  officer1: PropTypes.object,
  officer2: PropTypes.object,
  coaccusalCount: PropTypes.number,
};
