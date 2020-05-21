import { officerPinboardsMenuSelector } from 'selectors/officer-page/pinboards-menu';

describe('officerPinboardsMenuSelector', function () {
  it('should return pinboards menu correctly', function () {
    const state = {
      pinboardPage: {
        pinboards: [
          {
            id: '73fje',
            title: 'Pinboard 73fje',
            'created_at': '2019-01-09T06:00:01-06:00',
            'officer_ids': [],
            'crids': [],
            'trr_ids': [],
          },
          {
            id: '84fje',
            title: 'Pinboard 84fje',
            'created_at': '2019-01-09T06:00:01-06:00',
            'officer_ids': [864],
            'crids': [],
            'trr_ids': [],
          },
          {
            id: '92fje',
            title: 'Pinboard 92fje',
            'created_at': '2019-01-09T06:00:01-06:00',
            'officer_ids': [],
            'crids': [],
            'trr_ids': [],
          },
        ],
        pinboard: {
          id: '73fje',
          'officer_ids': [864],
          'crids': [],
          'trr_ids': [],
        },
      },
      officerPage: {
        officerId: 864,
      },
    };
    officerPinboardsMenuSelector(state).should.eql([
      {
        id: '73fje',
        title: 'Pinboard 73fje',
        createdAt: 'Jan 09, 2019',
        isPinned: true,
        isCurrent: true,
      },
      {
        id: '84fje',
        title: 'Pinboard 84fje',
        createdAt: 'Jan 09, 2019',
        isPinned: true,
        isCurrent: false,
      },
      {
        id: '92fje',
        title: 'Pinboard 92fje',
        createdAt: 'Jan 09, 2019',
        isPinned: false,
        isCurrent: false,
      },
    ]);
  });
});
