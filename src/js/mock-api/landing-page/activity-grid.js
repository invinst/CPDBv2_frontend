import {
  RawOfficerCardFactory,
  RawOfficersPairCardFactory,
  RawPairCardOfficerFactory,
} from 'utils/test/factories/activity-grid';

export default () => {
  // This is for selenium-test/test-landing-page.js test
  // Pinboard function should show only 1 toast if one officer of the pairing card was already pinned
  const firstOfficer = {
    id: 777,
    'full_name': 'Jerome Finnigan',
    'complaint_count': 10,
    'sustained_count': 5,
    'birth_year': 1963,
    'race': 'White',
    'gender': 'Male',
    'rank': 'Police Officer',
  };
  const secondOfficer = {
    id: 888,
    'full_name': 'Edward May',
    'complaint_count': 10,
    'sustained_count': 5,
    'birth_year': 1963,
    'race': 'White',
    'gender': 'Male',
    'rank': 'Police Officer',
  };
  const officerCards = [
    RawOfficerCardFactory.build(firstOfficer),
    RawOfficerCardFactory.build(secondOfficer),
  ];
  const pairCards = [
    RawOfficersPairCardFactory.build({
      officer1: RawPairCardOfficerFactory.build(firstOfficer),
      officer2: RawPairCardOfficerFactory.build(secondOfficer),
    }),
  ];
  return officerCards.concat(pairCards);
};
