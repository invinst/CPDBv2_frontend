import React, { PropTypes, Component } from 'react';

import OfficerCard from 'components/landing-page/activity-grid/officer-card';
import FixedHeightGrid from 'components/common/fixed-height-grid';
import { searchBoxHeight } from 'components/search-page/search-page.style';
import { tagsWrapperHeight } from 'components/search-page/search-tags.style';
import { viewportHeight } from 'utils/dom';


export default class SuggestedCards extends Component {
  componentDidMount() {
    const { cards, requestActivityGrid } = this.props;
    if (cards.length === 0) {
      requestActivityGrid();
    }
  }

  render() {
    const { cards } = this.props;
    const visualTokenStyle = { height: '144px' };
    const cardStyle = { width: '176px' }; // 144px (visual token) + 32px (text)
    const cardComponents = cards.map(({ id, fullName, visualTokenBackgroundColor }, index) =>
      <OfficerCard
        officerId={ id }
        fullName={ fullName }
        key={ index }
        visualTokenBackgroundColor={ visualTokenBackgroundColor }
        visualTokenStyle={ visualTokenStyle }
        cardStyle={ cardStyle }
      />
    );

    const availableHeight = viewportHeight() - searchBoxHeight - tagsWrapperHeight;

    return (
      <FixedHeightGrid
        style={ { display: 'inline-block', paddingTop: '32px' } }
        childHeight={ 230 }
        childWidth={ 176 }
        availableHeight={ availableHeight }
      >
        { cardComponents }
      </FixedHeightGrid>
    );
  }
}

SuggestedCards.propTypes = {
  cards: PropTypes.array,
  requestActivityGrid: PropTypes.func
};

SuggestedCards.defaultProps = {
  cards: [],
  requestActivityGrid: () => {}
};
