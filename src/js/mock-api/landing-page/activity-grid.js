import {
  RawOfficerCardFactory,
  RawOfficersPairCardFactory,
  RawPairCardOfficerFactory,
} from 'utils/test/factories/activity-grid';

export default () => {
  // This is for selenium-test/test-landing-page.js test
  // Pinboard function should show only 1 toast if one officer of the pairing card was already pinned
  const firstOfficerId = '777';
  const secondOfficerId = '888';
  const officerCards = [
    RawOfficerCardFactory.build(
      {
        id: firstOfficerId,
        'full_name': 'Jerome Finnigan',
        'complaint_count': 10,
        'sustained_count': 5,
        'birth_year': 1963,
        'race': 'White',
        'gender': 'Male',
        'rank': 'Police Officer',
      }
    ),
    RawOfficerCardFactory.build(
      {
        id: secondOfficerId,
        'full_name': 'Edward May',
        'complaint_count': 10,
        'sustained_count': 5,
        'birth_year': 1963,
        'race': 'White',
        'gender': 'Male',
        'rank': 'Police Officer',
      }
    ),
  ];
  const pairCards = [RawOfficersPairCardFactory.build({
    officer1: RawPairCardOfficerFactory.build(
      {
        id: firstOfficerId,
        'full_name': 'Bernadette Kelly',
        'complaint_count': 10,
        'sustained_count': 5,
        'birth_year': 1963,
        'race': 'White',
        'gender': 'Male',
        'rank': 'Police Officer',
      }
    ),
    officer2: RawPairCardOfficerFactory.build(
      {
        id: secondOfficerId,
        'full_name': 'Raymond Piwinicki',
        'complaint_count': 10,
        'sustained_count': 5,
        'birth_year': 1963,
        'race': 'White',
        'gender': 'Male',
        'rank': 'Police Officer',
      }
    ),
  })];
  return officerCards.concat(pairCards);
};
