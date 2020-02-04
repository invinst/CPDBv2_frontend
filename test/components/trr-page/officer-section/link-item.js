import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import LinkItem from 'components/trr-page/officer-section/link-item';
import NavigationButton from 'components/trr-page/officer-section/navigation-button';


describe('LinkItem component', function () {
  it('should render title and value only if navigationText are not passed in', function () {
    const wrapper = shallow(<LinkItem to='/path/to/' title='Some title' value='Some value'/>);
    wrapper.find(Link).prop('to').should.equal('/path/to/');

    wrapper.find('.link-item-title').text().should.containEql('Some title');
    wrapper.find('.link-item-value').text().should.containEql('Some value');
    wrapper.find(NavigationButton).exists().should.be.false();
  });

  it('should have navigation-button-container class name to highlight NavigationButton when hovering', function () {
    const wrapper = shallow(<LinkItem to='/path/to/' title='Some title' value='Some value'/>);
    wrapper.prop('className').should.containEql('navigation-button-container');
  });

  it('should render NavigationButton if navigationText are available', function () {
    const wrapper = shallow(
      <LinkItem
        title='Some title'
        value='Some value'
        navigationText='Some navigation text'
        hideBorder={ true }
      />
    );
    wrapper.find(NavigationButton).prop('text').should.equal('Some navigation text');
  });
});
