import React from 'react';
import { shallow } from 'enzyme';
import { date, lorem, random } from 'faker';
import moment from 'moment';

import PinboardRow from 'components/pinboard-admin-page/pinboard-row';


describe('PinboardRow', function () {
  it('should render info cells', function () {
    const id = random.word();
    const title = lorem.sentence(5);
    const pinnedCount = lorem.sentence(5);
    const childCount = random.number();
    const createdAt = moment(date.past()).format('MMM YY');

    const wrapper = shallow(
      <PinboardRow
        id={ id }
        title={ title }
        pinnedCount={ pinnedCount }
        childCount={ childCount }
        createdAt={ createdAt }
        isHeader={ false }
      />
    );
    wrapper.prop('className').should.containEql('row').and.not.containEql('header');

    const idCell = wrapper.find('.pinboard-id');
    idCell.prop('className').should.containEql('cell');
    idCell.text().should.equal(id);

    const titleCell = wrapper.find('.pinboard-title');
    titleCell.prop('className').should.containEql('cell');
    titleCell.text().should.equal(title);

    const pinnedCountCell = wrapper.find('.pinboard-pinned');
    pinnedCountCell.prop('className').should.containEql('cell');
    pinnedCountCell.text().should.equal(pinnedCount);

    const childCountCell = wrapper.find('.pinboard-children');
    childCountCell.prop('className').should.containEql('cell');
    childCountCell.text().should.equal(String(childCount));

    const dateCell = wrapper.find('.pinboard-date');
    dateCell.prop('className').should.containEql('cell');
    dateCell.text().should.equal(createdAt);
  });

  it('should add header class if isHeader is true', function () {
    const id = random.word();
    const title = lorem.sentence(5);
    const pinnedCount = lorem.sentence(5);
    const createdAt = moment(date.past()).format('MMM YY');

    const wrapper = shallow(
      <PinboardRow
        id={ id }
        title={ title }
        pinnedCount={ pinnedCount }
        createdAt={ createdAt }
        isHeader={ true }
      />
    );

    wrapper.prop('className').should.containEql('row').and.containEql('header');
  });
});
