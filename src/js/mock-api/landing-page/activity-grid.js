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
    RawOfficerCardFactory.build({ id: firstOfficerId }),
    RawOfficerCardFactory.build({ id: secondOfficerId }),
  ];
  const pairCards = [RawOfficersPairCardFactory.build({
    officer1: RawPairCardOfficerFactory.build({ id: firstOfficerId, 'full_name': 'Bernadette Kelly' }),
    officer2: RawPairCardOfficerFactory.build({ id: secondOfficerId, 'full_name': 'Raymond Piwinicki' }),
  })];
  return officerCards.concat(pairCards);
};
