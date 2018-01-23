import React, { Component, PropTypes } from 'react';
import Carousel from 'components/common/carousel';

export default class OfficersByAllegation extends Component {

  componentDidMount() {
    this.props.requestActivityGrid();
  }

  render() {
    let { cards } = this.props;
    const recentActivityText = (
      <div>
        The officers, pairings, and units we display here are based on what other guests are
        searching on cpdp in addition to officers who are mentioned in conversation with our twitter bot,
        <a href='#'>@cpdpbot</a>
      </div>
    );
    return (
      <div className='test--recent-activity'>
        <Carousel header='Recent Activity' description={ recentActivityText } data={ cards }/>
      </div>
    );
  }
}

OfficersByAllegation.propTypes = {
  cards: PropTypes.array,
  requestActivityGrid: PropTypes.func
};
