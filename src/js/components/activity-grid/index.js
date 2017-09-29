import React, { PropTypes, Component } from 'react';

import OfficerCard from './officer-card';
import { wrapperStyle } from './activity-grid.style';


export default class ActivityGrid extends Component {
  componentDidMount() {
    this.props.requestActivityGrid();
  }

  render() {
    const { cards } = this.props;
    return (
      <div style={ wrapperStyle }>
        { cards.map(({ id, fullName, visualTokenBackgroundColor }) =>
          <OfficerCard
            officerId={ id }
            fullName={ fullName }
            key={ id }
            visualTokenBackgroundColor={ visualTokenBackgroundColor }/>)
        }
      </div>
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
