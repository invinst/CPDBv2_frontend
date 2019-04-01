import React, { Component, PropTypes } from 'react';

import RelevantCoaccusalCard from './relevant-coaccusal-card';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/relevant-infinite-carousel';

export default class RelevantCoaccusals extends Component {
  render() {
    const { coaccusals } = this.props;
    console.warn('coaccusals', coaccusals);
    if (!coaccusals)
      return null;

    return (
      <RelevantInfiniteCarousel title='COACCUSALS' childWidth={ 148 }>
        {
          coaccusals.map(coaccusal =>
            <div key={ coaccusal.id  } style={ { width: '148px' } }>
              <RelevantCoaccusalCard { ...coaccusal }/>
            </div>
          )
        }
      </RelevantInfiniteCarousel>
    )
  }
}

RelevantCoaccusals.propTypes = {
  coaccusals: PropTypes.arrayOf(PropTypes.object),
};

RelevantCoaccusals.defaultProps = {
  coaccusals: []
};
