import React, { PropTypes, Component } from 'react';

import OfficerCard from 'components/common/officer-card';
import FixedHeightGrid from 'components/common/fixed-height-grid';
import { searchBoxHeight } from 'components/search-page/search-page.style';
import { tagsWrapperHeight } from 'components/search-page/search-tags.style';
import { viewportHeight } from 'utils/dom';
import { wrapperStyle, cardStyle } from './suggested-cards.style';


export default class SuggestedCards extends Component {
  componentDidMount() {
    const { cards, requestActivityGrid } = this.props;
    if (cards.length === 0) {
      requestActivityGrid();
    }
  }

  render() {
    const { cards } = this.props;
    const cardComponents = cards.map(
      (card, index) => (
        <OfficerCard
          { ...card }
          key={ index }
          style={ cardStyle }
        />
      )
    );

    const availableHeight = viewportHeight() - searchBoxHeight - tagsWrapperHeight;

    return (
      <FixedHeightGrid
        style={ wrapperStyle }
        childHeight={ 314 } // 282 + 16*2
        childWidth={ 264 } // 232 + 16*2
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
