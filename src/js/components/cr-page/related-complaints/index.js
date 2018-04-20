import React, { PropTypes, Component } from 'react';

import RelatedComplaintsCarouselContainer from 'containers/cr-page/related-complaints-carousel';
import { DISTANCE_OPTIONS } from 'utils/constants';
import Dropdown from './dropdown';
import { wrapperStyle, titleStyle, headerStyle, filterStyle } from './related-complaints.style';


export default class RelatedComplaints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDistance: '10mi'
    };
  }

  handleDistanceChange(value) {
    this.setState({
      selectedDistance: value
    });
  }

  render() {
    const { crid } = this.props;
    const { selectedDistance } = this.state;
    return (
      <div style={ wrapperStyle }>
        <div style={ headerStyle }>
          <h2 style={ titleStyle }>Related Complaints</h2>
          <div style={ filterStyle }>
            WITHIN
            <Dropdown
              value={ selectedDistance }
              options={ DISTANCE_OPTIONS }
              onChange={ this.handleDistanceChange.bind(this) } />
            OF CR { crid }
          </div>
        </div>
        <RelatedComplaintsCarouselContainer
          selectedDistance={ selectedDistance }
          crid={ crid }
          match='categories'
          title='RELATED BY CATEGORY'/>
        <RelatedComplaintsCarouselContainer
          selectedDistance={ selectedDistance }
          crid={ crid }
          match='officers'
          title='RELATED BECAUSE OF OFFICERS INVOLVED'/>
      </div>
    );
  }
}

RelatedComplaints.propTypes = {
  crid: PropTypes.string
};
