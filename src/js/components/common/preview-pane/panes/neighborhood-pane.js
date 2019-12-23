import PropTypes from 'prop-types';
import React from 'react';

import WidgetWrapper, {
  HeaderWidget,
  AllegationCountWidget,
  ListWidget,
  SeparatorWidget,
} from '../widgets';


export default function NeighborhoodPane(props) {
  const {
    name,
    allegationCount,
    mostCommonComplaint,
    officersMostComplaint,
    url,
  } = props;
  return (
    <WidgetWrapper
      className='test--preview-pane-neighborhood'
      callToAction={ { url } }
      maxHeight={ 750 }>
      <HeaderWidget title={ name } showBottomBorder={ true }/>
      <SeparatorWidget/>
      <AllegationCountWidget url={ url } numOfAllegations={ allegationCount }/>
      <ListWidget
        items={ mostCommonComplaint }
        typeName={ 'allegation' }
        showAvatar={ false }
        title={ 'MOST COMMON COMPLAINTS' }
      />
      <ListWidget
        items={ officersMostComplaint }
        typeName={ 'allegation' }
        showAvatar={ true }
        title={ 'OFFICERS WITH MOST COMPLAINTS' }
      />
    </WidgetWrapper>
  );
}

NeighborhoodPane.propTypes = {
  name: PropTypes.string.isRequired,
  allegationCount: PropTypes.number.isRequired,
  mostCommonComplaint: PropTypes.array.isRequired,
  officersMostComplaint: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
};
