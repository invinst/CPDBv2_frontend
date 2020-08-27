import React from 'react';
import { shallow } from 'enzyme';

import { LawsuitPane } from 'components/common/preview-pane/panes';
import { NewWidgetWrapper, ListWidget } from 'components/common/preview-pane/widgets';


describe('OfficerPane component', () => {
  const lawsuit = {
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
        count: 3,
        id: 512,
        name: 'Jane Doe',
        radarAxes: undefined,
        radarColor: undefined,
        url: '/officer/512/jane-doe/',
      },
      {
        count: 3,
        id: 412,
        name: 'Sidney Allgood',
        radarAxes: undefined,
        radarColor: undefined,
        url: '/officer/412/sidney-allgood/',
      },
      {
        count: 3,
        id: 24379,
        name: 'William Rodriguez',
        radarAxes: [
          {
            axis: 'Use of Force Reports',
            value: NaN,
          },
          {
            axis: 'Officer Allegations',
            value: NaN,
          },
          {
            axis: 'Civilian Allegations',
            value: NaN,
          },
        ],
        radarColor: '#F4A298',
        url: '/officer/24379/william-rodriguez/',
      },
      {
        count: 6,
        id: 19002,
        name: 'Richard Mierniczak',
        radarAxes: [
          {
            axis: 'Use of Force Reports',
            value: 0,
          },
          {
            axis: 'Officer Allegations',
            value: 77.7431,
          },
          {
            axis: 'Civilian Allegations',
            value: 29.1229,
          },
        ],
        radarColor: '#F4A298',
        url: '/officer/19002/richard-mierniczak/',
      },
    ],
    plaintiffs: [
      {
        name: 'Arthur Hutchinson',
      },
    ],
    primaryCause: 'EXCESSIVE FORCE',
    incidentDate: '2016-09-11',
    address: 'address',
    caseNo: '00-L-5230',
  };

  it('should contain the sub components', () => {
    const wrapper = shallow(<LawsuitPane { ...lawsuit }/>);

    const widgetWrapper = wrapper.find(NewWidgetWrapper);
    widgetWrapper.prop('callToAction').should.eql({
      to: '/lawsuit/00-L-5230/',
      text: 'View full Lawsuit Details',
    });

    const title = wrapper.find('.lawsuit-title .case-no');
    title.text().should.equal('Case 00-L-5230');
    const subTitle = wrapper.find('.lawsuit-title .primary-cause');
    subTitle.text().should.equal('EXCESSIVE FORCE');

    const totalPaymentValue = wrapper.find('.total-payments .field-row-value');
    totalPaymentValue.text().should.eql('$60.0K');

    const caseDetailsRowLabels = wrapper.find('.case-details-section .field-row .field-row-label');
    const caseDetailsRowValues = wrapper.find('.case-details-section .field-row .field-row-value');
    caseDetailsRowLabels.at(0).text().should.eql('Plaintiff');
    caseDetailsRowValues.at(0).text().should.eql('Arthur Hutchinson');
    caseDetailsRowLabels.at(1).text().should.eql('Incident date');
    caseDetailsRowValues.at(1).text().should.eql('2016-09-11');
    caseDetailsRowLabels.at(2).text().should.eql('Location');
    caseDetailsRowValues.at(2).text().should.eql('near intersection of N Waveland and Sheffield');
    caseDetailsRowValues.at(3).text().should.eql('address');

    const listWidget = wrapper.find(ListWidget);
    listWidget.prop('items').should.eql(lawsuit.officers);
  });

  it('should not render location if there is no location', function () {
    const lawsuitWithoutLocation = { ...lawsuit, location: '' };
    const wrapper = shallow(<LawsuitPane { ...lawsuitWithoutLocation }/>);
    wrapper.find('.location-description').exists().should.be.false();
  });
});
