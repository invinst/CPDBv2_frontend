import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import HeaderLinks from 'components/headers/slim-header/slim-header-content/header-links';
import styles from 'components/headers/slim-header/slim-header-content/header-links.sass';


describe('HeaderLinks component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(<HeaderLinks />);

    wrapper.prop('className').should.equal(`${styles.headerLinks} top`);

    const tags = wrapper.find('a');
    const links = wrapper.find(Link);

    tags.at(0).prop('className').should.equal('header-link');
    tags.at(0).prop('href').should.equal('http://cpdb.lvh.me');
    tags.at(0).text().should.equal('Data');

    tags.at(1).prop('className').should.equal('header-link');
    tags.at(1).prop('href').should.equal('http://how.cpdp.works/');
    tags.at(1).text().should.equal('Q&A');

    links.at(0).prop('className').should.equal('header-link');
    links.at(0).prop('to').should.equal('/documents/');
    links.at(0).prop('children').should.equal('Documents');
  });
});
