import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import TRRPane from 'components/common/preview-pane/trr-pane';
import { NewWidgetWrapper, ListWidget } from 'components/common/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('TRRPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    const officer = {
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
    };

    instance = renderIntoDocument(
      <TRRPane
        to='/trr/123/'
        category='Firearm'
        incidentDate='JUL 2, 2012'
        address='14XX W 63RD ST, CHICAGO IL 60636'
        officer={ officer }
      />
    );

    const wrapper = findRenderedComponentWithType(instance, NewWidgetWrapper);
    wrapper.props.callToAction.should.eql({
      to: '/trr/123/',
      text: 'View Tactical Response Report',
    });

    const title = findRenderedDOMComponentWithClass(instance, 'trr-preview-pane-title-title');
    title.textContent.should.eql('Firearm');

    const infoRows = scryRenderedDOMComponentsWithClass(instance, 'trr-preview-pane-info-row');
    infoRows[0].textContent.should.eql('JUL 2, 2012');
    infoRows[1].textContent.should.eql('14XX W 63RD ST, CHICAGO IL 60636');

    const accused = findRenderedComponentWithType(instance, ListWidget);
    accused.props.typeName.should.eql('allegation');
    accused.props.title.should.eql('OFFICER');
    accused.props.items.should.eql([officer]);
    accused.props.showItemArrow.should.be.false();
    accused.props.wrapperClassName.should.eql('trr-preview-pane-accused');
  });
});
