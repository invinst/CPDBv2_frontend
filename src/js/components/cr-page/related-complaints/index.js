import React, { PropTypes, Component } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import RelatedComplaintsCarouselContainer from 'containers/cr-page/related-complaints-carousel';
import { DISTANCE_OPTIONS } from 'utils/constants';
import Dropdown from './dropdown';
import {
  wrapperStyle, titleStyle, headerStyle, filterStyle, carouselsWrapperStyle
} from './related-complaints.style';


export default class RelatedComplaints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDistance: '0.5mi'
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
        <ResponsiveFluidWidthComponent>
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
        </ResponsiveFluidWidthComponent>
        <div style={ carouselsWrapperStyle }>
          <RelatedComplaintsCarouselContainer
            distance={ selectedDistance }
            crid={ crid }
            match='categories'
            title='BY CATEGORY'/>
          <RelatedComplaintsCarouselContainer
            distance={ selectedDistance }
            crid={ crid }
            match='officers'
            title='BY OFFICERS INVOLVED'/>
        </div>
      </div>
    );
  }
}

RelatedComplaints.propTypes = {
  crid: PropTypes.string
};
