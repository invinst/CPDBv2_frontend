import { summarySelector } from 'selectors/unit-profile-page';


describe('unit profile page selectors', function () {
  describe('summarySelector', function () {
    it('should return summary', function () {
      const state = {
        'unitProfilePage': {
          'summary': {
            'description': 'Lorem ipsum',
            'member_records': {
              'active_members': 1,
              'total': 2,
              'facets': [
                { 'name': 'race', 'entries': [{ 'name': 'White', 'count': 1 }, { 'name': 'Black', 'count': 1 }] },
                { 'name': 'age', 'entries': [{ 'name': '21-30', 'count': 2 }] },
                { 'name': 'gender', 'entries': [{ 'name': 'Male', 'count': 2 }] },
              ],
            },
            'complaint_records': {
              'count': 1,
              'sustained_count': 0,
              'facets': [
                { 'name': 'category', 'entries': [{ 'name': 'Use of Force', 'count': 1, 'sustained_count': 0 }] },
                { 'name': 'race', 'entries': [{ 'name': 'White', 'count': 1, 'sustained_count': 0 }] },
                { 'name': 'age', 'entries': [{ 'name': '21-30', 'count': 1, 'sustained_count': 0 }] },
                { 'name': 'gender', 'entries': [{ 'name': 'Male', 'count': 1, 'sustained_count': 0 }] },
              ],
            },
          },
        },
      };

      summarySelector(state).should.eql({
        'description': 'Lorem ipsum',
        'activeMembers': 1,
        'totalMembers': 2,
        'memberFacets': [
          { 'name': 'race', 'entries': [{ 'name': 'Black', 'count': 1 }, { 'name': 'White', 'count': 1 }] },
          { 'name': 'age', 'entries': [{ 'name': '21-30', 'count': 2 }] },
          { 'name': 'gender', 'entries': [{ 'name': 'Male', 'count': 2 }] },
        ],
        'complaintCount': 1,
        'sustainedComplaintCount': 0,
        'complaintFacets': [
          { 'name': 'category', 'entries': [{ 'name': 'Use of Force', 'count': 1, 'sustainedCount': 0 }] },
          { 'name': 'race', 'entries': [{ 'name': 'White', 'count': 1, 'sustainedCount': 0 }] },
          { 'name': 'age', 'entries': [{ 'name': '21-30', 'count': 1, 'sustainedCount': 0 }] },
          { 'name': 'gender', 'entries': [{ 'name': 'Male', 'count': 1, 'sustainedCount': 0 }] },
        ],
      });
    });
  });
});
