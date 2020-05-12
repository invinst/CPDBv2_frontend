import should from 'should';
import { map, find } from 'lodash';

import {
  contentSelector,
  getCRID,
  getEditModeOn,
  getOfficerId,
  getDocumentAlreadyRequested,
  hasAttachmentsSelector,
  isCrPinnedSelector,
  pinnableCrSelector,
} from 'selectors/cr-page';
import {
  InvestigatorFactory,
  PoliceWitnessFactory,
  CoaccusedFactory,
  ComplaintFactory,
} from 'utils/test/factories/complaint';
import { PINNED_ITEM_TYPES } from 'utils/constants';


describe('CR page selectors', function () {
  describe('contentSelector', function () {
    const buildState = obj => ({
      breadcrumb: {
        breadcrumbItems: [],
      },
      crs: {},
      crPage: {},
      ...obj,
    });

    it('should return empty coaccused, complainants, documents, videos and audios array if crid does not exist',
      function () {
        const state = buildState({
          crPage: { crid: 123 },
        });

        contentSelector(state).coaccused.should.eql([]);
        contentSelector(state).complainants.should.eql([]);
        contentSelector(state).victims.should.eql([]);
        contentSelector(state).involvements.should.eql({});
        contentSelector(state).attachments.should.eql([]);
      }
    );

    it('should return list of complainants display string', function () {
      const complainant1 = { race: 'White', gender: 'Male', age: 18 };
      const complainant2 = {};
      const state = buildState({
        crs: { '123': ComplaintFactory.build({ complainants: [complainant1, complainant2] }) },
        crPage: { crid: 123 },
      });

      contentSelector(state).complainants.should.eql([
        'White, Male, Age 18', '',
      ]);
    });

    it('should return list of coaccused', function () {
      const coaccusedObj = {
        id: 1,
        'full_name': 'Michel Foo',
        'complaint_count': 15,
        'sustained_count': 1,
        'complaint_percentile': 59.0,
        'birth_year': 1977,
        race: 'White',
        gender: 'Male',
        'coaccused_count': 4,
        rank: 'Po As Detective',
        'final_outcome': 'Reprimand',
        'final_finding': 'Sustained',
        'recommended_outcome': '365 Day Suspension',
        'disciplined': true,
        'category': 'Operations/Personnel Violation',
        'percentile': {
          'year': 2007,
          'percentile_allegation': '91.5',
          'percentile_allegation_civilian': '97.0',
          'percentile_allegation_internal': '82.0',
          'percentile_trr': '92.3',
        },
      };
      const state = buildState({
        crs: { '123': { coaccused: [coaccusedObj] } },
        crPage: { crid: 123 },
      });

      contentSelector(state).coaccused.should.eql([{
        id: 1,
        officerId: 1,
        fullName: 'Michel Foo',
        complaintCount: 15,
        sustainedCount: 1,
        complaintPercentile: 59.0,
        age: '40-year-old',
        race: 'white',
        gender: 'male',
        coaccusedCount: 4,
        rank: 'Po As Detective',
        findingOutcomeMix: 'Reprimand',
        recommendedOutcome: '365 Day Suspension',
        outcome: 'Reprimand',
        finding: 'Sustained',
        category: 'Operations/Personnel Violation',
        disciplined: true,
        percentile: {
          items: [
            {
              'axis': 'Use of Force Reports',
              'value': 92.3,
            },
            {
              'axis': 'Officer Allegations',
              'value': 82,
            },
            {
              'axis': 'Civilian Allegations',
              'value': 97,
            },
          ],
          textColor: '#DFDFDF',
          visualTokenBackground: '#F52524',
          year: 2007,
        },
        isPinned: false,
      }]);
    });

    it('should return list of coaccused with isPinned', function () {
      const state = buildState({
        crs: {
          '123': {
            coaccused: [
              CoaccusedFactory.build({ id: 1 }),
              CoaccusedFactory.build({ id: 2 }),
            ],
          },
        },
        crPage: { crid: 123 },
        pinboardPage: {
          pinboard: {
            'officer_ids': ['1'],
          },
        },
      });

      const coaccusals = contentSelector(state).coaccused;
      find(coaccusals, { id: 1 }).isPinned.should.be.true();
      find(coaccusals, { id: 2 }).isPinned.should.be.false();
    });

    it('should prioritize officers user visited', function () {
      const officerInBreadcrumb = CoaccusedFactory.build({ id: 1 });
      const otherOfficer = CoaccusedFactory.build({ id: 2 });
      const state = buildState({
        breadcrumb: {
          breadcrumbItems: ['/officer/1/', '/cr/123/'],
        },
        crs: {
          '123': ComplaintFactory.build({
            coaccused: [otherOfficer, officerInBreadcrumb],
          }),
        },
        crPage: {
          crid: 123,
        },
      });

      contentSelector(state).coaccused.map(obj => obj.id).should.eql([1, 2]);
    });

    it('should prioritize officer user just visited', function () {
      const officerInBreadcrumb = CoaccusedFactory.build({ id: 1 });
      const justVisitedOfficer = CoaccusedFactory.build({ id: 2 });
      const otherOfficer = CoaccusedFactory.build({ id: 3 });
      const state = buildState({
        breadcrumb: {
          breadcrumbItems: ['/officer/1/', '/cr/123/', '/officer/2/'],
        },
        crs: {
          '123': ComplaintFactory.build({
            coaccused: [otherOfficer, justVisitedOfficer, officerInBreadcrumb],
          }),
        },
        crPage: {
          crid: 123,
        },
      });

      contentSelector(state).coaccused.map(obj => obj.id).should.eql([2, 1, 3]);
    });

    it('should prioritize officer with sustained finding', function () {
      const state = buildState({
        crs: {
          '123': ComplaintFactory.build({
            coaccused: [
              CoaccusedFactory.build({ id: 1, 'final_finding': 'Not Sustained' }),
              CoaccusedFactory.build({ id: 2, 'final_finding': 'Sustained' }),
            ],
          }),
        },
        crPage: {
          crid: 123,
        },
      });

      contentSelector(state).coaccused.map(obj => obj.id).should.eql([2, 1]);
    });

    it('should prioritize officers with most complaints', function () {
      const state = buildState({
        crs: {
          '123': ComplaintFactory.build({
            coaccused: [
              CoaccusedFactory.build({ id: 1, 'complaint_count': 11 }),
              CoaccusedFactory.build({ id: 2, 'complaint_count': 21 }),
            ],
          }),
        },
        crPage: {
          crid: 123,
        },
      });

      contentSelector(state).coaccused.map(obj => obj.id).should.eql([2, 1]);
    });

    it('should return list of involvements', function () {
      const state = buildState({
        crs: {
          '123': ComplaintFactory.build({
            involvements: [
              InvestigatorFactory.build({
                'officer_id': 1,
                'badge': 'CPD',
              }),
              InvestigatorFactory.build({
                'officer_id': 2,
                'badge': 'CPD',
              }),
              InvestigatorFactory.build({
                'officer_id': 5,
                'badge': '',
              }),
              PoliceWitnessFactory.build({ 'officer_id': 3 }),
              PoliceWitnessFactory.build({ 'officer_id': 4 }),
            ],
          }),
        },
        crPage: { crid: 123 },
      });

      const result = contentSelector(state);
      const investigators = result.involvements.investigator;
      investigators.map((obj) => obj.id).should.eql([1, 2, 5]);
      investigators.map((obj) => obj.tag).should.eql(['CPD', 'CPD', '']);

      result.involvements['police_witness'].map((obj) => obj.id).should.eql([3, 4]);
    });

    it('should return list of involvements with officer_id is null or undefined', function () {
      const state = buildState({
        crs: {
          '123': ComplaintFactory.build({
            involvements: [{
              'full_name': 'Robert Coleman',
              'officer_id': 1,
              'involved_type': 'investigator',
            }, {
              'full_name': 'Brian Killen',
              'officer_id': 2,
              'involved_type': 'investigator',
            }, {
              'full_name': 'Joshua Hunt',
              'involved_type': 'investigator',
            }, {
              'full_name': 'Sherry Daun',
              'officer_id': null,
              'involved_type': 'investigator',
            }, {
              'full_name': 'Jerome Finnigan',
              'officer_id': 5,
              'involved_type': 'investigator',
            }, {
              'full_name': 'Mazyar Hariri',
              'involved_type': 'police_witness',
            }, {
              'full_name': 'Bradley Hespe',
              'officer_id': 4,
              'involved_type': 'police_witness',
            }],
          }),
        },
        crPage: { crid: 123 },
      });
      const result = contentSelector(state);
      const investigators = result.involvements.investigator;
      const policeWitnesses = result.involvements['police_witness'];

      investigators.should.have.length(5);
      map(investigators, 'fullName').should.eql([
        'Robert Coleman', 'Brian Killen', 'Joshua Hunt', 'Sherry Daun', 'Jerome Finnigan',
      ]);
      policeWitnesses.should.have.length(2);
      map(policeWitnesses, 'fullName').should.eql(['Mazyar Hariri', 'Bradley Hespe']);
    });

    it('should return default data if cr data does not exists', function () {
      const state = buildState({
        crPage: { crid: 123 },
      });
      const result = contentSelector(state);
      should.not.exists(result.point);
      should.not.exists(result.incidentDate);
      should.not.exists(result.address);
      should.not.exists(result.location);
      result.category.should.eql('Unknown');
      result.subcategory.should.eql('Unknown');
    });

    it('should return incidentDate and location data if cr data are available', function () {
      const state = buildState({
        crs: {
          '123': ComplaintFactory.build({
            point: [1, 2],
            'incident_date': '2011-03-24',
            address: '123 Positiv Ave.',
            location: 'Police Building',
            beat: '1134',
          }),
        },
        crPage: { crid: 123 },
      });
      const result = contentSelector(state);
      result.point.should.eql([1, 2]);
      result.incidentDate.should.eql('2011-03-24');
      result.address.should.eql('123 Positiv Ave.');
      result.crLocation.should.eql('Police Building');
      result.beat.should.eql('1134');
    });

    it('should return list of attachments', function () {
      const doc = {
        title: 'abc',
        url: 'def',
        'preview_image_url': 'pre',
        'file_type': 'document',
        'id': '123456',
      };
      const state = buildState({
        crs: {
          '123': ComplaintFactory.build({
            attachments: [doc],
          }),
        },
        crPage: { crid: 123 },
      });

      contentSelector(state).attachments.should.eql([{
        title: 'abc',
        url: 'def',
        previewImageUrl: 'pre',
        fileType: 'document',
        id: '123456',
      }]);
    });

    it('should merge investigators with same officer ids', function () {
      const state = buildState({
        crs: {
          '100': ComplaintFactory.build({
            involvements: InvestigatorFactory.buildList(2, { 'officer_id': 3 }),
          }),
        },
        crPage: { crid: '100' },
      });
      const result = contentSelector(state);
      result.involvements.investigator.should.have.length(1);
      result.involvements.investigator[0].id.should.eql(3);
    });

    it('should not merge investigators with null officer ids', function () {
      const state = buildState({
        crs: {
          '100': ComplaintFactory.build({
            involvements: InvestigatorFactory.buildList(2, { 'officer_id': null }),
          }),
        },
        crPage: { crid: '100' },
      });
      const result = contentSelector(state);
      result.involvements.investigator.should.have.length(2);
    });
  });

  describe('getCRID', function () {
    it('should return crid', function () {
      const state = {
        crPage: {
          crid: 123,
        },
      };
      getCRID(state).should.eql('123');
    });
  });

  describe('getOfficerId', function () {
    it('should return officerId', function () {
      const state = {
        crPage: {
          officerId: 1,
        },
      };
      getOfficerId(state).should.eql(1);
    });
  });

  describe('getDocumentAlreadyRequested', function () {
    it('should return true when available', function () {
      const state = {
        crPage: {
          crid: 111,
          attachmentRequest: {
            subscribedCRIDs: {
              111: true,
            },
          },
        },
      };
      getDocumentAlreadyRequested(state).should.be.true();
    });

    it('should return false when unavailable', function () {
      const state = {
        crPage: {
          crid: 111,
          attachmentRequest: {
            subscribedCRIDs: {
              222: true,
            },
          },
        },
      };
      getDocumentAlreadyRequested(state).should.be.false();
    });
  });

  describe('getEditModeOn', function () {
    it('should return officer name', function () {
      getEditModeOn({
        crPage: { editModeOn: { a: true } },
      }).should.eql({ a: true });
    });
  });

  describe('hasAttachmentsSelector', function () {
    it('should return false if we have no attachment', function () {
      const state = {
        crPage: {
          crid: 123,
        },
        crs: {},
      };
      hasAttachmentsSelector(state).should.be.false();
    });

    it('should return true if we have attachments', function () {
      const state = {
        crPage: {
          crid: 123,
        },
        crs: {
          123: {
            attachments: [{
              url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
              previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
              fileType: 'document',
              id: '123456',
            }],
          },
        },
      };
      hasAttachmentsSelector(state).should.be.true();
    });
  });

  describe('isCrPinnedSelector', function () {
    it('should return true if crid is in pinboardItems', function () {
      const state = {
        crPage: {
          crid: '1000001',
        },
        pinboardPage: {
          pinboard: {
            crids: ['1000001', '1000002'],
          },
        },
      };
      isCrPinnedSelector(state).should.be.true();
    });

    it('should return false if crid is not in pinboardItems', function () {
      const state = {
        crPage: {
          crid: '1000003',
        },
        pinboardPage: {
          pinboard: {
            crids: ['1000001', '1000002'],
          },
        },
      };
      isCrPinnedSelector(state).should.be.false();
    });
  });

  describe('pinnableCrSelector', function () {
    it('should return correct data', function () {
      const state = {
        crPage: {
          'crid': '2458',
        },
        crs: {
          '2458': {
            'crid': '2458',
            'incident_date': '2015-04-04',
            'most_common_category': {
              'category': 'Use Of Force',
            },
          },
        },
      };
      pinnableCrSelector(state).should.eql({
        type: PINNED_ITEM_TYPES.CR,
        id: '2458',
        incidentDate: '2015-04-04',
        category: 'Use Of Force',
      });
    });
  });
});
