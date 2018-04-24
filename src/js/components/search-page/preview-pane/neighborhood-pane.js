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
      to,
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
        <CallToActionWidget to={ to }/>
      </WidgetWrapper>
    );
  }
}

NeighborhoodPane.propTypes = {
  name: PropTypes.string.isRequired,
  allegationCount: PropTypes.number.isRequired,
  mostCommonComplaint: PropTypes.array.isRequired,
  officersMostComplaint: PropTypes.array.isRequired,
  to: PropTypes.string.isRequired,
};
