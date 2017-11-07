import React, { PropTypes, Component } from 'react';

import OfficerCard from './officer-card';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


export default class ActivityGrid extends Component {
  componentDidMount() {
    this.props.requestActivityGrid();
  }

  render() {
    const { cards } = this.props;
    const visualTokenStyle = { height: 'calc(25vw - 32px)', minHeight: '160px' };
    const cardStyle = { width: '25%' };

    return (
      <ResponsiveFluidWidthComponent>
        { cards.map(({ id, fullName, visualTokenBackgroundColor }) =>
          <OfficerCard
            officerId={ id }
            fullName={ fullName }
            key={ id }
            visualTokenBackgroundColor={ visualTokenBackgroundColor }
            visualTokenStyle={ visualTokenStyle }
            cardStyle={ cardStyle }
            />
          )
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
