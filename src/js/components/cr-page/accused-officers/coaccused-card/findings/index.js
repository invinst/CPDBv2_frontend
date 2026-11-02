import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { groupBy } from 'lodash';
import cx from 'classnames';

import { PrintModeContext } from 'contexts';

export const allegationPanelId = (officerId) => `allegations-${officerId}`;

export const isSustained = (finding) => finding.recc_finding === 'Sustained';

export function groupFindings(findings) {
  const groups = groupBy(findings, (finding) =>
    JSON.stringify([finding.category, finding.subcategory, finding.recc_finding])
  );

  return Object.entries(groups).map(([key, group]) => ({
    ...group[0],
    key,
    count: group.length,
  }));
}

export function FindingRow({ finding, className }) {
  const hasSubcategory = finding.subcategory && finding.subcategory !== 'FALSE';

  return (
    <div className={ cx('finding-row', className) }>
      <div className='finding-detail'>
        <div className='finding-category-top'>
          { finding.category }
          { finding.count > 1 && ` \u00D7 ${finding.count}` }
        </div>
        { hasSubcategory && (
          <div className='finding-allegation-name'>{ finding.subcategory }</div>
        ) }
      </div>
      <div className={ cx('finding-tag', { sustained: isSustained(finding) }) }>
        { finding.recc_finding }
      </div>
    </div>
  );
}

export default function Findings({ findings = [], officerId, isOpen = false, onToggle }) {
  const { printMode } = useContext(PrintModeContext);
  const groupedFindings = groupFindings(findings);

  if (groupedFindings.length === 0) {
    return null;
  }

  const [topFinding] = groupedFindings;
  const restCount = findings.length - topFinding.count;


  const handleToggle = (event) => {
    event.stopPropagation();
    event.preventDefault();
    onToggle();
  };

  return (
    <div className='findings-list'>
      { groupedFindings.map((finding, index) => (
        <FindingRow
          key={ finding.key }
          finding={ finding }
          className={ cx({ 'finding-row-extra': index > 0 && !printMode }) }
        />
      )) }
      { restCount > 0 && !printMode && (
        <button
          type='button'
          className='show-more-button no-print'
          aria-expanded={ isOpen }
          aria-controls={ allegationPanelId(officerId) }
          onClick={ handleToggle }
        >
          { isOpen ? 'Hide allegations' : `Show all ${findings.length} allegations` }
        </button>
      ) }
    </div>
  );
}

FindingRow.propTypes = {
  finding: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Findings.propTypes = {
  findings: PropTypes.array,
  officerId: PropTypes.number,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};
