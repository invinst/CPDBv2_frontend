import React from 'react';
import { shallow } from 'enzyme';

import withLoadingSpinner from 'components/common/with-loading-spinner';
import LoadingSpinner from 'components/common/loading-spinner';
import Children from 'utils/test/components/children';


describe('withLoadingSpinner component', function () {
  const WithSpinnerComponent = withLoadingSpinner(Children, 'test--loading-spinner');

  it('should render loading spinner if requesting is true', function () {
    const wrapper = shallow(
      <WithSpinnerComponent className='test--with-loading-spinner-content' requesting={ true }/>
    );

    const spinner = wrapper.find(LoadingSpinner);
    spinner.prop('className').should.equal('test--loading-spinner');

    wrapper.find(Children).exists().should.be.false();
  });

  it('should render Children if requesting is false', function () {
    const wrapper = shallow(
      <WithSpinnerComponent className='test--with-loading-spinner-content' requesting={ false }/>
    );

    const content = wrapper.find(Children);
    content.prop('className').should.equal('test--with-loading-spinner-content');

    wrapper.find(LoadingSpinner).exists().should.be.false();
  });
});
