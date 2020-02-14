import PropTypes from 'prop-types';
import React from 'react';
import pluralize from 'pluralize';

import WidgetWrapper, {
  HeaderWidget,
  ListWidget,
  SeparatorWidget,
} from '../widgets';
import style from './rank-pane.sass';


export default function RankPane(props) {
  const { name, officersMostComplaints, activeOfficersCount } = props;
  return (
    <WidgetWrapper className={ style.rankPane } maxHeight={ 480 }>
      <HeaderWidget title={ name } showBottomBorder={ true }/>
      <SeparatorWidget/>
      <div className='active-ranks'>{ pluralize(`active ${name}`, activeOfficersCount, true) }</div>
      <SeparatorWidget/>
      <div className='rank-description'>
        The Chicago Police Department is organized by rank.
        Police Officers make up the bulk of the department,
        patrolling neighborhoods and serving on specialized teams.
      </div>
      <ListWidget
        items={ officersMostComplaints }
        typeName='allegation'
        title={ `${name} with most complaint` }
      />
    </WidgetWrapper>
  );
}

RankPane.propTypes = {
  name: PropTypes.string,
  officersMostComplaints: PropTypes.array,
  activeOfficersCount: PropTypes.number,
};
