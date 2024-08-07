import { navigationItemTransform } from 'selectors/common/navigation-item-transform';
import { searchResultItemTransform } from 'selectors/common/search-item-transforms';

describe('searchItemTransform', function () {
  describe('navigationItemTransform', function () {
    it('should transform view_all item correctly', function () {
      navigationItemTransform({
        id: 'community',
        name: 'Communities',
        description: 'Chicago is divided into 77 areas.',
        'call_to_action_type': 'view_all',
        link: 'http://beta.cpdb.co/url-mediator/session-builder?community=<name>',
        type: 'category',
      }).should.eql({
        id: 'community',
        name: 'Communities',
        description: 'Chicago is divided into 77 areas.',
        callToActionType: 'view_all',
        to: '/search/?q=community&type=COMMUNITY',
        url: '',
        type: 'category',
        uniqueKey: 'category-community',
      });
    });

    it('should transform link item correctly', function () {
      navigationItemTransform({
        id: 'community',
        name: 'Communities',
        description: 'Chicago is divided into 77 areas.',
        'call_to_action_type': 'link',
        link: 'http://beta.cpdb.co/url-mediator/session-builder?community=<name>',
        type: 'category',
      }).should.eql({
        id: 'community',
        name: 'Communities',
        description: 'Chicago is divided into 77 areas.',
        callToActionType: 'link',
        to: '',
        url: 'http://beta.cpdb.co/url-mediator/session-builder?community=<name>',
        type: 'category',
        uniqueKey: 'category-community',
      });
    });
  });

  describe('searchResultItemTransform', function () {
    it('should transform cr data correctly', function () {
      searchResultItemTransform({
        type: 'CR',
        id: 1,
        isPinned: true,
        crid: 123,
        to: '/complaint/123/',
        'incident_date': '2012-07-02',
        highlight: {
          summary: ['the officer pointed a gun at the victim'],
        },
        category: 'Use Of Force',
        'sub_category': 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        'victims': [
          { 'gender': 'Female', 'race': 'Hispanic' },
          { 'gender': 'Female', 'race': 'Hispanic', 'age': 48 },
          { 'gender': '', 'race': '', 'age': null },
        ],
        'coaccused': [
          {
            'id': 16567,
            'full_name': 'Baudilio Lopez',
            'percentile_trr': '72.1094',
            'percentile_allegation_civilian': '98.5549',
            'percentile_allegation_internal': '61.1521',
            'percentile_allegation': '99.9',
            'allegation_count': 93,
          },
          {
            'id': 7544,
            'full_name': 'Dominique Dunigan',
            'percentile_trr': '0.0000',
            'percentile_allegation_civilian': '24.1180',
            'percentile_allegation_internal': '0.0000',
            'percentile_allegation': '25.1',
            'allegation_count': 1,
          },
        ],
        itemRank: 1,
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: true,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
        itemRank: 1,
        text: 'CR # 123 • July 2, 2012',
        subText: 'the officer pointed a gun at the victim',
        recentText: 'CR # 123 • July 2, 2012',
        incidentDate: 'Jul 2, 2012',
        category: 'Use Of Force',
        subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: ['Hispanic, Female', 'Hispanic, Female, Age 48'],
        coaccused: [{
          id: 16567,
          name: 'Baudilio Lopez',
          url: '/officer/16567/baudilio-lopez/',
          radarAxes: [
            { axis: 'Use of Force Reports', value: 72.1094 },
            { axis: 'Officer Allegations', value: 61.1521 },
            { axis: 'Civilian Allegations', value: 98.5549 },
          ],
          radarColor: '#F52524',
          count: 93,
        }, {
          id: 7544,
          name: 'Dominique Dunigan',
          url: '/officer/7544/dominique-dunigan/',
          radarAxes: [
            { axis: 'Use of Force Reports', value: 0 },
            { axis: 'Officer Allegations', value: 0 },
            { axis: 'Civilian Allegations', value: 24.118 },
          ],
          radarColor: '#F9D3C3',
          count: 1,
        }],
      });

      searchResultItemTransform({
        type: 'CR',
        id: 1,
        isPinned: true,
        crid: 123,
        to: '/complaint/123/',
        'incident_date': '2012-07-02',
        highlight: {
          summary: ['the officer pointed a gun at the victim'],
        },
        category: 'Use Of Force',
        'sub_category': 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        'victims': [
          { 'gender': 'Female', 'race': 'Hispanic' },
          { 'gender': 'Female', 'race': 'Hispanic', 'age': 48 },
        ],
        'coaccused': [
          {
            'id': 16567,
            'full_name': 'Baudilio Lopez',
            'percentile_trr': '72.1094',
            'percentile_allegation_civilian': '98.5549',
            'percentile_allegation_internal': '61.1521',
            'percentile_allegation': '99.9',
            'allegation_count': 93,
          },
          {
            'id': 7544,
            'full_name': 'Dominique Dunigan',
            'percentile_trr': '0.0000',
            'percentile_allegation_civilian': '24.1180',
            'percentile_allegation_internal': '0.0000',
            'percentile_allegation': '25.1',
            'allegation_count': 1,
          },
        ],
        itemRank: 3,
        itemIndex: 3,
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: true,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 3,
        itemRank: 3,
        text: 'CR # 123 • July 2, 2012',
        subText: 'the officer pointed a gun at the victim',
        recentText: 'CR # 123 • July 2, 2012',
        incidentDate: 'Jul 2, 2012',
        category: 'Use Of Force',
        subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: ['Hispanic, Female', 'Hispanic, Female, Age 48'],
        coaccused: [{
          id: 16567,
          name: 'Baudilio Lopez',
          url: '/officer/16567/baudilio-lopez/',
          radarAxes: [
            { axis: 'Use of Force Reports', value: 72.1094 },
            { axis: 'Officer Allegations', value: 61.1521 },
            { axis: 'Civilian Allegations', value: 98.5549 },
          ],
          radarColor: '#F52524',
          count: 93,
        }, {
          id: 7544,
          name: 'Dominique Dunigan',
          url: '/officer/7544/dominique-dunigan/',
          radarAxes: [
            { axis: 'Use of Force Reports', value: 0 },
            { axis: 'Officer Allegations', value: 0 },
            { axis: 'Civilian Allegations', value: 24.118 },
          ],
          radarColor: '#F9D3C3',
          count: 1,
        }],
      });
    });

    it('should transform cr with no highlight', function () {
      searchResultItemTransform({
        type: 'CR',
        id: 1,
        isPinned: false,
        crid: 123,
        to: '/complaint/123/',
        'incident_date': '2012-07-02',
        category: 'Use Of Force',
        'sub_category': 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        'victims': [],
        'coaccused': [],
        itemRank: 1,
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: false,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
        itemRank: 1,
        text: 'CR # 123 • July 2, 2012',
        subText: '',
        recentText: 'CR # 123 • July 2, 2012',
        incidentDate: 'Jul 2, 2012',
        category: 'Use Of Force',
        subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: [],
        coaccused: [],
      });
    });

    it('should transform cr with text content highlight', function () {
      searchResultItemTransform({
        type: 'CR',
        id: 1,
        isPinned: false,
        crid: 123,
        to: '/complaint/123/',
        'incident_date': '2012-07-02',
        category: 'Use Of Force',
        'sub_category': 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        'victims': [],
        'coaccused': [],
        highlight: {
          'text_content': ['first text orc match', 'second orc text match'],
        },
        itemRank: 1,
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: false,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
        itemRank: 1,
        text: 'CR # 123 • July 2, 2012',
        subText: 'first text orc match',
        recentText: 'CR # 123 • July 2, 2012',
        incidentDate: 'Jul 2, 2012',
        category: 'Use Of Force',
        subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: [],
        coaccused: [],
      });
    });

    it('should transform cr with summary and text content highlight', function () {
      searchResultItemTransform({
        type: 'CR',
        id: 1,
        isPinned: false,
        crid: 123,
        to: '/complaint/123/',
        'incident_date': '2012-07-02',
        category: 'Use Of Force',
        'sub_category': 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        'victims': [],
        'coaccused': [],
        highlight: {
          summary: ['the officer pointed a gun at the victim', 'second match'],
          'text_content': ['first text orc match', 'second orc text match'],
        },
        itemRank: 1,
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: false,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
        itemRank: 1,
        text: 'CR # 123 • July 2, 2012',
        subText: 'the officer pointed a gun at the victim',
        recentText: 'CR # 123 • July 2, 2012',
        incidentDate: 'Jul 2, 2012',
        category: 'Use Of Force',
        subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: [],
        coaccused: [],
      });
    });

    it('should transform search term data correctly', function () {
      searchResultItemTransform({
        type: 'SEARCH-TERMS',
        id: '1234abcd',
        isPinned: false,
        name: 'Communities',
        description: 'This is community description',
        'category_name': 'Geography',
        'call_to_action_type': 'view_all',
        itemRank: 1,
      }).should.deepEqual({
        type: 'SEARCH-TERMS',
        id: '1234abcd',
        isPinned: false,
        to: '/search/?q=1234abcd&type=1234ABCD',
        url: '',
        uniqueKey: 'SEARCH-TERMS-1234-abcd',
        name: 'Communities',
        tags: [],
        itemIndex: 1,
        itemRank: 1,
        description: 'This is community description',
        callToActionType: 'view_all',
        text: 'Geography - Communities',
        recentText: 'Geography - Communities',
      });
    });

    describe('should transform lawsuit correctly', function () {
      const lawsuit = {
        type: 'LAWSUIT',
        id: 25,
        to: '/lawsuit/00-L-5230/',
        'case_no': '00-L-5230',
        'primary_cause': 'Excessive force',
        'summary': 'Lawsuit summary',
        'incident_date': '2016-09-11',
        'address': '',
        'location': 'near intersection of N Waveland and Sheffield',
        'plaintiffs': [
          {
            'name': 'Arthur Hutchinson',
          },
        ],
        'officers': [
          {
            'id': 412,
            'full_name': 'Sidney Allgood',
            'allegation_count': 3,
          },
          {
            'percentile_allegation': '36.0395',
            'id': 24379,
            'full_name': 'William Rodriguez',
            'allegation_count': 3,
          },
          {
            'percentile_allegation': '30.9271',
            'percentile_trr': '0.0000',
            'percentile_allegation_civilian': '29.1229',
            'percentile_allegation_internal': '77.7431',
            'id': 19002,
            'full_name': 'Richard Mierniczak',
            'allegation_count': 6,
          },
        ],
        'total_payments': '60000.00',
      };

      it('when primay_cause is not null', function () {
        searchResultItemTransform(lawsuit).should.deepEqual({
          type: 'LAWSUIT',
          id: 25,
          isPinned: undefined,
          to: '/lawsuit/00-L-5230/',
          url: undefined,
          uniqueKey: 'LAWSUIT-25',
          tags: [],
          itemIndex: 1,
          itemRank: undefined,
          text: 'Excessive force • September 11, 2016',
          subText: 'Lawsuit summary',
          recentText: 'Excessive force • September 11, 2016',
          summary: 'Lawsuit summary',
          totalPaymentsDisplay: '60.0K',
          location: 'near intersection of N Waveland and Sheffield',
          officers: [
            {
              'count': 3,
              'id': 412,
              'name': 'Sidney Allgood',
              'radarAxes': undefined,
              'radarColor': undefined,
              'url': '/officer/412/sidney-allgood/',
            },
            {
              'count': 3,
              'id': 24379,
              'name': 'William Rodriguez',
              'radarAxes': [
                {
                  'axis': 'Use of Force Reports',
                  'value': NaN,
                },
                {
                  'axis': 'Officer Allegations',
                  'value': NaN,
                },
                {
                  'axis': 'Civilian Allegations',
                  'value': NaN,
                },
              ],
              'radarColor': '#F4A298',
              'url': '/officer/24379/william-rodriguez/',
            },
            {
              'count': 6,
              'id': 19002,
              'name': 'Richard Mierniczak',
              'radarAxes': [
                {
                  'axis': 'Use of Force Reports',
                  'value': 0,
                },
                {
                  'axis': 'Officer Allegations',
                  'value': 77.7431,
                },
                {
                  'axis': 'Civilian Allegations',
                  'value': 29.1229,
                },
              ],
              'radarColor': '#F4A298',
              'url': '/officer/19002/richard-mierniczak/',
            },
          ],
          plaintiffs: [
            {
              name: 'Arthur Hutchinson',
            },
          ],
          primaryCause: 'Excessive force',
          incidentDate: '2016-09-11',
          address: '',
          caseNo: '00-L-5230',
        });
      });

      it('when primay_cause is null', function () {
        const lawsuitWithNullPrimaryCause = { ...lawsuit, 'primary_cause': null };
        searchResultItemTransform(lawsuitWithNullPrimaryCause).text.should.eql('Unknown • September 11, 2016');
      });
    });
  });
});
