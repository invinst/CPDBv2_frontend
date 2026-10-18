import PropTypes from 'prop-types'
import { groupBy } from 'lodash';
import React, { useState } from 'react';
import pluralize from 'pluralize';

function groupFindings(findings) {
  const groups = groupBy(findings, ({ category, subcategory, reccFinding }) =>
    JSON.stringify([category, subcategory, reccFinding])
  );

  return Object.entries(groups).map(([, group]) => ({
    ...group[0],
    count: group.length,
  }));
}


export default function Findings({ findings }) {
    const groupedFindings = groupFindings(findings);
    const [expanded, setExpanded] = useState(false);
    const findingRows = expanded ? groupedFindings : groupedFindings.slice(0, 1);
    const showMoreCount = groupedFindings.length - 1;
    const showMoreText = `Show ${pluralize('more allegation', showMoreCount, true)}`


    return (
        <div className='findings-list'>
            { findingRows.map((finding, index) => (
              <div className='finding-row' key={ index }>
                <div className='finding-detail'>
                  <div className='finding-category-top'>
                    { finding.category }{ finding.count > 1 && ` \u00D7 ${finding.count}`}
                  </div>
                  <div className='finding-allegation-name'>{ finding.subcategory }</div>
                </div>
                <div className={ (finding.recc_finding == 'Sustained') ? 'finding-tag sustained': 'finding-tag' }>
                  { finding.recc_finding }
                </div>
              </div>
            ))}
            {groupedFindings.length > 1 && (
              <span onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setExpanded((x) => !x);
              }} className='show-more-button'>
              { expanded ? "Collapse" : showMoreText }
              </span>
            )}
        </div>
    )
}