import React from 'react';
import { spy } from 'sinon';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import { communityFactory } from 'utils/test/factories/heat-map';
import CommunityDetail from 'components/embeddable-heat-map/summary-panel/community-dropdown/community-detail';


describe('CommunityDetail component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CommunityDetail.should.be.renderable();
  });

  it('should only update if next community is non empty', function () {
    instance = renderIntoDocument(
      <CommunityDetail community={ communityFactory.build({ name: 'Hyde Park' }) }/>
    );
    findDOMNode(instance).innerHTML.should.containEql('Hyde Park');

    instance = reRender(<CommunityDetail/>, instance);
    findDOMNode(instance).innerHTML.should.containEql('Hyde Park');
  });

  it('should render previous community if received community is empty', function () {
    instance = renderIntoDocument(
      <CommunityDetail community={ communityFactory.build({ name: 'Hyde Park' }) }/>
    );
    findDOMNode(instance).innerHTML.should.containEql('Hyde Park');

    instance = reRender(<CommunityDetail community={ {} }/>, instance);
    instance = reRender(<CommunityDetail/>, instance);
    findDOMNode(instance).innerHTML.should.containEql('Hyde Park');
  });

  it('should trigger closeDetail when click on close button', function () {
    const closeDetail = spy();
    instance = renderIntoDocument(<CommunityDetail closeDetail={ closeDetail }/>);
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--community-close-btn'));
    closeDetail.called.should.be.true();
  });
});
