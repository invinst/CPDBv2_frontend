import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { values, findKey } from 'lodash';
import cx from 'classnames';

import RelatedComplaintsCarouselContainer from 'containers/cr-page/related-complaints-carousel';
import { DISTANCE_OPTIONS } from 'utils/constants';
import Dropdown from 'components/common/dropdown';
import styles from './related-complaints.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';


export default class RelatedComplaints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDistance: '0.5mi',
    };
  }

  handleDistanceChange = (value) => {
    this.setState({
      selectedDistance: findKey(DISTANCE_OPTIONS, v => v === value),
    });
  };

  render() {
    const { crid } = this.props;
    const { selectedDistance } = this.state;
    return (
      <div className={ cx(styles.relatedComplaints, 'no-print') }>
        <div className={ responsiveContainerStyles.responsiveContainer }>
          <div className='related-complaints-header'>
            <h2 className='related-complaints-title'>Related Complaints</h2>
            <div className='related-complaints-filter'>
              WITHIN
              <Dropdown
                className='distance-filter'
                defaultValue={ DISTANCE_OPTIONS[selectedDistance] }
                options={ values(DISTANCE_OPTIONS) }
                onChange={ this.handleDistanceChange }
              />
              OF CR { crid }
            </div>
          </div>
        </div>
        <div className='carousels-wrapper'>
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
  crid: PropTypes.string,
};
