import React from 'react';
import { shallow } from 'enzyme';

import TRRPane from 'components/common/preview-pane/panes/trr-pane';
import { NewWidgetWrapper, ListWidget } from 'components/common/preview-pane/widgets';


describe('TRRPane component', () => {
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

    const wrapper = shallow(
      <TRRPane
        to='/trr/123/'
        category='Firearm'
        incidentDate='JUL 2, 2012'
        address='14XX W 63RD ST, CHICAGO IL 60636'
        officer={ officer }
      />
    );

    const widgetWrapper = wrapper.find(NewWidgetWrapper);
    widgetWrapper.prop('callToAction').should.eql({
      to: '/trr/123/',
      text: 'View Tactical Response Report',
    });

    const title = wrapper.find('.trr-preview-pane-title-title');
    title.text().should.equal('Firearm');

    const infoRows = wrapper.find('.trr-preview-pane-info-row');
    infoRows.at(0).text().should.equal('JUL 2, 2012');
    infoRows.at(1).text().should.equal('14XX W 63RD ST, CHICAGO IL 60636');

    const accused = wrapper.find(ListWidget);
    accused.prop('typeName').should.equal('allegation');
    accused.prop('title').should.equal('OFFICER');
    accused.prop('items').should.eql([officer]);
    accused.prop('showItemArrow').should.be.false();
    accused.prop('wrapperClassName').should.equal('trr-preview-pane-accused');
  });
});
