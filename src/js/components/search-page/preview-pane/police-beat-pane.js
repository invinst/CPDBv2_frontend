import React, { Component, PropTypes } from 'react';

import WidgetWrapper, {
  HeaderWidget,
  AllegationCountWidget,
  TextWidget,
  ListWidget,
  CallToActionWidget,
  SeparatorWidget,
} from './widgets';


export default class PoliceBeatPane extends Component {
  render() {
    const {
      name,
      allegationCount,
      mostCommonComplaint,
      url,
      policeHQ,
    } = this.props;

    const beatContent = policeHQ ? `${policeHQ} District Police Station` : '';
    return (
      <WidgetWrapper>
        <HeaderWidget title={ `POLICE BEAT #${name}` }/>
        <SeparatorWidget/>
        <AllegationCountWidget url={ url } numOfAllegations={ allegationCount }/>
        <TextWidget title='THIS BEAT CONTAINS A POLICE HQ' content={ beatContent }/>
        <ListWidget
          items={ mostCommonComplaint }
          typeName='allegation'
          showAvatar={ false }
          title='MOST COMMON COMPLAINTS'
        />
        <CallToActionWidget url={ url }/>
      </WidgetWrapper>
    );
  }
}

PoliceBeatPane.propTypes = {
  name: PropTypes.string.isRequired,
  allegationCount: PropTypes.number.isRequired,
  mostCommonComplaint: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  policeHQ: PropTypes.string,
};
