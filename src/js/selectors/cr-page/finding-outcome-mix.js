import { get } from 'lodash';
import pluralize from 'pluralize';


const suspensionDaysMix = (finalFinding, finalOutcome) => {
  const suspensionDaysPattern = /^(\d+) Day Suspension$/;
  const matched = finalOutcome.match(suspensionDaysPattern);
  if (matched) {
    return `Suspended ${matched[1]} ${pluralize('day', matched[1])}`;
  }

  return null;
};

const unknownMix = (finalFinding, finalOutcome) => {
  if (finalFinding === 'Unknown') {
    return finalOutcome;
  }

  if (finalOutcome === 'Unknown') {
    return finalFinding;
  }

  return null;
};

const dictionaryMappingMix = (finalFinding, finalOutcome) => {
  return get({
    'Exonerated': {
      'No Action Taken': 'Exonerated',
      'Penalty Not Served': 'Penalty Not Served',
      'Reinstated By Police Board': 'Reinstated By Police Board'
    },
    'Sustained': {
      'Reprimand': 'Reprimand',
      'Administrative Termination': 'Administrative Termination',
      'Suspended Over 30 Days': 'Suspended >30 days',
      'Suspended For 180 Days': 'Suspended 180 days',
      'Separated Other Case': 'Sustained',
      'Suspended Indefinitely': 'Suspended Indefinitely',
      'Sustained-No Penalty': 'No Penalty'
    },
    'Discharged': {
      'No Action Taken': 'No Action Taken'
    },
    'No Affidavit': {
      'No Action Taken': 'No Affidavit'
    },
    'No Cooperation': {
      'No Action Taken': 'No Cooperation'
    },
    'Not Sustained': {
      'No Action Taken': 'Not Sustained',
      'Reprimand': 'Reprimand',
      'Penalty Not Served': 'Penalty Not Served',
      'Resigned': 'Resigned',
      'Violation Noted': 'Violation Noted',
      'Reinstated By Police Board': 'Reinstated By Police Board',
      'Reinstated By Court Action': 'Reinstated By Court Action',
      'Suspended Over 30 Days': 'Suspended >30 days',
      'Sustained-No Penalty': 'No Penalty',
      'Resigned -Not Served': 'Resigned - Not Served'
    },
    'Unfounded': {
      'No Action Taken': 'Unfounded',
      'Administrative Termination': 'Administrative Termination',
      'Reinstated By Court Action': 'Reinstated By Court Action',
      'Resigned -Not Served': 'Resigned -Not Served'
    }
  }, `${finalFinding}.${finalOutcome}`, null);
};

const combineMix = (finalFinding, finalOutcome) => `${finalFinding} - ${finalOutcome}`;

export const getFindingOutcomeMix = (finalFinding, finalOutcome) => {
  return [
    suspensionDaysMix,
    unknownMix,
    dictionaryMappingMix,
    combineMix
  ].reduce((outcome, mix) => { return outcome ? outcome : mix(finalFinding, finalOutcome); }, null);
};
