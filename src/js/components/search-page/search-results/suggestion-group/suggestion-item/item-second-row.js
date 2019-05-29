import React from 'react';
import { compact, isEmpty } from 'lodash';
import pluralize from 'pluralize';


export const getOfficerSecondRowContent = function (params) {
  const { age, race, gender, complaintCount, sustainedCount } = params.suggestion;
  const ageString = age ? `${age} year old` : null;
  const demographic = compact([ageString, race, gender]);

  let secondRowContent = '';
  if (!isEmpty(demographic)) {
    secondRowContent += `${demographic.join(', ')}, `;
  }

  secondRowContent += `${pluralize('Complaint', complaintCount, true)}, `;
  secondRowContent += `${ sustainedCount } Sustained`;

  return secondRowContent;
};


export const getCRSecondRowContent = function (params) {
  const { subText } = params.suggestion;

  if (isEmpty(subText)) {
    return null;
  }

  return (
    <span dangerouslySetInnerHTML={ { __html: subText } }/>
  );
};
