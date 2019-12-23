import PropTypes from 'prop-types';
import React from 'react';

import WidgetWrapper, {
  HeaderWidget,
  AllegationCountWidget,
  ListWidget,
  SeparatorWidget,
} from '../widgets';


export default function SchoolGroundPane(props) {
  const {
    name,
    allegationCount,
    officersMostComplaint,
    url,
  } = props;
  return (
    <WidgetWrapper callToAction={ { url } } maxHeight={ 530 }>
      <HeaderWidget title={ name } showBottomBorder={ true }/>
      <SeparatorWidget/>
      <AllegationCountWidget
        url={ url }
        numOfAllegations={ allegationCount }
        subTitle={ 'within 100 meters of the school' }/>
      <ListWidget
        items={ officersMostComplaint }
        typeName={ 'allegation' }
        showAvatar={ true }
        title={ 'OFFICERS WITH MOST COMPLAINTS' }
      />
    </WidgetWrapper>
  );
}

SchoolGroundPane.propTypes = {
  name: PropTypes.string,
  allegationCount: PropTypes.number,
  officersMostComplaint: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    count: PropTypes.number,
    url: PropTypes.string,
  })),
  url: PropTypes.string,
};
