import React, { Component, PropTypes } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
  SeparatorWidget,
} from './widgets';


export default class SchoolGroundPane extends Component {
  render() {
    const {
      name,
      allegationCount,
      officersMostComplaint,
    } = this.props;
    return (
      <WidgetWrapper>
        <HeaderWidget title={ name } showBottomBorder={ true }/>
        <SeparatorWidget/>
        <AllegationCountWidget numOfAllegations={ allegationCount } subTitle={ 'within XX meters of the school' }/>
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

SchoolGroundPane.propTypes = {
  name: PropTypes.string,
  allegationCount: PropTypes.number,
  officersMostComplaint: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })),
};
