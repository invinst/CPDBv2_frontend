import React, { Component, PropTypes } from 'react';
import Carousel from 'components/common/carousel';

export default class OfficersByAllegation extends Component {

  componentDidMount() {
    this.props.requestOfficersByAllegation();
  }

  render() {
    let { cards } = this.props;
    const officerByAllegationText = (
      <div>
        These are the officers with the most allegations of misconduct in Chicago.
      </div>
    );
    return (
      <div className='test--officers-by-allegation'>
        <Carousel header='Officers by Allegation'
          description={ officerByAllegationText }
          data={ cards }
        />
      </div>
    );
  }
}

OfficersByAllegation.propTypes = {
  cards: PropTypes.array,
  requestOfficersByAllegation: PropTypes.func
};
