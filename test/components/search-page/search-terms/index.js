import React from 'react';
import { spy, stub } from 'sinon';
import {
  renderIntoDocument, findRenderedComponentWithType
} from 'react-addons-test-utils';

import { reRender, unmountComponentSuppressError } from 'utils/test';
import SearchTerms from 'components/search-page/search-terms';
import {
  contentWrapperStyle, maximumStyle, mediumStyle,
  minimumStyle
} from 'components/search-page/search-terms/search-terms.style';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import * as domUtils from 'utils/dom';
import Mousetrap from 'mousetrap';


describe('SearchTerms component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    SearchTerms.should.be.renderable();
  });

  it('should fire request when mounted', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <SearchTerms requestSearchTermCategories={ callback }/>
    );
    callback.called.should.be.true();
  });

  it('should render ResponsiveFluidWidthComponent with correct props', function () {
    instance = renderIntoDocument(
      <SearchTerms />
    );
    const responsiveComponent = findRenderedComponentWithType(instance, ResponsiveFluidWidthComponent);
    responsiveComponent.props.style.should.eql(contentWrapperStyle);
    responsiveComponent.props.minimumStyle.should.eql(minimumStyle);
    responsiveComponent.props.mediumStyle.should.eql(mediumStyle);
    responsiveComponent.props.maximumStyle.should.eql(maximumStyle);
    responsiveComponent.props.minWidthThreshold.should.eql(1020);
    responsiveComponent.props.maxWidthThreshold.should.eql(1760);
  });

  it('should trigger move when up key pressed', function () {
    const move = spy();
    const totalItemCount = 3;
    const direction = 'up';
    instance = renderIntoDocument(
      <SearchTerms move={ move } totalItemCount={ totalItemCount }/>
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, totalItemCount).should.be.true();
  });

  it('should trigger move when down key pressed', function () {
    const move = spy();
    const totalItemCount = 3;
    const direction = 'down';
    instance = renderIntoDocument(
      <SearchTerms move={ move } totalItemCount={ totalItemCount }/>
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, totalItemCount).should.be.true();
  });

  describe('after keyboard navigation', function () {
    beforeEach(function () {
      this.scrollToElementStub = stub(domUtils, 'scrollToElement');
    });

    afterEach(function () {
      this.scrollToElementStub.restore();
    });

    it('should scroll to focused item', function () {
      instance = renderIntoDocument(<SearchTerms focusedItem={ { uniqueKey: null } }/>);
      instance = reRender(<SearchTerms focusedItem={ { uniqueKey: 'OFFICER-RACE' } }/>, instance);

      this.scrollToElementStub.calledWith(
        '.term-item.focused', { behavior: 'instant', block: 'center' }
      ).should.be.true();
    });
  });
});
