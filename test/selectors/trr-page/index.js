import {
  getTRRId,
  officerSelector,
  trrDetailSelector,
  trrDocumentSelector,
  trrLocationSelector,
} from 'selectors/trr-page';


describe('TRR page selectors', function () {
  describe('getTRRId', function () {
    it('should return crid', function () {
      const state = {
        trrPage: {
          trrId: 123
        }
      };
      getTRRId(state).should.eql('123');
    });
  });

  describe('officerSelector', function () {
    it('should handle missing officer cases', function () {
      const state = {
        trrPage: {
          data: {
            'officer_assigned_beat': 'some beat',
            'officer_on_duty': true,
            'officer_in_uniform': true,
          }
        }
      };
      officerSelector(state).should.eql({});
    });

    it('should handle missing values', function () {
      const state = {
        trrPage: {
          data: {
            officer: {}
          }
        }
      };
      officerSelector(state).should.eql({
        officerId: undefined,
        fullName: undefined,
        unitName: undefined,
        unitDescription: undefined,
        birthYear: undefined,
        yearOld: null,
        race: undefined,
        gender: undefined,
        careerDuration: '',
        percentile: {
          officerId: undefined,
          year: undefined,
          items: [
            { axis: 'Use of Force Reports', value: NaN },
            { axis: 'Officer Allegations', value: NaN },
            { axis: 'Civilian Allegations', value: NaN }
          ],
          visualTokenBackground: undefined,
          textColor: '#231F20',
        },
        assignedBeat: undefined,
        onDuty: undefined,
        inUniform: undefined,
      });
    });

    it('should return all information related to the officer', function () {
      const state = {
        trrPage: {
          data: {
            officer: {
              id: 123,
              'full_name': 'Ronald Watts',
              unit: {
                'unit_name': '001',
                'description': 'Unit 001',
              },
              'birth_year': 1960,
              race: 'White',
              gender: 'Male',
              'appointed_date': '1999-12-13',
              'date_of_resignation': '2015-12-23',
              'percentile_allegation_internal': 11.1,
              'percentile_allegation_civilian': 22.2,
              'percentile_trr': 99.9,
            },
            'officer_assigned_beat': 'some beat',
            'officer_on_duty': true,
            'officer_in_uniform': true,
          }
        }
      };
      officerSelector(state).should.eql({
        officerId: 123,
        fullName: 'Ronald Watts',
        unitName: '001',
        unitDescription: 'Unit 001',
        birthYear: 1960,
        yearOld: 57,
        race: 'White',
        gender: 'Male',
        careerDuration: 'DEC 13, 1999 — DEC 23, 2015',
        percentile: {
          officerId: undefined,
          year: undefined,
          items: [
            { axis: 'Use of Force Reports', value: 99.9 },
            { axis: 'Officer Allegations', value: 11.1 },
            { axis: 'Civilian Allegations', value: 22.2 }
          ],
          visualTokenBackground: '#e85050',
          textColor: '#231F20',
        },
        assignedBeat: 'some beat',
        onDuty: true,
        inUniform: true,
      });
    });
  });

  describe('trrDetailSelector', function () {
    it('should select correctly', function () {
      const state = {
        trrPage: {
          data: {
            'subject_race': 'White',
            'subject_gender': 'Male',
            'subject_age': 37,
            'force_category': 'Other',
            'force_types': ['Verbal Commands'],
          }
        }
      };

      trrDetailSelector(state).should.eql({
        subjectDemographic: 'White, Male, 37 years old',
        category: 'Other',
        forceTypes: ['Verbal Commands'],
      });
    });

    it('should cover missing data cases', function () {
      trrDetailSelector({
        trrPage: {
          data: {
            'subject_race': 'White',
            'subject_gender': 'Male',
            'force_category': 'Other',
            'force_types': ['Verbal Commands'],
          }
        }
      }).should.eql({
        subjectDemographic: 'White, Male',
        category: 'Other',
        forceTypes: ['Verbal Commands'],
      });

      trrDetailSelector({
        trrPage: {
          data: {
            'subject_race': 'White',
            'subject_age': 37,
            'force_category': 'Other',
            'force_types': ['Verbal Commands'],
          }
        }
      }).should.eql({
        subjectDemographic: 'White, 37 years old',
        category: 'Other',
        forceTypes: ['Verbal Commands'],
      });

      trrDetailSelector({
        trrPage: {
          data: {
            'subject_gender': 'Male',
            'subject_age': 37,
            'force_category': 'Other',
            'force_types': ['Verbal Commands'],
          }
        }
      }).should.eql({
        subjectDemographic: 'Male, 37 years old',
        category: 'Other',
        forceTypes: ['Verbal Commands'],
      });
    });
  });

  describe('trrDocumentSelector', function () {
    it('should select correctly', function () {
      trrDocumentSelector({
        trrPage: {
          trrId: 123,
          attachmentRequest: {
            subscribedTRRIds: {
              123: true,
            }
          },
        }
      }).should.eql({ alreadyRequested: true });

      trrDocumentSelector({
        trrPage: {
          trrId: 456,
          attachmentRequest: {
            subscribedTRRIds: {
              123: true,
            }
          },
        }
      }).should.eql({ alreadyRequested: false });
    });
  });

  describe('trrDetailSelector', function () {
    it('should select correctly', function () {
      const state = {
        trrPage: {
          data: {
            'subject_race': 'White',
            'subject_gender': 'Male',
            'subject_age': 37,
            'force_category': 'Other',
            'force_types': ['Verbal Commands'],
          }
        }
      };

      trrDetailSelector(state).should.eql({
        subjectDemographic: 'White, Male, 37 years old',
        category: 'Other',
        forceTypes: ['Verbal Commands'],
      });
    });

    it('should cover missing data cases', function () {
      trrDetailSelector({
        trrPage: {
          data: {
            'subject_race': 'White',
            'subject_gender': 'Male',
            'force_category': 'Other',
            'force_types': ['Verbal Commands'],
          }
        }
      }).should.eql({
        subjectDemographic: 'White, Male',
        category: 'Other',
        forceTypes: ['Verbal Commands'],
      });

      trrDetailSelector({
        trrPage: {
          data: {
            'subject_race': 'White',
            'subject_age': 37,
            'force_category': 'Other',
            'force_types': ['Verbal Commands'],
          }
        }
      }).should.eql({
        subjectDemographic: 'White, 37 years old',
        category: 'Other',
        forceTypes: ['Verbal Commands'],
      });

      trrDetailSelector({
        trrPage: {
          data: {
            'subject_gender': 'Male',
            'subject_age': 37,
            'force_category': 'Other',
            'force_types': ['Verbal Commands'],
          }
        }
      }).should.eql({
        subjectDemographic: 'Male, 37 years old',
        category: 'Other',
        forceTypes: ['Verbal Commands'],
      });
    });
  });

  describe('trrLocationSelector', function () {
    it('should select correctly', function () {
      trrLocationSelector({
        trrPage: {
          data: {
            'date_of_incident': '2001-01-01',
            address: '34XX Douglas Blvd',
            beat: 1021,
            'location_type': 'Factory',
            point: {
              'lat': 41.7508596,
              'lng': -87.6533166,
            },
          }
        }
      }).should.eql({
        incidentDate: 'JAN 1, 2001',
        address: '34XX Douglas Blvd',
        beat: '1021',
        locationType: 'Factory',
        point: {
          'lat': 41.7508596,
          'lng': -87.6533166,
        },
      });
    });
  });

  describe('trrDocumentSelector', function () {
    it('should select correctly', function () {
      trrDocumentSelector({
        trrPage: {
          trrId: 123,
          attachmentRequest: {
            subscribedTRRIds: {
              123: true,
            }
          },
        }
      }).should.eql({ alreadyRequested: true });

      trrDocumentSelector({
        trrPage: {
          trrId: 456,
          attachmentRequest: {
            subscribedTRRIds: {
              123: true,
            }
          },
        }
      }).should.eql({ alreadyRequested: false });
    });
  });
});
