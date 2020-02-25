import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import RightLinks from 'components/headers/slim-header/slim-header-content/right-links';
import styles from 'components/headers/slim-header/slim-header-content/right-links.sass';


describe('RightLinks component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(<RightLinks position='top'/>);

    wrapper.prop('className').should.equal(styles.rightLinks);

    const tags = wrapper.find('a');
    const links = wrapper.find(Link);

    tags.at(0).prop('className').should.equal('right-link top');
    tags.at(0).prop('href').should.equal('http://cpdb.lvh.me');
    tags.at(0).text().should.equal('Data');

    tags.at(1).prop('className').should.equal('right-link top');
    tags.at(1).prop('href').should.equal('http://how.cpdp.works/');
    tags.at(1).text().should.equal('Q&A');

    links.at(0).prop('className').should.equal('right-link top');
    links.at(0).prop('to').should.equal('/documents/');
    links.at(0).prop('children').should.equal('Documents');

    links.at(1).prop('className').should.equal('right-link top pinboard-feature');
    links.at(1).prop('to').should.equal('/pinboard/');
    links.at(1).prop('children').should.equal('Pinboards');
  });
});
