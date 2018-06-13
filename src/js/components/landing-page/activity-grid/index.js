import React, { PropTypes, Component } from 'react';
import { chunk } from 'lodash';

import OfficerCard from './officer-card';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import PairingCard from 'components/landing-page/activity-grid/pairing-card';
import { ACTIVITY_GRID_CARD_TYPES } from 'utils/constants';


export default class ActivityGrid extends Component {
  componentDidMount() {
    this.props.requestActivityGrid();
  }

  render() {
    const { cards } = this.props;
    console.log(cards)
    const visualTokenStyle = { height: '100px' };
    const cardStyle = { width: 'calc(25% - 32px)' }; // two 16px margins
    const rows = chunk(cards, 4);
    return (
      <ResponsiveFluidWidthComponent>
        {
          rows.map((cards, index) => (
            <div key={ `row-${index}` }>
              {
                cards.map(
                  (card) => {
                    if (card.type === ACTIVITY_GRID_CARD_TYPES.OFFICER) {
                      return <OfficerCard
                        officerId={ card.id }
                        fullName={ card.fullName }
                        key={ card.id }
                        visualTokenBackgroundColor={ card.visualTokenBackgroundColor }
                        visualTokenStyle={ visualTokenStyle }
                        cardStyle={ cardStyle }
                        complaintCount={ card.complaintCount }
                        sustainedCount={ card.sustainedCount }
                        complaintPercentile={ card.complaintPercentile }
                        birthYear={ card.birthYear }
                        race={ card.race }
                        gender={ card.gender }
                      />;
                    } else if (card.type === ACTIVITY_GRID_CARD_TYPES.PAIR) {
                      return <PairingCard
                        officer1={ card.officer1 }
                        officer2={ card.officer2 }
                      />;
                    }
                  }
                )
              }
            </div>
          ))
        }
      </ResponsiveFluidWidthComponent>
    );
  }
}

ActivityGrid.propTypes = {
  cards: PropTypes.array,
  requestActivityGrid: PropTypes.func
};

ActivityGrid.defaultProps = {
  requestActivityGrid: () => {}
};
