import should from 'should';

import { contentSelector, getCRID, getOfficerId, getDocumentAlreadyRequested } from 'selectors/cr-page';


describe('CR page selectors', function () {
  describe('contentSelector', function () {
    it('should return empty coaccused, complainants, documents, videos and audios array if crid does not exist',
      function () {
        const state = { crs: {}, crPage: { crid: 123 } };

        contentSelector(state).coaccused.should.eql([]);
        contentSelector(state).complainants.should.eql([]);
        contentSelector(state).involvements.should.eql([]);
        contentSelector(state).documents.should.eql([]);
        contentSelector(state).videos.should.eql([]);
        contentSelector(state).audios.should.eql([]);
      });

    it('should return list of complainants display string', function () {
      const complainant1 = { race: 'White', gender: 'Male', age: 18 };
      const complainant2 = {};
      const state = { crs: { '123': { complainants: [complainant1, complainant2] } }, crPage: { crid: 123 } };

      contentSelector(state).complainants.should.eql([
        'White, Male, Age 18',
        'Unknown, Unknown'
      ]);
    });

    it('should return list of coaccused', function () {
      const coaccusedObj = {
        'id': 1, 'full_name': 'Michel Foo', 'gender': 'Male', 'race': 'White', 'final_finding': 'Sustained',
        'recc_outcome': 'Reprimand', 'final_outcome': 'Reprimand', 'start_date': '2012-02-01',
        'end_date': '2013-02-01', 'category': 'Operations/Personnel Violation',
        'subcategory': 'Neglect of duty/conduct unbecoming - on duty'
      };
      const state = { crs: { '123': { coaccused: [coaccusedObj] } }, crPage: { crid: 123 } };

      contentSelector(state).coaccused.should.eql([{
        id: 1,
        fullName: 'Michel Foo',
        gender: 'Male',
        race: 'White',
        finalFinding: 'Sustained',
        reccOutcome: 'Reprimand',
        finalOutcome: 'Reprimand',
        startDate: '2012-02-01',
        endDate: '2013-02-01',
        category: 'Operations/Personnel Violation',
        subcategory: 'Neglect of duty/conduct unbecoming - on duty',
        badge: 'Unknown'
      }]);
    });

    it('should set coaccused gender, race, finalFinding, finalOutcome, '
      + 'reccOutcome, category, subcategory to Unknown if missing data', function () {
      const coaccusedObj = { 'id': 1, 'full_name': 'Michel Foo', 'start_date': '2012-02-01', 'end_date': '2013-02-01' };
      const state = { crs: { '123': { coaccused: [coaccusedObj] } }, crPage: { crid: 123 } };

      contentSelector(state).coaccused.should.eql([{
        id: 1,
        fullName: 'Michel Foo',
        gender: 'Unknown',
        race: 'Unknown',
        finalFinding: 'Unknown',
        reccOutcome: 'Unknown',
        finalOutcome: 'Unknown',
        startDate: '2012-02-01',
        endDate: '2013-02-01',
        category: 'Unknown',
        subcategory: 'Unknown',
        badge: 'Unknown'
      }]);
    });

    it('should return list of involvements', function () {
      const involvement = {
        'involved_type': 'Watch Commander',
        'officers': [{ 'id': 1, 'abbr_name': 'F. Bar', 'extra_info': 'male, white' }]
      };
      const state = { crs: { '123': { involvements: [involvement] } }, crPage: { crid: 123 } };

      contentSelector(state).involvements.should.eql([{
        involvedType: 'Watch Commander',
        officers: [{ id: 1, abbrName: 'F. Bar', extraInfo: 'male, white' }]
      }]);
    });

    it('should return undefined incidentDate and location data if cr data does not exists', function () {
      const state = { crs: {}, crPage: { crid: 123 } };
      const result = contentSelector(state);
      should.not.exists(result.point);
      should.not.exists(result.incidentDate);
      should.not.exists(result.address);
      should.not.exists(result.location);
      result.beat.should.eql({ name: 'Unknown' });
    });

    it('should return incidentDate and location data if cr data are available', function () {
      const state = {
        crs: {
          '123': {
            point: [1, 2],
            'incident_date': '2011-03-24',
            address: '123 Positiv Ave.',
            location: 'Police Building',
            beat: { name: '1134' }
          }
        },
        crPage: { crid: 123 }
      };
      const result = contentSelector(state);
      result.point.should.eql([1, 2]);
      result.incidentDate.should.eql('2011-03-24');
      result.address.should.eql('123 Positiv Ave.');
      result.location.should.eql('Police Building');
      result.beat.should.eql({ name: '1134' });
    });

    it('should return list of documents', function () {
      const doc = { title: 'abc', url: 'def' };
      const state = { crs: { '123': { documents: [doc] } }, crPage: { crid: 123 } };

      contentSelector(state).documents.should.eql([doc]);
    });

    it('should return list of videos', function () {
      const video = { title: 'abc', url: 'def' };
      const state = { crs: { '123': { videos: [video] } }, crPage: { crid: 123 } };

      contentSelector(state).videos.should.eql([video]);
    });

    it('should return list of documents', function () {
      const audio = { title: 'abc', url: 'def' };
      const state = { crs: { '123': { audios: [audio] } }, crPage: { crid: 123 } };

      contentSelector(state).audios.should.eql([audio]);
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
