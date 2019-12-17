import React from 'react';
import { shallow } from 'enzyme';

import SingleSpin from 'components/common/loading-spinner/single-spin';
import styles from 'components/common/loading-spinner/common.sass';


describe('SingleSpin component', function () {
  it('should render enough content', function () {
    const wrapper = shallow(
      <SingleSpin
        transform='rotate(150 50 50)'
        begin='0.25s'
        fill='#ACB123'
      />
    );

    const element = wrapper.find('g');
    element.hasClass(styles.animation).should.be.true();
    element.prop('transform').should.containEql('rotate(150 50 50)');

    const rect = wrapper.find('rect');
    rect.hasClass(styles.animation).should.be.true();
    rect.prop('fill').should.equal('#ACB123');

    const animate = wrapper.find('animate');
    animate.hasClass(styles.animation).should.be.true();
    animate.prop('begin').should.equal('0.25s');
  });
});
