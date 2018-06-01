import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import TRRInfoSection from 'components/trr-page/trr-info-section';
import TRRDetail from 'components/trr-page/trr-info-section/trr-detail';
import TRRDocument from 'components/trr-page/trr-info-section/trr-document';
import TRRLocation from 'components/trr-page/trr-info-section/trr-location';


describe('TRRInfoSection component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render TRRDetail, TRRDocument and TRRLocation', function () {
    const trrLocation = {
      address: '22XX Damen Ave',
      incidentDate: 'APR 18, 2004',
      beat: '1034',
      locationType: 'Police Facility/Veh Parking Lot',
    };
    const trrDetail = {
      subjectDemographic: 'Black, Male, 21 years old',
      category: 'Other',
      forceTypes: ['Stiffened (Dead Weight)', 'Did Not Follow Verbal Direction', 'Imminent Threat Of Battery'],
    };
    const trrDocument = {
      alreadyRequested: false,
    };
    const openRequestTRRDocumentModal = spy();


    instance = renderIntoDocument(
      <TRRInfoSection
        trrDetail={ trrDetail }
        trrDocument={ trrDocument }
        trrLocation={ trrLocation }
        openRequestTRRDocumentModal={ openRequestTRRDocumentModal }
      />
    );
    const detail = findRenderedComponentWithType(instance, TRRDetail);
    const document = findRenderedComponentWithType(instance, TRRDocument);
    const location = findRenderedComponentWithType(instance, TRRLocation);

    detail.props.subjectDemographic.should.eql('Black, Male, 21 years old');
    detail.props.category.should.eql('Other');
    detail.props.forceTypes.should.eql([
      'Stiffened (Dead Weight)',
      'Did Not Follow Verbal Direction',
      'Imminent Threat Of Battery'
    ]);

    document.props.alreadyRequested.should.be.false();

    location.props.address.should.eql('22XX Damen Ave');
    location.props.incidentDate.should.eql('APR 18, 2004');
    location.props.beat.should.eql('1034');
    location.props.locationType.should.eql('Police Facility/Veh Parking Lot');
  });
});
