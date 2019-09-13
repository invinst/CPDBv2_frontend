import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import withLoadingSpinner from 'components/common/with-loading-spinner';
import LoadingSpinner from 'components/common/loading-spinner';
import Children from 'utils/test/components/children';


describe('withLoadingSpinner component', function () {
  let instance;
  const WithSpinnerComponent = withLoadingSpinner(Children, 'test--loading-spinner');

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render loading spinner if requesting is true', function () {
    instance = renderIntoDocument(
      <WithSpinnerComponent className='test--with-loading-spinner-content' requesting={ true }/>
    );

    const spinner = findRenderedComponentWithType(instance, LoadingSpinner);
    spinner.props.className.should.equal('test--loading-spinner');

    scryRenderedComponentsWithType(instance, Children).should.have.length(0);
  });

  it('should render Children if requesting is false', function () {
    instance = renderIntoDocument(
      <WithSpinnerComponent className='test--with-loading-spinner-content' requesting={ false }/>
    );

    const content = findRenderedComponentWithType(instance, Children);
    content.props.className.should.equal('test--with-loading-spinner-content');

    scryRenderedComponentsWithType(instance, LoadingSpinner).should.have.length(0);
  });
});
