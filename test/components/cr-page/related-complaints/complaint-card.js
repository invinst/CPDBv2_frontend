import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { random } from 'faker';

import { mountWithRouter } from 'utils/test';
import ComplaintCard from 'components/cr-page/related-complaints/complaint-card';
import * as tracking from 'utils/tracking';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';


describe('ComplaintCard component', function () {
  describe('Content', function () {
    it('should only render crid and categories when there is no extra data', function () {
      const wrapper = shallow(<ComplaintCard crid='10799008' categories='Use Of Force'/>);
      const sections = wrapper.find('.section');

      sections.should.have.length(1);
      sections.at(0).text().should.containEql('10799008');
      sections.at(0).text().should.containEql('Use Of Force');
    });

    it('should render enough content', function () {
      const wrapper = shallow(
        <ComplaintCard
          crid='10799008'
          categories='Use Of Force'
          incidentDate='Oct 7, 2008'
          complainants='R. Rose'
          accused='B. Bolton'
        />,
      );
      const sections = wrapper.find('.section');

      sections.should.have.length(3);
      sections.at(0).text().should.containEql('10799008').and.containEql('Oct 7, 2008');
      sections.at(0).text().should.containEql('Use Of Force');
      sections.at(1).text().should.containEql('Complainant');
      sections.at(1).text().should.containEql('R. Rose');
      sections.at(2).text().should.containEql('Accused');
      sections.at(2).text().should.containEql('B. Bolton');
    });

    it('should track click event', function () {
      const stubTrackRelatedByCategoryClick = sinon.stub(tracking, 'trackRelatedByCategoryClick');

      const wrapper = mountWithRouter(
        <ComplaintCard
          complainants='R. Rose'
          sourceCRID='01234'
          crid='56789'
          match='categories'
        />
      );

      wrapper.find('.content').simulate('click');
      stubTrackRelatedByCategoryClick.should.be.calledWith('01234', '56789');
    });

    it('should render ItemPinButton with correct props', function () {
      const addOrRemoveItemInPinboard = sinon.spy();
      const id = random.word();
      const isPinned = random.boolean();
      const incidentDate = '2008-01-11';
      const categories = 'Money / Property';

      const wrapper = shallow(
        <ComplaintCard
          crid={ id }
          isPinned={ isPinned }
          incidentDate={ incidentDate }
          categories={ categories }
          addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        />
      );

      const itemPinButton = wrapper.find(ItemPinButton);
      itemPinButton.prop('className').should.equal(pinButtonStyles.cardPinnedButton);
      itemPinButton.prop('addOrRemoveItemInPinboard').should.equal(addOrRemoveItemInPinboard);
      itemPinButton.prop('showHint').should.be.false();
      itemPinButton.prop('item').should.eql(
        {
          type: PINNED_ITEM_TYPES.CR,
          id,
          isPinned,
          incidentDate,
          category: categories,
        }
      );
    });
  });

  it('should track click event while matching with officers', function () {
    sinon.stub(tracking, 'trackRelatedByAccusedClick');

    const wrapper = mountWithRouter(
      <ComplaintCard
        complainants='R. Rose'
        sourceCRID='01234'
        crid='56789'
        match='officers'
      />
    );

    wrapper.find('.content').simulate('click');
    tracking.trackRelatedByAccusedClick.should.be.calledWith('01234', '56789');
  });

  it('should not track click event while matching with something else', function () {
    sinon.stub(tracking, 'trackRelatedByAccusedClick');

    const wrapper = mountWithRouter(
      <ComplaintCard
        complainants='R. Rose'
        sourceCRID='01234'
        crid='56789'
        match='investigators'
      />
    );

    wrapper.find('.content').simulate('click');
    tracking.trackRelatedByAccusedClick.should.not.be.called();
  });
});
