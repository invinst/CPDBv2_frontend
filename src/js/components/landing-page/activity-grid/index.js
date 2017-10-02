import React, { PropTypes, Component } from 'react';

import OfficerCard from './officer-card';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


export default class ActivityGrid extends Component {
  componentDidMount() {
    this.props.requestActivityGrid();
  }

  render() {
    const { cards } = this.props;
    return (
      <ResponsiveFluidWidthComponent>
        { cards.map(({ id, fullName, visualTokenBackgroundColor }) =>
          <OfficerCard
            officerId={ id }
            fullName={ fullName }
            key={ id }
            visualTokenBackgroundColor={ visualTokenBackgroundColor }/>)
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
