import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';

import { groupFindings, FindingRow, isSustained } from '../coaccused-card/findings';
import styles from './allegation-panel.sass';

export default function AllegationPanel({ id, fullName, findings = [], onClose }) {
  const panelRef = useRef(null);
  const titleId = `${id}-title`;

  const groupedFindings = groupFindings(findings);
  const sustainedCount = findings.filter(isSustained).length;

  const closeAndRestoreFocus = useCallback(() => {
    const trigger = document.querySelector(`[aria-controls="${id}"]`);
    if (trigger) {
      trigger.focus();
    }
    onClose();
  }, [id, onClose]);

  return (
    <section
      ref={ panelRef }
      id={ id }
      className={ styles.allegationPanel }
      aria-labelledby={ titleId }
    >
      <div className='allegation-panel-header'>
        <h3 id={ titleId } className='allegation-panel-title'>
          { `${fullName} - ${pluralize('allegation', findings.length, true)}` }
          <span className={ cx('allegation-panel-sustained', { 'has-sustained': sustainedCount > 0 }) }>
            { ` ${sustainedCount} sustained` }
          </span>
        </h3>
        <button
          type='button'
          className='allegation-panel-close'
          aria-label='Close allegations'
          onClick={ closeAndRestoreFocus }
        >
          ×
        </button>
      </div>

      <div className='allegation-panel-list'>
        { groupedFindings.map((finding) => (
          <FindingRow key={ finding.key } finding={ finding } />
        )) }
      </div>
    </section>
  );
}

AllegationPanel.propTypes = {
  id: PropTypes.string.isRequired,
  fullName: PropTypes.string,
  findings: PropTypes.array,
  caretColumn: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
