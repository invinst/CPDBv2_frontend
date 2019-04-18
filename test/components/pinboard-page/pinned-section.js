import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PinnedSection from 'components/pinboard-page/pinned-section';
import PinnedType from 'components/pinboard-page/pinned-type';


describe('PinnedSection component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render PinnedType of OFFICER, CR, TRR', function () {
    const itemsByTypes = {
      'OFFICER': ['1'],
      'CR': ['abc'],
      'TRR': ['1'],
      'NOT_A_TYPE': ['1'],
    };
    instance = renderIntoDocument(<PinnedSection itemsByTypes={ itemsByTypes } />);

    const pinnedTypes = scryRenderedComponentsWithType(instance, PinnedType);
    pinnedTypes.should.have.length(3);
    pinnedTypes[0].props.type.should.eql('OFFICER');
    pinnedTypes[1].props.type.should.eql('CR');
    pinnedTypes[2].props.type.should.eql('TRR');
  });

  it('should not render PinnedType of OFFICER, CR, TRR if not exist', function () {
    instance = renderIntoDocument(<PinnedSection itemsByTypes={ {} } />);

    const pinnedTypes = scryRenderedComponentsWithType(instance, PinnedType);
    pinnedTypes.should.have.length(0);
  });

  it('should not render PinnedType of OFFICER if its length is 0', function () {
    const itemsByTypes = {
      'OFFICER': [],
      'CR': [],
      'TRR': [],
    };
    instance = renderIntoDocument(<PinnedSection itemsByTypes={ itemsByTypes } />);

    const pinnedTypes = scryRenderedComponentsWithType(instance, PinnedType);
    pinnedTypes.should.have.length(0);
  });
});
