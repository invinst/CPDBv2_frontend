import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';

import SimpleListWidget from 'components/document-page/simple-list-widget';
import WrappedWithLink from 'components/common/wrapped-with-link';


describe('SimpleListWidget component', function () {
  it('should render nothing when items is empty', function () {
    const wrapper = shallow(
      <SimpleListWidget
        className='simple-list-widget'
        items={ [] }
      />
    );
    should(wrapper.type()).be.null();
  });

  it('should render correctly', function () {
    const wrapper = shallow(
      <SimpleListWidget
        className='simple-list-widget'
        items={ [
          { name: 'CRID / UID', value: 'CR 1083633', to: '/complaint/1083633/' },
          {
            name: 'Source',
            value: 'chicagocopa.org',
            tooltip: 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf',
            url: 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf',
          },
        ] }
      />
    );

    wrapper.prop('className').should.containEql('simple-list-widget');

    const items = wrapper.find(WrappedWithLink);

    items.should.have.length(2);

    items.at(0).prop('className').should.equal('list-item');
    items.at(0).prop('to').should.equal('/complaint/1083633/');
    items.at(0).find('.list-item-name').text().should.equal('CRID / UID');
    items.at(0).find('.list-item-value').text().should.equal('CR 1083633');
    items.at(0).find('.list-item-value').prop('data-tip').should.be.false();

    items.at(1).prop('className').should.equal('list-item');
    items.at(1).prop('url').should.equal(
      'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf'
    );
    items.at(1).find('.list-item-name').text().should.equal('Source');

    const sourceItemValue = items.at(1).find('.list-item-value');
    sourceItemValue.text().should.equal('chicagocopa.org');
    sourceItemValue.prop('data-tip').should.be.true();
    sourceItemValue.prop('data-for').should.containEql('tooltip-');
    sourceItemValue.prop('data-event').should.equal('mouseover');
    sourceItemValue.prop('data-event-off').should.equal('mouseleave');
  });
});
