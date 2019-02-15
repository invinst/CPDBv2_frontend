import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import CRPane from 'components/search-page/preview-pane/cr-pane';
import { NewWidgetWrapper, ListWidget } from 'components/search-page/preview-pane/widgets';
import Demographics from 'components/common/demographics';
import { unmountComponentSuppressError } from 'utils/test';


describe.only('CRPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    const accusedOfficers = [{
      id: 16567,
      name: 'Baudilio Lopez',
      url: '/officer/16567/baudilio-lopez/',
      radarAxes: [
        { axis: 'Use of Force Reports', value: 72.1094 },
        { axis: 'Officer Allegations', value: 61.1521 },
        { axis: 'Civilian Allegations', value: 98.5549 }
      ],
      radarColor: '#f0201e',
      count: 93
    }, {
      id: 7544,
      name: 'Dominique Dunigan',
      url: '/officer/7544/dominique-dunigan/',
      radarAxes: [
        { axis: 'Use of Force Reports', value: 0 },
        { axis: 'Officer Allegations', value: 0 },
        { axis: 'Civilian Allegations', value: 24.118 }
      ],
      radarColor: '#f5c5a2',
      count: 1
    }];

    instance = renderIntoDocument(
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

    const wrapper = findRenderedComponentWithType(instance, NewWidgetWrapper);
    wrapper.props.callToAction.should.eql({
      to: '/complaint/123/',
      text: 'View Complaint Record'
    });

    const title = findRenderedDOMComponentWithClass(instance, 'cr-preview-pane-title-title');
    title.textContent.should.eql('Use Of Force');
    const subTitle = findRenderedDOMComponentWithClass(instance, 'cr-preview-pane-title-subtitle');
    subTitle.textContent.should.eql('Excessive Force - Use Of Firearm / Off Duty - No Injury');

    const infoRows = scryRenderedDOMComponentsWithClass(instance, 'cr-preview-pane-info-row');
    infoRows[0].textContent.should.eql('JUL 2, 2012');
    infoRows[1].textContent.should.eql('14XX W 63RD ST, CHICAGO IL 60636');

    const demographics = findRenderedComponentWithType(instance, Demographics);
    demographics.props.className.should.eql('cr-preview-pane-victims');
    demographics.props.persons.should.eql(['Hispanic, Female', 'Hispanic, Female, Age 48']);
    const victimsText = findRenderedDOMComponentWithClass(instance, 'cr-preview-pane-victims-text');
    victimsText.textContent.should.eql('VICTIMS');

    const accused = findRenderedComponentWithType(instance, ListWidget);
    accused.props.typeName.should.eql('allegation');
    accused.props.title.should.eql('ACCUSED OFFICERS');
    accused.props.items.should.eql(accusedOfficers);
    accused.props.showItemArrow.should.be.true();
    accused.props.wrapperClassName.should.eql('cr-preview-pane-accused');
  });

  it('should pluralize content', function () {
    instance = renderIntoDocument(
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
            { axis: 'Civilian Allegations', value: 98.5549 }
          ],
          radarColor: '#f0201e',
          count: 93
        }] }
      />
    );

    const victimsText = findRenderedDOMComponentWithClass(instance, 'cr-preview-pane-victims-text');
    victimsText.textContent.should.eql('VICTIM');
    const accused = findRenderedComponentWithType(instance, ListWidget);
    accused.props.title.should.eql('ACCUSED OFFICER');
  });

  it('should not display victims section if there are victims are not passed in', function () {
    instance = renderIntoDocument(
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
            { axis: 'Civilian Allegations', value: 98.5549 }
          ],
          radarColor: '#f0201e',
          count: 93
        }] }
      />
    );

    const victimsText = scryRenderedDOMComponentsWithClass(instance, 'cr-preview-pane-victims-text');
    victimsText.length.should.eql(0);
    const accused = scryRenderedDOMComponentsWithClass(instance, 'cr-preview-pane-victims');
    accused.length.should.eql(0);
  });

  it('should not display victims section if there are no victims', function () {
    instance = renderIntoDocument(
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
            { axis: 'Civilian Allegations', value: 98.5549 }
          ],
          radarColor: '#f0201e',
          count: 93
        }] }
      />
    );

    const victimsText = scryRenderedDOMComponentsWithClass(instance, 'cr-preview-pane-victims-text');
    victimsText.length.should.eql(0);
    const accused = scryRenderedDOMComponentsWithClass(instance, 'cr-preview-pane-victims');
    accused.length.should.eql(0);
  });
});
