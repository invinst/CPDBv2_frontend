import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithTag, scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Editable from 'components/inline-editable/editable';

describe('Editable component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render presenter element while not in edit mode', function () {
    instance = renderIntoDocument(
      <Editable
        editModeOn={ false }
        presenterElement={ <div/> }
        editorElement={ <span/> }/>
    );
    findRenderedDOMComponentWithTag(instance, 'div');
    scryRenderedDOMComponentsWithTag(instance, 'span').length.should.eql(0);
  });

  it('should render editor element while in edit mode', function () {
    instance = renderIntoDocument(
      <Editable
        editModeOn={ true }
        presenterElement={ <div/> }
        editorElement={ <span/> }/>
    );
    findRenderedDOMComponentWithTag(instance, 'span');
    scryRenderedDOMComponentsWithTag(instance, 'div').length.should.eql(0);
  });
});
