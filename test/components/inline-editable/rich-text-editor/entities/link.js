import React, { PropTypes } from 'react';
import { stub } from 'sinon';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { Entity } from 'draft-js';

import { unmountComponentSuppressError } from 'utils/test';
import MoreLink from 'components/common/more-link';
import ContextWrapper from 'utils/test/components/context-wrapper';
import Link from 'components/inline-editable/rich-text-editor/entities/link';


class LinkContextWrapper extends ContextWrapper {}
LinkContextWrapper.childContextTypes = {
  editModeOn: PropTypes.bool
};

describe('Link component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render MoreLink element while not in edit mode', function () {
    const entityKey = 'entityKey';
    const url = 'url';
    const context = {
      editModeOn: false
    };
    const getStub = stub(Entity, 'get');
    getStub.withArgs(entityKey).returns({ getData: () => { return { url }; } });

    instance = renderIntoDocument(
      <LinkContextWrapper context={ context }>
        <Link entityKey={ entityKey } />
      </LinkContextWrapper>
    );
    const moreLinkElement = scryRenderedComponentsWithType(instance, MoreLink)[0];
    moreLinkElement.props.href.should.eql(url);
    getStub.restore();
  });

  it('should render span element while in edit mode', function () {
    const entityKey = 'entityKey';
    const url = 'url';
    const context = {
      editModeOn: true
    };
    const getStub = stub(Entity, 'get');
    getStub.withArgs(entityKey).returns({ getData: () => { return { url }; } });

    instance = renderIntoDocument(
      <LinkContextWrapper context={ context }>
        <Link entityKey={ entityKey } />
      </LinkContextWrapper>
    );
    scryRenderedDOMComponentsWithTag(instance, 'span').should.be.ok();
    getStub.restore();
  });
});
