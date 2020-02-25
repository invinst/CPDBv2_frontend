import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEmpty, omit } from 'lodash';

import {
  wrapperStyle, carouselStyle, itemStyle,
  headerWrapperStyle, titleStyle, descriptionStyle,
} from './officers.style';
import { showIntercomLauncher } from 'utils/intercom';
import OfficerCard from 'components/common/officer-card';
import Carousel from 'components/common/carousel';


export default class Officers extends Component {
  componentDidMount() {
    const { officers, requestOfficers, officerIds } = this.props;

    if (isEmpty(officers)) {
      requestOfficers(officerIds);
    }

    showIntercomLauncher(false);
  }

  render() {
    const { officers, title, description } = this.props;
    const itemWidth = 232;

    return (
      <div className='test--embed-officers-carousel' style={ wrapperStyle }>
        <div style={ headerWrapperStyle }>
          <h3 className='test--embed-officers-title' style={ titleStyle }>{ title }</h3>
          <div className='test--embed-officers-description' style={ descriptionStyle }>{ description }</div>
        </div>
        <Carousel
          style={ carouselStyle }
          childWidth={ itemWidth }
        >
          {
            officers.map(
              (officer) => (
                <div
                  key={ officer.id }
                  style={ itemStyle }
                >
                  <OfficerCard
                    { ...omit(officer, 'id') }
                    cardStyle={ { width: '232px', margin: 0 } }
                    visualTokenStyle={ { height: '100px' } }
                    openCardInNewPage={ true }
                    pinnable={ false }
                  />
                </div>
              )
            )
          }
        </Carousel>
      </div>
    );
  }
}

Officers.defaultProps = {
  officers: [],
  requestOfficers: () => {},
  description: '',
  title: 'Officers',
};

Officers.propTypes = {
  officers: PropTypes.array,
  requestOfficers: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  officerIds: PropTypes.string,
};

