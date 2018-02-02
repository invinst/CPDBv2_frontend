import React, { PropTypes, Component } from 'react';
import { chunk } from 'lodash';

import OfficerCard from './officer-card';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


export default class ActivityGrid extends Component {
  componentDidMount() {
    this.props.requestActivityGrid();
  }

  render() {
    const { cards } = this.props;
    const visualTokenStyle = { height: '100px' };
    const cardStyle = { width: 'calc(25% - 32px)' }; // two 16px margins
    const rows = chunk(cards, 4);
    return (
      <ResponsiveFluidWidthComponent>
        {
          rows.map((cards, index) => (
            <div key={ index }>
              {
                cards.map(
                  ({
                     id,
                     fullName,
                     visualTokenBackgroundColor,
                     complaintCount,
                     sustainedCount,
                     birthYear,
                     race,
                     gender,
                     complaintPercentile
                   }) =>
                     <OfficerCard
                       officerId={ id }
                       fullName={ fullName }
                       key={ id }
                       visualTokenBackgroundColor={ visualTokenBackgroundColor }
                       visualTokenStyle={ visualTokenStyle }
                       cardStyle={ cardStyle }
                       complaintCount={ complaintCount }
                       sustainedCount={ sustainedCount }
                       complaintPercentile={ complaintPercentile }
                       birthYear={ birthYear }
                       race={ race }
                       gender={ gender }
                     />
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
  requestActivityGrid: () => {
  }
};
