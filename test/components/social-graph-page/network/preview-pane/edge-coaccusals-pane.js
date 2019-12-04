import React from 'react';
import { shallow } from 'enzyme';

import EdgeCoaccusalsPane from 'components/social-graph-page/network/preview-pane/edge-coaccusals-pane';
import Item from 'components/social-graph-page/network/right-pane-section/timeline/item';


describe('EdgeCoaccusalsPane component', function () {
  it('should render correctly', function () {
    const items = [
      {
        kind: 'YEAR',
        year: 2005,
        hasData: true,
        key: '12345',
      },
      {
        kind: 'CR',
        crid: '123456',
        incidentDate: 'OCT 8',
        year: 2006,
        category: 'Use of Force',
        attachments: [],
        key: '123456',
        timelineIdx: 0,
      },
    ];
    const info = {
      sourceOfficerName: 'Jerome Finnigan',
      targetOfficerName: 'Edward May',
      coaccusedCount: 10,
    };
    const wrapper = shallow(
      <EdgeCoaccusalsPane
        items={ items }
        info={ info }
        pathname='/social-graph/'
      />
    );
    const edgeItems = wrapper.find(Item);
    const edgeHeader = wrapper.find('.edge-coaccusals-pane-header');
    edgeItems.should.have.length(2);
    edgeHeader.text().should.equal('Jerome Finnigan & Edward May\'s 10 coaccusals');
  });
});
