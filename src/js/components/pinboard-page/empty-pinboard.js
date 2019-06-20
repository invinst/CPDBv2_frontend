import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import config from 'config';
import styles from './empty-pinboard.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';

const helpers = {
  add: (
    <div>
      Add officers, or complaint records through search.<br />
      <br />
      Or use an example pinboard as a baseline to get started.
    </div>
  ),
  repeaters: 'Officers with at least 10 complaints against them generate 64% of all complaints.',
  skullcap: 'Dogged by allegations of abuse, members of the group have been named in more than 20 federal lawsuits ' +
    '– yet h…',
};

function HelperRow(props) {
  const { header, text, pinboardId } = props;

  return (
    <Link to={ `/pinboard/${pinboardId}/` } className='helper-row'>
      <div className='helper-row-wrapper'>
        <div className='helper-header'>{ header }</div>
        <div className='helper-text'>{ text }</div>
      </div>
      <div className='helper-arrow' />
    </Link>
  );
}

HelperRow.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
  pinboardId: PropTypes.string,
};

export default (
  <div className={ responsiveContainerStyles.responsiveContainer }>
    <div className={ styles.emptyPinboard }>
      <div className='empty-pinboard-title'>Add</div>
      <div className='empty-pinboard-description'>{ helpers.add }</div>
      <HelperRow header='Repeaters' text={ helpers.repeaters } pinboardId={ config.WattsCrewPinboardId }/>
      <HelperRow header='Skullcap crew' text={ helpers.skullcap } pinboardId={ config.SkullcapCrewPinboardId }/>
      <div className='arrow-head'/>
      <div className='arrow-shaft'/>
    </div>
  </div>
);

