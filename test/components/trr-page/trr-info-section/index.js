import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TRRInfoSection from 'components/trr-page/trr-info-section';
import TRRDetail from 'components/trr-page/trr-info-section/trr-detail';
import TRRDocument from 'components/trr-page/trr-info-section/trr-document';
import TRRLocation from 'components/trr-page/trr-info-section/trr-location';


describe('TRRInfoSection component', function () {
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
    const openRequestTRRDocumentModal = sinon.spy();

    const wrapper = shallow(
      <TRRInfoSection
        trrDetail={ trrDetail }
        trrDocument={ trrDocument }
        trrLocation={ trrLocation }
        openRequestTRRDocumentModal={ openRequestTRRDocumentModal }
      />
    );
    const detail = wrapper.find(TRRDetail);
    const document = wrapper.find(TRRDocument);
    const location = wrapper.find(TRRLocation);

    detail.prop('subjectDemographic').should.equal('Black, Male, 21 years old');
    detail.prop('category').should.equal('Other');
    detail.prop('forceTypes').should.eql([
      'Stiffened (Dead Weight)',
      'Did Not Follow Verbal Direction',
      'Imminent Threat Of Battery',
    ]);

    document.prop('alreadyRequested').should.be.false();

    location.prop('address').should.equal('22XX Damen Ave');
    location.prop('incidentDate').should.equal('APR 18, 2004');
    location.prop('beat').should.equal('1034');
    location.prop('locationType').should.equal('Police Facility/Veh Parking Lot');
  });
});
