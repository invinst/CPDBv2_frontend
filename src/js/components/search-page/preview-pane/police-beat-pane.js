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
      mostCommonComplaints,
      to,
    } = this.props;

    return (
      <WidgetWrapper>
        <HeaderWidget title={ name } />
        <SeparatorWidget/>
        <AllegationCountWidget numOfAllegations={ allegationCount }/>
        <TextWidget title={ 'THIS BEAT CONTAINS A POLICE HQ' } content={ '11th District Police Station' }/>
        <ListWidget
          items={ mostCommonComplaints }
          typeName={ 'allegation' }
          showAvatar={ false }
          title={ 'MOST COMMON COMPLAINT' }
        />
        <CallToActionWidget to={ to }/>
      </WidgetWrapper>
    );
  }
}

PoliceBeatPane.propTypes = {
  name: PropTypes.string.isRequired,
  allegationCount: PropTypes.number.isRequired,
  mostCommonComplaints: PropTypes.array.isRequired,
  to: PropTypes.string.isRequired,
};
