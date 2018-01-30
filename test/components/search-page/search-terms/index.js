import React from 'react';
import { spy } from 'sinon';
import should from 'should';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedComponentWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SearchTerms from 'components/search-page/search-terms';
import { SearchTermCategory } from 'utils/test/factories/search-terms';
import CategoryColumn from 'components/search-page/search-terms/category-column';
import {
  contentWrapperStyle, maximumStyle, mediumStyle,
  minimumStyle
} from 'components/search-page/search-terms/search-terms.style';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


describe('SearchTerms component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    SearchTerms.should.be.renderable();
  });

  it('should set expandedId when trigger toggleExpanded', function () {
    instance = renderIntoDocument(
      <SearchTerms categories={ SearchTermCategory.buildList(1) }/>
    );
    const columns = scryRenderedComponentsWithType(instance, CategoryColumn);
    columns[0].props.toggleExpanded('abc');
    instance.state.expandedId.should.eql('abc');
  });

  it('should set expandedId to null when triggered with a similar id', function () {
    instance = renderIntoDocument(
      <SearchTerms categories={ SearchTermCategory.buildList(1) }/>
    );
    instance.setState({ expandedId: 'abc' });
    const columns = scryRenderedComponentsWithType(instance, CategoryColumn);
    columns[0].props.toggleExpanded('abc');
    should(instance.state.expandedId).be.null();
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
    responsiveComponent.props.minWidthThreshold.should.eql(700);
    responsiveComponent.props.maxWidthThreshold.should.eql(1440);
  });
});
