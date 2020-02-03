import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import CRLink from 'components/documents-overview-page/document-row/cr-link';


describe('DocumentsOverviewPage CRLink component', function () {
  it('should render correct crid and documentsCount as given props', function () {
    const wrapper = shallow(
      <CRLink crid={ '1000000' } documentsCount={ 2 }/>
    );

    wrapper.find('.document-crid').text().should.equal('CR 1000000');
    wrapper.find('.documents-count').text().should.equal('2 documents');
  });

  it('should call onCRLinkClick when clicked on', function () {
    const onCRLinkClick = sinon.spy();
    const wrapper = shallow(
      <CRLink crid={ '1000000' } onCRLinkClick={ onCRLinkClick }/>
    );

    wrapper.simulate('click', { stopPropagation: () => {} } );
    onCRLinkClick.should.be.calledWith('1000000');
  });
});
