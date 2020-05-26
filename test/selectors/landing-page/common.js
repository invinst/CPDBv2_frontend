import { range, some, isEqual, sortBy } from 'lodash';

import {
  singleCardTransform,
  simpleOfficerTransform,
  pairingCardTransform,
  cardTransform,
  shuffled,
} from 'selectors/landing-page/common';


describe('common selectors', function () {
  const singleOfficerCard = {
    id: '8562',
    'full_name': 'Jerome Finnigan',
    'complaint_count': 175,
    'sustained_count': 6,
    'birth_year': 1963,
    race: 'White',
    rank: 'Police Officer',
    gender: 'Male',
    'percentile_trr': '70.0690',
    'percentile_allegation_civilian': '99.9840',
    'percentile_allegation': '99.9870',
    'percentile_allegation_internal': '99.6750',
    kind: 'single_officer',
  };
  const undefinedSingleOfficerCard = {
    id: '8562',
    'full_name': 'Jerome Finnigan',
    'complaint_count': 175,
    'sustained_count': 6,
    'birth_year': 1963,
    race: 'White',
    rank: 'Police Officer',
    gender: 'Male',
    'percentile_trr': '70.0690',
    'percentile_allegation_civilian': '99.9840',
    'percentile_allegation': '99.9870',
    'percentile_allegation_internal': '99.6750',
  };
  const pairOfficerCard = {
    'coaccusal_count': 23,
    kind: 'coaccused_pair',
    officer2: {
      id: 3454,
      'full_name': 'John Burzinski',
      'birth_year': 1961,
      race: 'White',
      gender: 'Male',
      rank: 'Police Officer',
      'percentile_trr': '74.4400',
      'percentile_allegation_civilian': '99.9080',
      'percentile_allegation': '99.9240',
      'percentile_allegation_internal': '99.5660',
      'sustained_count': 5,
      'complaint_count': 10,
    },
    officer1: {
      id: 8562,
      'full_name': 'Jerome Finnigan',
      'birth_year': 1963,
      race: 'White',
      gender: 'Male',
      rank: 'Police Officer',
      'percentile_trr': '70.0690',
      'percentile_allegation_civilian': '99.9840',
      'percentile_allegation': '99.9870',
      'percentile_allegation_internal': '99.6750',
      'sustained_count': 10,
      'complaint_count': 20,
    },
  };
  const officerInfo = {
    id: '8562',
    'full_name': 'Jerome Finnigan',
    'birth_year': 1963,
    race: 'White',
    gender: 'Male',
    rank: 'Police Officer',
    'percentile_trr': '70.0690',
    'percentile_allegation_civilian': '99.9840',
    'percentile_allegation': '99.9870',
    'percentile_allegation_internal': '99.6750',
    'complaint_count': 10,
    'sustained_count': 5,
  };
  const missingOfficerInfo = {
    id: '8562',
    'full_name': 'Jerome Finnigan',
    rank: '',
    'percentile_trr': '70.0690',
    'percentile_allegation_civilian': '99.9840',
    'percentile_allegation': '99.9870',
    'percentile_allegation_internal': '99.6750',
  };

  describe('singleCardTransform', function () {
    it('should return an officer information', function () {
      singleCardTransform(singleOfficerCard).should.eql({
        id: '8562',
        officerId: '8562',
        fullName: 'Jerome Finnigan',
        complaintCount: 175,
        sustainedCount: 6,
        allegationPercentile: 99.987,
        age: '54-year-old',
        race: 'white',
        rank: 'Police Officer',
        gender: 'male',
        percentile: {
          'items': [
            {
              'axis': 'Use of Force Reports',
              'value': 70.069,
            },
            {
              'axis': 'Officer Allegations',
              'value': 99.675,
            },
            {
              'axis': 'Civilian Allegations',
              'value': 99.984,
            },
          ],
          textColor: '#DFDFDF',
          visualTokenBackground: '#F52524',
        },
        kind: 'single_officer',
      });
    });
  });

  describe('simpleOfficerTransform', function () {
    it('should return specific information of an officer', function () {
      simpleOfficerTransform(officerInfo).should.eql({
        id: '8562',
        fullName: 'Jerome Finnigan',
        age: '54-year-old',
        race: 'white',
        gender: 'male',
        rank: 'Police Officer',
        percentileAllegation: '99.9870',
        percentileAllegationCivilian: '99.9840',
        percentileAllegationInternal: '99.6750',
        percentileTrr: '70.0690',
        backgroundColor: '#F52524',
        complaintCount: 10,
        sustainedCount: 5,
      });
    });

    it('should return correct information of an officer with missing info', function () {
      simpleOfficerTransform(missingOfficerInfo).should.eql({
        id: '8562',
        fullName: 'Jerome Finnigan',
        age: '',
        race: 'N/A',
        gender: 'N/A',
        rank: '',
        percentileAllegation: '99.9870',
        percentileAllegationCivilian: '99.9840',
        percentileAllegationInternal: '99.6750',
        percentileTrr: '70.0690',
        backgroundColor: '#F52524',
        complaintCount: undefined,
        sustainedCount: undefined,
      });
    });
  });

  describe('pairingCardTransform', function () {
    it('should return the information of the two officers in the pairing card', function () {
      pairingCardTransform(pairOfficerCard).should.eql({
        kind: 'coaccused_pair',
        coaccusalCount: 23,
        officer1: {
          id: 8562,
          fullName: 'Jerome Finnigan',
          age: '54-year-old',
          race: 'white',
          gender: 'male',
          rank: 'Police Officer',
          percentileAllegation: '99.9870',
          percentileAllegationCivilian: '99.9840',
          percentileAllegationInternal: '99.6750',
          percentileTrr: '70.0690',
          backgroundColor: '#F52524',
          complaintCount: 20,
          sustainedCount: 10,
        },
        officer2: {
          id: 3454,
          fullName: 'John Burzinski',
          age: '56-year-old',
          race: 'white',
          gender: 'male',
          rank: 'Police Officer',
          percentileAllegation: '99.9240',
          percentileAllegationCivilian: '99.9080',
          percentileAllegationInternal: '99.5660',
          percentileTrr: '74.4400',
          backgroundColor: '#F52524',
          complaintCount: 10,
          sustainedCount: 5,
        },
      });
    });
  });

  describe('shuffled', function () {
    it('should return a selector which shuffles items', function () {
      const storeState = { items: range(40) };
      const itemsSelector = state => state.items;
      const shuffledItemsSelector = shuffled(itemsSelector);
      const results = range(30).map(() => shuffledItemsSelector(storeState));

      some(results.map(result => !isEqual(result, storeState.items))).should.be.true();
      results.forEach(result => {
        sortBy(result.slice(0, 12)).should.eql(storeState.items.slice(0, 12));
        sortBy(result.slice(12)).should.eql(storeState.items.slice(12));
      });
    });
  });

  describe('cardTransform', function () {
    it('should return the information of a single officer when the kind is undefined', function () {
      cardTransform(undefinedSingleOfficerCard).should.eql({
        id: '8562',
        officerId: '8562',
        fullName: 'Jerome Finnigan',
        complaintCount: 175,
        sustainedCount: 6,
        allegationPercentile: 99.987,
        age: '54-year-old',
        race: 'white',
        rank: 'Police Officer',
        gender: 'male',
        percentile: {
          'items': [
            {
              'axis': 'Use of Force Reports',
              'value': 70.069,
            },
            {
              'axis': 'Officer Allegations',
              'value': 99.675,
            },
            {
              'axis': 'Civilian Allegations',
              'value': 99.984,
            },
          ],
          textColor: '#DFDFDF',
          visualTokenBackground: '#F52524',
        },
        kind: undefined,
      });
    });

    it('should return the information of a single officer', function () {
      cardTransform(singleOfficerCard).should.eql({
        id: '8562',
        officerId: '8562',
        fullName: 'Jerome Finnigan',
        complaintCount: 175,
        sustainedCount: 6,
        allegationPercentile: 99.987,
        age: '54-year-old',
        race: 'white',
        rank: 'Police Officer',
        gender: 'male',
        percentile: {
          'items': [
            {
              'axis': 'Use of Force Reports',
              'value': 70.069,
            },
            {
              'axis': 'Officer Allegations',
              'value': 99.675,
            },
            {
              'axis': 'Civilian Allegations',
              'value': 99.984,
            },
          ],
          textColor: '#DFDFDF',
          visualTokenBackground: '#F52524',
        },
        kind: 'single_officer',
      });
    });

    it('should return the information of the two officers in the pairing card', function () {
      cardTransform(pairOfficerCard).should.eql({
        kind: 'coaccused_pair',
        coaccusalCount: 23,
        officer1: {
          id: 8562,
          fullName: 'Jerome Finnigan',
          age: '54-year-old',
          race: 'white',
          gender: 'male',
          rank: 'Police Officer',
          percentileAllegation: '99.9870',
          percentileAllegationCivilian: '99.9840',
          percentileAllegationInternal: '99.6750',
          percentileTrr: '70.0690',
          backgroundColor: '#F52524',
          complaintCount: 20,
          sustainedCount: 10,
        },
        officer2: {
          id: 3454,
          fullName: 'John Burzinski',
          age: '56-year-old',
          race: 'white',
          gender: 'male',
          rank: 'Police Officer',
          percentileAllegation: '99.9240',
          percentileAllegationCivilian: '99.9080',
          percentileAllegationInternal: '99.5660',
          percentileTrr: '74.4400',
          backgroundColor: '#F52524',
          complaintCount: 10,
          sustainedCount: 5,
        },
      });
    });
  });
});
