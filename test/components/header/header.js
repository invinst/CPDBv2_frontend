import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import HeaderContent from 'components/header/header-content';
import CompactHeader from 'components/header/compact-header';
import Header from 'components/header';

describe('Header component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render HeaderContent but not CompactHeader if at landing page', function () {
    instance = renderIntoDocument(<Header pathname='/' appContent='/'/>);
    const headerContent = scryRenderedComponentsWithType(instance, HeaderContent)[0];
    headerContent.props.compact.should.be.false();
    headerContent.props.pathname.should.eql('/');
    const compactHeader = findRenderedComponentWithType(instance, CompactHeader);
    compactHeader.props.show.should.be.false();
  });

  it('should render CompactHeader but not render HeaderContent if not at landing page', function () {
    instance = renderIntoDocument(<Header pathname='/faq' appContent='/faq'/>);
    const compactHeader = findRenderedComponentWithType(instance, CompactHeader);
    compactHeader.props.show.should.be.true();
    compactHeader.props.pathname.should.eql('/faq');
    scryRenderedComponentsWithType(instance, HeaderContent).length.should.eql(1);
  });
});
