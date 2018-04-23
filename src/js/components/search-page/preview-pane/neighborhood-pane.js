import React, { Component, PropTypes } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
  SeparatorWidget,
} from './widgets';


export default class NeighborhoodPane extends Component {
  render() {
    const {
      name,
      allegationCount,
      mostCommonComplaint,
      officersMostComplaint,
    } = this.props;
    return (
      <WidgetWrapper>
        <HeaderWidget title={ name } showBottomBorder={ true }/>
        <SeparatorWidget/>
        <AllegationCountWidget numOfAllegations={ allegationCount }/>
        <ListWidget
          items={ mostCommonComplaint }
          typeName={ 'allegation' }
          showAvatar={ false }
          title={ 'MOST COMMON COMPLAINT' }
        />
        <ListWidget
          items={ officersMostComplaint }
          typeName={ 'allegation' }
          showAvatar={ true }
          title={ 'OFFICERS WITH MOST COMPLAINTS' }
        />
        <CallToActionWidget/>
      </WidgetWrapper>
    );
  }
}

NeighborhoodPane.propTypes = {
  name: PropTypes.string,
  allegationCount: PropTypes.number,
  mostCommonComplaint: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })),
  officersMostComplaint: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })),
};
