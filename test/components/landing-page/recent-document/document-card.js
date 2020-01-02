import React from 'react';
import { mount } from 'enzyme';
import { createMemoryHistory, Link, Route, Router } from 'react-router';
import { stub } from 'sinon';
import { lorem, random } from 'faker';

import DocumentCard from 'components/landing-page/recent-document/document-card';
import styles from 'components/landing-page/recent-document/document-card.sass';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import * as tracking from 'utils/tracking';


describe('DocumentCard components', function () {
  const props = {
    previewImageUrl: 'http://preview.com/url3',
    'url': 'http://cr-document.com/3',
    crid: lorem.word(),
    pathname: lorem.word(),
    incidentDate: lorem.word(),
    category: lorem.word(),
    onTrackingAttachment: stub(),
    id: lorem.word(),
    addOrRemoveItemInPinboard: stub(),
    isPinned: random.boolean(),
  };

  afterEach(function () {
    props.onTrackingAttachment.resetHistory();
    props.addOrRemoveItemInPinboard.resetHistory();
  });

  it('should render appropriately', function () {
    const wrapper = mount(<DocumentCard { ...props } />);
    const link = wrapper.find(Link);
    link.prop('className').should.eql(styles.documentCard);
    link.prop('to').should.equal(`/complaint/${ props.crid }/`);

    const itemPinButton = wrapper.find(ItemPinButton);
    itemPinButton.prop('className').should.eql(pinButtonStyles.cardPinnedButton);
    itemPinButton.prop('addOrRemoveItemInPinboard').should.eql(props.addOrRemoveItemInPinboard);
    itemPinButton.prop('showHint').should.be.false();
    itemPinButton.prop('item').should.eql({
      type: PINNED_ITEM_TYPES.CR,
      id: props.crid,
      isPinned: props.isPinned,
    });

    const thumbnail = wrapper.find('img');
    thumbnail.prop('src').should.eql(props.previewImageUrl);

    const incidentDate = wrapper.find('.document-card-description-incident-date');
    incidentDate.text().should.equal(props.incidentDate);

    const category = wrapper.find('.document-card-description-category');
    category.text().should.equal(props.category);
  });

  it('should track attachment click and invoke onTrackingAttachment', function () {
    stub(tracking, 'trackAttachmentClick');
    const documentCard = () => <DocumentCard { ...props } />;
    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ documentCard } />
      </Router>
    );
    wrapper.simulate('click');

    tracking.trackAttachmentClick.should.be.calledOnce();
    tracking.trackAttachmentClick.should.be.calledWith(props.pathname, `/complaint/${props.crid}/`);
    props.onTrackingAttachment.should.be.calledOnce();
    props.onTrackingAttachment.should.be.calledWith({
      attachmentId: props.id,
      sourcePage: 'Landing Page',
      app: 'Frontend',
    });

    tracking.trackAttachmentClick.restore();
  });
});
