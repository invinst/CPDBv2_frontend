import React from 'react';
import { shallow } from 'enzyme';

import Editable from 'components/inline-editable/editable';


describe('Editable component', function () {
  it('should render presenter element while not in edit mode', function () {
    const wrapper = shallow(
      <Editable
        editModeOn={ false }
        presenterElement={ <div/> }
        editorElement={ <span/> }/>
    );
    wrapper.find('div').exists().should.be.true();
    wrapper.find('span').exists().should.be.false();
  });

  it('should render editor element while in edit mode', function () {
    const wrapper = shallow(
      <Editable
        editModeOn={ true }
        presenterElement={ <div/> }
        editorElement={ <span/> }/>
    );
    wrapper.find('span').exists().should.be.true();
    wrapper.find('div').exists().should.be.false();
  });
});
