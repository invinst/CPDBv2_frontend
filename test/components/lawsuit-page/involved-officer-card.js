import React from 'react';
import { spy } from 'sinon';

import { mountWithRouter } from 'utils/test';
import InvolvedOfficerCard from 'components/lawsuit-page/involved-officer-card';
import SmallRadarChartOfficerCard from 'components/common/small-radar-chart-officer-card';
import style from 'components/lawsuit-page/involved-officer-card.sass';

describe('InvolvedOfficerCard component', function () {
  const officer = {
    complaintCount: 12,
    fullName: 'Joseph Nega',
    officerId: 32218,
    lawsuitPayment: '1.1M',
    lawsuitCount: 3,
  };

  it('should render enough sections', function () {
    const addOrRemoveItemInPinboardSpy = spy();
    const wrapper = mountWithRouter(
      <InvolvedOfficerCard
        officer={ officer }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
      />
    );

    const smallRadarChartOfficerCard = wrapper.find(SmallRadarChartOfficerCard);
    smallRadarChartOfficerCard.exists().should.be.true();
    smallRadarChartOfficerCard.prop('officerId').should.eql(officer.officerId);
    smallRadarChartOfficerCard.prop('complaintCount').should.eql(officer.complaintCount);
    smallRadarChartOfficerCard.prop('fullName').should.eql(officer.fullName);
    smallRadarChartOfficerCard.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboardSpy);
    smallRadarChartOfficerCard.prop('className').should.eql(style.involvedOfficerCard);

    wrapper.find('.officer-total-payments').exists().should.be.true();
    wrapper.find('.officer-total-payments-value').text().should.eql(`$${officer.lawsuitPayment}`);
    wrapper.find('.officer-total-lawsuits').text().should.eql(`in ${officer.lawsuitCount} lawsuits`);
  });
});
