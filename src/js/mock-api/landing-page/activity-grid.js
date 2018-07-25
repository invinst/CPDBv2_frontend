import { RawOfficerCardFactory, RawOfficersPairCardFactory } from 'utils/test/factories/activity-grid';

export default () => {
  const officerCards = RawOfficerCardFactory.buildList(20);
  const pairCards = RawOfficersPairCardFactory.buildList(20);
  return officerCards.concat(pairCards);
};
