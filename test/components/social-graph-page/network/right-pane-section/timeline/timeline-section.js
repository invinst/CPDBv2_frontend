import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Timeline from 'components/social-graph-page/network/right-pane-section/timeline';
import Items from 'components/social-graph-page/network/right-pane-section/timeline/item';


describe('Timeline component', function () {
  let instance;
  const items = [
    {
      kind: 'YEAR',
      year: 2005,
      hasData: true,
      key: '123456'
    },
    {
      kind: 'CR',
      crid: '123456',
      incidentDate: 'OCT 8',
      year: 2006,
      category: 'Use of Force',
      attachments: [],
      key: '123456'

    }
  ];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <Timeline
        items={ items }
        pathname='/social-graph/'
      />
    );
    const timelineItems = scryRenderedComponentsWithType(instance, Items);
    timelineItems.should.have.length(2);
  });
});
