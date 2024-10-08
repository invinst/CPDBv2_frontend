import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import HeaderLinks from 'components/headers/slim-header/slim-header-content/header-links';
// import PinboardButtonContainer from 'containers/headers/slim-header/pinboard-button-container';
import styles from 'components/headers/slim-header/slim-header-content/header-links.sass';


describe('HeaderLinks component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(<HeaderLinks />);

    wrapper.prop('className').should.equal(`${styles.headerLinks} top`);

    const tags = wrapper.find('a');
    const links = wrapper.find(Link);

    tags.at(0).prop('className').should.equal('header-link');
    tags.at(0).prop('href').should.equal('https://national.cpdp.co/');
    tags.at(0).text().should.equal('National Police Index');

    tags.at(1).prop('className').should.equal('header-link');
    tags.at(1).prop('href').should.equal('http://cpdb.lvh.me');
    tags.at(1).text().should.equal('Data Tool (1988-2018)');

    tags.at(2).prop('className').should.equal('header-link');
    tags.at(2).prop('href').should.equal('http://how.cpdp.works/');
    tags.at(2).text().should.equal('Q&A');

    links.at(0).prop('className').should.equal('header-link');
    links.at(0).prop('to').should.equal('/documents/');
    links.at(0).prop('children').should.equal('Documents');

    // wrapper.find(PinboardButtonContainer).exists().should.be.true();
  });
});
