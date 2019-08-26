import React from 'react';
import MediaQuery from 'react-responsive';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';
import { TABLET } from 'utils/constants';

import { unmountComponentSuppressError } from 'utils/test';
import ResponsiveComponent from 'components/responsive/responsive-component';

describe('ResponsiveComponent component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render all 4 screen sizes', function () {
    instance = renderIntoDocument(
      <ResponsiveComponent
        mobileChildren={ <div className='mobile'/> }
        tabletChildren={ <div className='tablet'/> }
        desktopChildren={ <div className='desktop'/> }
        extraWideChildren={ <div className='extraWide'/> }/>
    );
    const mediaQueries = scryRenderedComponentsWithType(instance, MediaQuery);
    mediaQueries[0].props.maxWidth.should.eql(767);
    mediaQueries[0].props.children.props.className.should.eql('mobile');
    mediaQueries[1].props.maxWidth.should.eql(991);
    mediaQueries[1].props.minWidth.should.eql(768);
    mediaQueries[1].props.children.props.className.should.eql('tablet');
    mediaQueries[2].props.minWidth.should.eql(992);
    mediaQueries[2].props.maxWidth.should.eql(1199);
    mediaQueries[2].props.children.props.className.should.eql('desktop');
    mediaQueries[3].props.minWidth.should.eql(1200);
    mediaQueries[3].props.children.props.className.should.eql('extraWide');
  });

  it('should render according to certain screen size', function () {
    instance = renderIntoDocument(
      <ResponsiveComponent
        tabletChildren={ <div>mobile</div> }
        device={ TABLET }/>
    );
    findRenderedDOMComponentWithTag(instance, 'div').innerText.should.eql('mobile');
  });
});
