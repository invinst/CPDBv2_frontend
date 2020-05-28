import {
  showSelectPinboardsSelector,
  rawPinboardsSelector,
} from 'selectors/common/pinboards';


describe('pinboards common selectors', function () {
  describe('showSelectPinboardsSelector', function () {
    it('should return true if pinboards length is greater than one', function () {
      const storeState = {
        pinboardPage: {
          pinboards: [
            {
              'id': '1234abcd',
              'title': 'Pinboard 1',
            },
            {
              'id': '5678asdf',
              'title': 'Pinboard 2',
            },
          ],
        },
      };
      showSelectPinboardsSelector(storeState).should.be.true();
    });

    it('should return false if pinboards length is less than or equal to one', function () {
      const storeState = {
        pinboardPage: {
          pinboards: [
            {
              'id': '1234abcd',
              'title': 'Pinboard 1',
            },
          ],
        },
      };
      showSelectPinboardsSelector(storeState).should.be.false();
    });
  });

  describe('rawPinboardsSelector', function () {
    context('current pinboard is not on pinboards list', function () {
      it('should return pinboards list', function () {
        rawPinboardsSelector({
          pinboardPage: {
            pinboards: [
              {
                'id': '65fbab53',
                'title': '',
                'created_at': '2020-05-21',
                'crids': [],
                'officer_ids': [],
                'trr_ids': [],
              },
              {
                'id': 'f1f16550',
                'title': '',
                'created_at': '2020-05-14',
                'crids': [],
                'officer_ids': [
                  8562,
                ],
                'trr_ids': [],
              },
            ],
            pinboard: {
              'id': '',
              'title': '',
              'created_at': '2020-05-22',
            },
          },
        }).should.eql([
          {
            'id': '65fbab53',
            'title': '',
            'created_at': '2020-05-21',
            'crids': [],
            'officer_ids': [],
            'trr_ids': [],
          },
          {
            'id': 'f1f16550',
            'title': '',
            'created_at': '2020-05-14',
            'crids': [],
            'officer_ids': [
              8562,
            ],
            'trr_ids': [],
          },
        ]);
      });
    });

    context('current pinboard is on pinboards list', function () {
      it('should select correct value', function () {
        rawPinboardsSelector({
          pinboardPage: {
            pinboards: [
              {
                'id': '65fbab53',
                'title': '',
                'created_at': '2020-05-21',
                'crids': [],
                'officer_ids': [],
                'trr_ids': [],
              },
              {
                'id': 'f1f16550',
                'title': '',
                'created_at': '2020-05-14',
                'crids': [],
                'officer_ids': [
                  8562,
                ],
                'trr_ids': [],
              },
            ],
            pinboard: {
              'id': '65fbab53',
              'title': 'New title',
              'created_at': '2020-05-21',
              'crids': [],
              'officer_ids': [123],
              'trr_ids': [],
            },
          },
        }).should.eql([
          {
            'id': '65fbab53',
            'title': 'New title',
            'created_at': '2020-05-21',
            'crids': [],
            'officer_ids': [123],
            'trr_ids': [],
            'is_current': true,
          },
          {
            'id': 'f1f16550',
            'title': '',
            'created_at': '2020-05-14',
            'crids': [],
            'officer_ids': [
              8562,
            ],
            'trr_ids': [],
          },
        ]);
      });
    });
  });
});
