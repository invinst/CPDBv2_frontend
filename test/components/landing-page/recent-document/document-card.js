import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { createMemoryHistory, Link, Route, Router } from 'react-router';
import { stub } from 'sinon';
import { lorem, random } from 'faker';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import DocumentCard from 'components/landing-page/recent-document/document-card';
import styles from 'components/landing-page/recent-document/document-card.sass';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import * as GATracking from 'utils/google_analytics_tracking';


describe('DocumentCard components', function () {
  let instance;

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
    unmountComponentSuppressError(instance);
  });

  it('should render appropriately', function () {
    instance = renderIntoDocument(<DocumentCard { ...props } />);
    const link = findRenderedComponentWithType(instance, Link);
    link.props.className.should.eql(styles.documentCard);
    link.props.to.should.eql(`/complaint/${ props.crid }/`);

    const itemPinButton = findRenderedComponentWithType(instance, ItemPinButton);
    itemPinButton.props.className.should.eql(pinButtonStyles.cardPinnedButton);
    itemPinButton.props.addOrRemoveItemInPinboard.should.eql(props.addOrRemoveItemInPinboard);
    itemPinButton.props.showHint.should.be.false();
    itemPinButton.props.item.should.eql({
      type: PINNED_ITEM_TYPES.CR,
      id: props.crid,
      isPinned: props.isPinned,
    });

    const thumbnail = findRenderedDOMComponentWithTag(instance, 'img');
    thumbnail.getAttribute('src').should.eql(props.previewImageUrl);

    const incidentDate = findRenderedDOMComponentWithClass(instance, 'document-card-description-incident-date');
    incidentDate.textContent.should.eql(props.incidentDate);

    const category = findRenderedDOMComponentWithClass(instance, 'document-card-description-category');
    category.textContent.should.eql(props.category);
  });

  it('should track attachment click and invoke onTrackingAttachment', function () {
    stub(GATracking, 'trackAttachmentClick');
    const documentCard = () => <DocumentCard { ...props } />;
    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ documentCard } />
      </Router>
    );
    Simulate.click(findDOMNode(instance));

    GATracking.trackAttachmentClick.should.be.calledOnce();
    GATracking.trackAttachmentClick.should.be.calledWith(props.pathname, `/complaint/${props.crid}/`);
    props.onTrackingAttachment.should.be.calledOnce();
    props.onTrackingAttachment.should.be.calledWith({
      attachmentId: props.id,
      sourcePage: 'Landing Page',
      app: 'Frontend',
    });

    GATracking.trackAttachmentClick.restore();
  });
});
