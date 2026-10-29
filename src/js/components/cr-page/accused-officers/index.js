import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';

import CoaccusedCard from './coaccused-card';
// import CoaccusedPopup from './coaccused-popup';
import AllegationPanel from './allegation-panel';
import { allegationPanelId } from './coaccused-card/findings';
import style from './accused-officers.sass';

const COLUMN_COUNT = 4;
const COLLAPSED_COUNT = COLUMN_COUNT * 2;

export default function AccusedOfficers({ officers = [], addOrRemoveItemInPinboard }) {
  const [expanded, setExpanded] = useState(false);
  const [openId, setOpenId] = useState(null);

  const handleToggleOfficer = (id) => {
    setOpenId((currentId) => (currentId === id ? null : id));
  };

  const handleClosePanel = () => setOpenId(null);

  const showMoreButton = !expanded && officers.length > COLLAPSED_COUNT;

  return (
    <div className={ cx(style.accusedOfficers, 'test--accused-officer', { expanded }) }>
      <h2 className='accused-officer-title'>
        { `${officers.length} ${pluralize('accused officer', officers.length).toUpperCase()}` }
      </h2>

      <div className='accused-officers-wrapper'>
        { officers.map((officer, index) => {
          const isOpen = openId === officer.id;
          const isBeyondFold = !expanded && index >= COLLAPSED_COUNT;

          return (
            <Fragment key={ officer.id }>
              <div className={ cx('accused-officer-card', { 'beyond-fold': isBeyondFold, 'is-open': isOpen }) }>
                <CoaccusedCard
                  addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
                  { ...officer }
                  isOpen={ isOpen }
                  onToggle={ () => handleToggleOfficer(officer.id) }
                />
              </div>

              { isOpen && (
                <AllegationPanel
                  id={ allegationPanelId(officer.id) }
                  fullName={ officer.fullName }
                  findings={ officer.findings }
                  onClose={ handleClosePanel }
                />
              ) }
            </Fragment>
          );
        }) }
      </div>

      { showMoreButton && (
        <div className='show-more-button-container no-print'>
          <button
            type='button'
            className='show-more-button'
            onClick={ () => setExpanded(true) }
          >
            Show all accused officers
          </button>
        </div>
      ) }
    </div>
  );
}

AccusedOfficers.propTypes = {
  officers: PropTypes.array,
  popup: PropTypes.object,
  pathName: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
};
