import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import BottomSheetHeader from 'components/bottom-sheet/bottom-sheet-header';

describe('BottomSheetHeader component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render EditToggle with editToggleProps', function () {
    const props = {
      a: 'b'
    };
    instance = renderIntoDocument(<BottomSheetHeader editToggleProps={ props }/>);
    const element = findRenderedComponentWithType(instance, EditToggle);
    element.props.a.should.eql('b');
  });
});
