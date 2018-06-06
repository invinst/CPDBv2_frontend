import should from 'should';

import {
  contentSelector, getCRID, getOfficerId, getDocumentAlreadyRequested
} from 'selectors/cr-page';
import {
  InvestigatorFactory, PoliceWitnessFactory, CoaccusedFactory, ComplaintFactory
} from 'utils/test/factories/complaint';


describe('CR page selectors', function () {
  describe('contentSelector', function () {
    const buildState = obj => ({
      breadcrumb: {
        breadcrumbs: []
      },
      crs: {},
      crPage: {},
      ...obj
    });

    it('should return empty coaccused, complainants, documents, videos and audios array if crid does not exist',
      function () {
        const state = buildState({
          crPage: { crid: 123 }
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
        crPage: { crid: 123 }
      });

      contentSelector(state).complainants.should.eql([
        'White, Male, Age 18', ''
      ]);
    });

    it('should return list of coaccused', function () {
      const coaccusedObj = {
        'id': 1,
        'full_name': 'Michel Foo',
        'gender': 'Male',
        'race': 'White',
        'final_outcome': 'Reprimand',
        'final_finding': 'Sustained',
        'category': 'Operations/Personnel Violation',
        'rank': 'Officer',
        'age': 34,
        'allegation_count': 12,
        'sustained_count': 1,
        'percentile_allegation': 1,
        'percentile_allegation_civilian': 52.5,
        'percentile_allegation_internal': 10.1,
        'percentile_trr': 20.6
      };
      const state = buildState({
        crs: { '123': { coaccused: [coaccusedObj] } },
        crPage: { crid: 123 }
      });

      contentSelector(state).coaccused.should.eql([{
        id: 1,
        fullname: 'Michel Foo',
        demographic: '34 year old, White, Male',
        findingOutcomeMix: ['Reprimand'],
        finding: 'Sustained',
        category: 'Operations/Personnel Violation',
        rank: 'Officer',
        allegationCount: 12,
        sustainedCount: 1,
        allegationPercentile: 1,
        radarAxes: [
          {
            axis: 'trr',
            value: 20.6,
          },
          {
            axis: 'internal',
            value: 10.1,
          },
          {
            axis: 'civilian',
            value: 52.5,
          },
        ],
        radarColor: {
          backgroundColor: '#f3adad',
          textColor: '#231F20'
        }
      }]);
    });

    it('should prioritize officers user visited', function () {
      const officerInBreadcrumb = CoaccusedFactory.build({ id: 1 });
      const otherOfficer = CoaccusedFactory.build({ id: 2 });
      const state = buildState({
        breadcrumb: {
          breadcrumbs: [{
            url: '/officer/1/',
            params: {
              officerId: '1'
            }
          }]
        },
        crs: {
          '123': ComplaintFactory.build({
            coaccused: [otherOfficer, officerInBreadcrumb]
          })
        },
        crPage: {
          crid: 123
        }
      });

      contentSelector(state).coaccused.map(obj => obj.id).should.eql([1, 2]);
    });

    it('should prioritize officer user just visited', function () {
      const officerInBreadcrumb = CoaccusedFactory.build({ id: 1 });
      const justVisitedOfficer = CoaccusedFactory.build({ id: 2 });
      const otherOfficer = CoaccusedFactory.build({ id: 3 });
      const state = buildState({
        breadcrumb: {
          breadcrumbs: [
            {
              url: '/officer/1/',
              params: { officerId: '1' }
            },
            {
              url: '/officer/2/',
              params: { officerId: '2' }
            }
          ]
        },
        crs: {
          '123': ComplaintFactory.build({
            coaccused: [otherOfficer, justVisitedOfficer, officerInBreadcrumb]
          })
        },
        crPage: {
          crid: 123
        }
      });

      contentSelector(state).coaccused.map(obj => obj.id).should.eql([2, 1, 3]);
    });

    it('should prioritize officer with sustained finding', function () {
      const state = buildState({
        crs: {
          '123': ComplaintFactory.build({
            coaccused: [
              CoaccusedFactory.build({ id: 1, 'final_finding': 'Not Sustained' }),
              CoaccusedFactory.build({ id: 2, 'final_finding': 'Sustained' })
            ]
          })
        },
        crPage: {
          crid: 123
        }
      });

      contentSelector(state).coaccused.map(obj => obj.id).should.eql([2, 1]);
    });

    it('should prioritize officers with most complaints', function () {
      const state = buildState({
        crs: {
          '123': ComplaintFactory.build({
            coaccused: [
              CoaccusedFactory.build({ id: 1, 'allegation_count': 11 }),
              CoaccusedFactory.build({ id: 2, 'allegation_count': 21 })
            ]
          })
        },
        crPage: {
          crid: 123
        }
      });

      contentSelector(state).coaccused.map(obj => obj.id).should.eql([2, 1]);
    });

    it('should set coaccused gender, race, finalOutcome, '
      + 'category to default value if missing data', function () {
      const coaccusedObj = {
        'id': 1,
        'full_name': 'Michel Foo',
        'start_date': '2012-02-01',
        'end_date': '2013-02-01',
        'final_outcome': 'abc'
      };
      const state = buildState({
        crs: { '123': { coaccused: [coaccusedObj] } },
        crPage: { crid: 123 }
      });

      const coaccused = contentSelector(state).coaccused[0];
      coaccused.rank.should.eql('Officer');
      coaccused.demographic.should.eql('');
      coaccused.category.should.eql('Unknown');
    });

    it('should return list of involvements', function () {
      const state = buildState({
        crs: {
          '123': ComplaintFactory.build({
            involvements: [
              InvestigatorFactory.build({
                'officer_id': 1,
                'current_rank': 'IPRA investigator'
              }),
              InvestigatorFactory.build({
                'officer_id': 2,
                'current_rank': 'CPD investigator'
              }),
              PoliceWitnessFactory.build({ 'officer_id': 3 }),
              PoliceWitnessFactory.build({ 'officer_id': 4 })
            ]
          })
        },
        crPage: { crid: 123 }
      });

      const result = contentSelector(state);
      const investigators = result.involvements.investigator;
      investigators.map((obj) => obj.id).should.eql([1, 2]);
      investigators.map((obj) => obj.tag).should.eql(['IPRA', 'CPD']);

      result.involvements['police_witness'].map((obj) => obj.id).should.eql([3, 4]);
    });

    it('should return undefined incidentDate and location data if cr data does not exists', function () {
      const state = buildState({
        crPage: { crid: 123 }
      });
      const result = contentSelector(state);
      should.not.exists(result.point);
      should.not.exists(result.incidentDate);
      should.not.exists(result.address);
      should.not.exists(result.location);
      result.beat.should.eql('Unknown');
    });

    it('should return incidentDate and location data if cr data are available', function () {
      const state = buildState({
        crs: {
          '123': ComplaintFactory.build({
            point: [1, 2],
            'incident_date': '2011-03-24',
            address: '123 Positiv Ave.',
            location: 'Police Building',
            beat: '1134'
          })
        },
        crPage: { crid: 123 }
      });
      const result = contentSelector(state);
      result.point.should.eql([1, 2]);
      result.incidentDate.should.eql('2011-03-24');
      result.address.should.eql('123 Positiv Ave.');
      result.crLocation.should.eql('Police Building');
      result.beat.should.eql('1134');
    });

    it('should return list of attachments', function () {
      const doc = { title: 'abc', url: 'def', 'preview_image_url': 'pre', 'file_type': 'document' };
      const state = buildState({
        crs: {
          '123': ComplaintFactory.build({
            attachments: [doc]
          })
        },
        crPage: { crid: 123 }
      });

      contentSelector(state).attachments.should.eql([{
        title: 'abc',
        url: 'def',
        previewImageUrl: 'pre',
        fileType: 'document'
      }]);
    });

    it('should merge investigators with same officer ids', function () {
      const state = buildState({
        crs: {
          '100': ComplaintFactory.build({
            involvements: InvestigatorFactory.buildList(2, { 'officer_id': 3 })
          })
        },
        crPage: { crid: '100' }
      });
      const result = contentSelector(state);
      result.involvements.investigator.should.have.length(1);
      result.involvements.investigator[0].id.should.eql(3);
    });

    it('should not merge investigators with null officer ids', function () {
      const state = buildState({
        crs: {
          '100': ComplaintFactory.build({
            involvements: InvestigatorFactory.buildList(2, { 'officer_id': null })
          })
        },
        crPage: { crid: '100' }
      });
      const result = contentSelector(state);
      result.involvements.investigator.should.have.length(2);
    });
  });

  describe('getCRID', function () {
    it('should return crid', function () {
      const state = {
        crPage: {
          crid: 123
        }
      };
      getCRID(state).should.eql('123');
    });
  });

  describe('getOfficerId', function () {
    it('should return officerId', function () {
      const state = {
        crPage: {
          officerId: 1
        }
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
              111: true
            }
          }
        }
      };
      getDocumentAlreadyRequested(state).should.be.true();
    });

    it('should return false when unavailable', function () {
      const state = {
        crPage: {
          crid: 111,
          attachmentRequest: {
            subscribedCRIDs: {
              222: true
            }
          }
        }
      };
      getDocumentAlreadyRequested(state).should.be.false();
    });
  });
});
