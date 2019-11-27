import React from 'react';
import { shallow } from 'enzyme';

import CRPane from 'components/common/preview-pane/panes/cr-pane';
import { NewWidgetWrapper, ListWidget } from 'components/common/preview-pane/widgets';
import Demographics from 'components/common/demographics';


describe('CRPane component', () => {
  it('should contain the sub components', () => {
    const accusedOfficers = [{
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
    }];

    const wrapper = shallow(
      <CRPane
        to='/complaint/123/'
        category='Use Of Force'
        subCategory='Excessive Force - Use Of Firearm / Off Duty - No Injury'
        incidentDate='JUL 2, 2012'
        address='14XX W 63RD ST, CHICAGO IL 60636'
        victims={ ['Hispanic, Female', 'Hispanic, Female, Age 48'] }
        coaccused={ accusedOfficers }
      />
    );

    const widgetWrapper = wrapper.find(NewWidgetWrapper);
    widgetWrapper.prop('callToAction').should.eql({
      to: '/complaint/123/',
      text: 'View Complaint Record',
    });

    const title = wrapper.find('.cr-preview-pane-title-title');
    title.text().should.equal('Use Of Force');
    const subTitle = wrapper.find('.cr-preview-pane-title-subtitle');
    subTitle.text().should.equal('Excessive Force - Use Of Firearm / Off Duty - No Injury');

    const infoRows = wrapper.find('.cr-preview-pane-info-row');
    infoRows.at(0).text().should.equal('JUL 2, 2012');
    infoRows.at(1).text().should.equal('14XX W 63RD ST, CHICAGO IL 60636');

    const demographics = wrapper.find(Demographics);
    demographics.prop('className').should.equal('cr-preview-pane-victims');
    demographics.prop('persons').should.eql(['Hispanic, Female', 'Hispanic, Female, Age 48']);
    const victimsText = wrapper.find('.cr-preview-pane-victims-text');
    victimsText.text().should.equal('VICTIMS');

    const accused = wrapper.find(ListWidget);
    accused.prop('typeName').should.equal('allegation');
    accused.prop('title').should.equal('ACCUSED OFFICERS');
    accused.prop('items').should.eql(accusedOfficers);
    accused.prop('showItemArrow').should.be.false();
    accused.prop('wrapperClassName').should.equal('cr-preview-pane-accused');
  });

  it('should pluralize content', function () {
    const wrapper = shallow(
      <CRPane
        to='/complaint/123/'
        category='Use Of Force'
        subCategory='Excessive Force - Use Of Firearm / Off Duty - No Injury'
        incidentDate='JUL 2, 2012'
        address='14XX W 63RD ST, CHICAGO IL 60636'
        victims={ ['Hispanic, Female'] }
        coaccused={ [{
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
        }] }
      />
    );

    const victimsText = wrapper.find('.cr-preview-pane-victims-text');
    victimsText.text().should.equal('VICTIM');
    const accused = wrapper.find(ListWidget);
    accused.prop('title').should.equal('ACCUSED OFFICER');
  });

  it('should not display victims section if there are victims are not passed in', function () {
    const wrapper = shallow(
      <CRPane
        to='/complaint/123/'
        category='Use Of Force'
        subCategory='Excessive Force - Use Of Firearm / Off Duty - No Injury'
        incidentDate='JUL 2, 2012'
        address='14XX W 63RD ST, CHICAGO IL 60636'
        coaccused={ [{
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
        }] }
      />
    );

    const victimsText = wrapper.find('.cr-preview-pane-victims-text');
    victimsText.length.should.equal(0);
    const accused = wrapper.find('.cr-preview-pane-victims');
    accused.length.should.equal(0);
  });

  it('should not display victims section if there are no victims', function () {
    const wrapper = shallow(
      <CRPane
        to='/complaint/123/'
        category='Use Of Force'
        subCategory='Excessive Force - Use Of Firearm / Off Duty - No Injury'
        incidentDate='JUL 2, 2012'
        address='14XX W 63RD ST, CHICAGO IL 60636'
        victims={ [] }
        coaccused={ [{
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
        }] }
      />
    );

    const victimsText = wrapper.find('.cr-preview-pane-victims-text');
    victimsText.length.should.equal(0);
    const accused = wrapper.find('.cr-preview-pane-victims');
    accused.length.should.equal(0);
  });

  it('should not render address section if there is no address', function () {
    const accusedOfficers = [{
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
    }];
    const wrapper = shallow(
      <CRPane
        to='/complaint/123/'
        category='Use Of Force'
        subCategory='Excessive Force - Use Of Firearm / Off Duty - No Injury'
        incidentDate='JUL 2, 2012'
        victims={ ['Hispanic, Female', 'Hispanic, Female, Age 48'] }
        coaccused={ accusedOfficers }
      />
    );
    wrapper.find('.cr-preview-pane-address').should.have.length(0);
  });
});
