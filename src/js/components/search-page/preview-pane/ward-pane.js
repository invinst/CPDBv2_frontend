import React, { Component, PropTypes } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  SeparatorWidget,
  TextWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
} from './widgets';


export default class WardPane extends Component {
  render() {
    const {
      name,
      allegationCount,
      mostCommonComplaint,
      officersMostComplaint,
      alderman,
      url,
    } = this.props;
    return (
      <WidgetWrapper>
        <HeaderWidget title={ `WARD #${name}` }/>
        <SeparatorWidget/>
        <AllegationCountWidget url={ url } numOfAllegations={ allegationCount }/>
        <TextWidget title={ 'CURRENT ALDERMAN' } content={ alderman }/>
        <ListWidget
          typeName={ 'allegation' }
          showAvatar={ false }
          title='MOST COMMON COMPLAINT'
          items={ mostCommonComplaint }
        />
        <ListWidget
          typeName={ 'allegation' }
          title='OFFICERS WITH MOST COMPLAINTS'
          items={ officersMostComplaint }/>
        <CallToActionWidget url={ url }/>
      </WidgetWrapper>
    );
  }
}

WardPane.defaultProps = {
  alderman: null
};

WardPane.propTypes = {
  name: PropTypes.string.isRequired,
  allegationCount: PropTypes.number.isRequired,
  mostCommonComplaint: PropTypes.array.isRequired,
  officersMostComplaint: PropTypes.array.isRequired,
  alderman: PropTypes.string,
  url: PropTypes.string.isRequired,
};


