import React from 'react';
import { Link } from 'react-router';
import { renderIntoDocument,
  findRenderedDOMComponentWithTag, findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import EditModeItem from 'components/search-page/search-results/suggestion-group/suggestion-item/edit-mode-item';


describe('EditModeItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  context('aliasEditModeOn', function () {
    it('should be wrapped in <div>', function () {
      instance = renderIntoDocument(
        <EditModeItem aliasEditModeOn={ true }>
          <span />
        </EditModeItem>
      );

      findRenderedDOMComponentWithTag(instance, 'div').should.be.ok();
    });
  });

  context('aliasEditModeOff', function () {
    it('should render Link if redirectLink exist', function () {
      instance = renderIntoDocument(
        <EditModeItem aliasEditModeOn={ false } redirectLink='/officer/123' >
          <span />
        </EditModeItem>
      );

      const suggestionLink = findRenderedComponentWithType(instance, Link);
      suggestionLink.props.to.should.equal('/officer/123');
    });

    it('should be wrapped in <a> if redirectLink does not exist', function () {
      instance = renderIntoDocument(
        <EditModeItem aliasEditModeOn={ false } redirectUrl='https://example.com/' >
          <span />
        </EditModeItem>
      );

      const suggestionLink = findRenderedDOMComponentWithTag(instance, 'a');
      suggestionLink.href.should.equal('https://example.com/');
    });
  });
});
