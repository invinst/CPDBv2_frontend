import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import MoreLink from 'components/common/more-link';
import Link from 'components/inline-editable/rich-text-editor/entities/link';
import { EditModeContext } from 'contexts';


describe('Link component', function () {
  it('should render MoreLink element while not in edit mode', function () {
    const entityKey = 'entityKey';
    const url = 'url';
    const context = {
      editModeOn: false,
    };

    const getEntityStub = sinon.stub().withArgs(entityKey).returns({ getData: () => { return { url }; } });
    const contentState = { getEntity: getEntityStub };

    const wrapper = mount(
      <EditModeContext.Provider value={ context }>
        <Link entityKey={ entityKey } contentState={ contentState }/>
      </EditModeContext.Provider>
    );
    const moreLinkElement = wrapper.find(MoreLink).at(0);
    moreLinkElement.prop('href').should.eql(url);
  });

  it('should render span element while in edit mode', function () {
    const entityKey = 'entityKey';
    const url = 'url';
    const context = {
      editModeOn: true,
    };

    const getEntityStub = sinon.stub().withArgs(entityKey).returns({ getData: () => { return { url }; } });
    const contentState = { getEntity: getEntityStub };

    const wrapper = mount(
      <Link entityKey={ entityKey } contentState={ contentState }/>,
      { context: context },
    );

    wrapper.find('span').exists().should.be.true();
  });
});
