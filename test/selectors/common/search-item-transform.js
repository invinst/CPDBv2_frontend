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
        to: '/search/?terms=community&type=COMMUNITY',
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
            'percentile': {
              'id': 180838,
              'percentile_trr': '72.1094',
              'percentile_allegation_civilian': '98.5549',
              'percentile_allegation_internal': '61.1521',
            },
            'allegation_count': 93,
          },
          {
            'id': 7544,
            'full_name': 'Dominique Dunigan',
            'percentile': {
              'id': 180839,
              'percentile_trr': '0.0000',
              'percentile_allegation_civilian': '24.1180',
              'percentile_allegation_internal': '0.0000',
            },
            'allegation_count': 1,
          },
        ],
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: true,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
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
          radarColor: '#f0201e',
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
          radarColor: '#f5c5a2',
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
            'percentile': {
              'id': 180838,
              'percentile_trr': '72.1094',
              'percentile_allegation_civilian': '98.5549',
              'percentile_allegation_internal': '61.1521',
            },
            'allegation_count': 93,
          },
          {
            'id': 7544,
            'full_name': 'Dominique Dunigan',
            'percentile': {
              'id': 180839,
              'percentile_trr': '0.0000',
              'percentile_allegation_civilian': '24.1180',
              'percentile_allegation_internal': '0.0000',
            },
            'allegation_count': 1,
          },
        ],
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: true,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
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
          radarColor: '#f0201e',
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
          radarColor: '#f5c5a2',
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
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: false,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
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
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: false,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
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
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: false,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
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
      }).should.deepEqual({
        type: 'SEARCH-TERMS',
        id: '1234abcd',
        isPinned: false,
        to: '/search/?terms=1234abcd&type=1234ABCD',
        url: '',
        uniqueKey: 'SEARCH-TERMS-1234-abcd',
        name: 'Communities',
        tags: [],
        itemIndex: 1,
        description: 'This is community description',
        callToActionType: 'view_all',
        text: 'Geography - Communities',
        recentText: 'Geography - Communities',
      });
    });
  });
});
