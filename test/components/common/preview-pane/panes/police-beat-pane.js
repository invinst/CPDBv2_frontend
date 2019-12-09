import React from 'react';
import { shallow, mount } from 'enzyme';

import PoliceBeatPane from 'components/common/preview-pane/panes/police-beat-pane';
import WidgetWrapper, {
  HeaderWidget,
  TextWidget,
  ListWidget,
  SeparatorWidget,
} from 'components/common/preview-pane/widgets';


describe('PoliceBeatPane component', () => {
  it('should contain the sub components', () => {
    const wrapper = shallow(
      <PoliceBeatPane
        allegationCount={ 4 }
        mostCommonComplaint={ [] }
        url='https://staging.cpdb.co/data/L2B5ML/citizens-police-data-project'
        name='22'
      />
    );

    const widgetWrapper = wrapper.find(WidgetWrapper);
    widgetWrapper.prop('callToAction').should.eql({
      url: 'https://staging.cpdb.co/data/L2B5ML/citizens-police-data-project',
    });
    widgetWrapper.prop('maxHeight').should.equal(520);

    const header = wrapper.find(HeaderWidget);
    header.render().text().should.containEql('POLICE BEAT #22');
    wrapper.find(SeparatorWidget).exists().should.be.true();
    wrapper.find(TextWidget).exists().should.be.true();
    wrapper.find(ListWidget).exists().should.be.true();
  });

  it('should display Police-District HQ if available', () => {
    const wrapper = mount(
      <PoliceBeatPane
        allegationCount={ 4 }
        mostCommonComplaint={ [] }
        url='https://staging.cpdb.co/data/L2B5ML/citizens-police-data-project'
        name='22'
        policeHQ='21st'
      />
    );
    wrapper.text().should.containEql('21st District Police Station');
  });
});
