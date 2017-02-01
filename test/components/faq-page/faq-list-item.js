import React from 'react';
import {
  renderIntoDocument, Simulate,
  findRenderedComponentWithType, findRenderedDOMComponentWithClass, scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { withAnimationDisabled } from 'utils/test';
import FAQListItem from 'components/faq-page/faq-list-item';
import { unmountComponentSuppressError } from 'utils/test';
import FAQItemContent from 'components/faq-page/faq-item-content';
import FAQItem from 'components/common/faq/faq-item';


describe('FAQListItem component', function () {
  let instance;
  const handleClick = spy();
  const fieldProps = {
    question: {}
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    FAQListItem.should.be.renderable({ fieldProps, handleClick });
  });

  it('should expand content when receive newProps', function () {
    const TestParent = React.createFactory(React.createClass({
      getInitialState() {
        return { expandedId: null };
      },
      render() {
        return (
          <FAQListItem faqId={ 1 } ref='faqItem' expandedId={ this.state.expandedId }
            fieldProps={ fieldProps } handleClick={ handleClick }/>
        );
      }
    }));
    instance = renderIntoDocument(TestParent());
    scryRenderedComponentsWithType(instance, FAQItemContent).length.should.equal(0);

    withAnimationDisabled(function () {
      instance.setState({ expandedId: 1 });

      findRenderedComponentWithType(instance, FAQItemContent).should.be.ok();
    });
  });

  it('should trigger handleClick', function () {
    instance = renderIntoDocument(<FAQListItem fieldProps={ fieldProps } handleClick={ handleClick }/>);
    const titleElement = findRenderedDOMComponentWithClass(instance, 'faq-title');

    Simulate.click(titleElement);
    handleClick.calledOnce.should.be.true();
  });

  it('should render FAQItem if not being dragged', function () {
    instance = renderIntoDocument(
      <FAQListItem fieldProps={ fieldProps } handleClick={ handleClick } isDragging={ false }/>
    );

    findRenderedComponentWithType(instance, FAQItem);
  });

  it('should not render FAQItem if being dragged', function () {
    instance = renderIntoDocument(
      <FAQListItem fieldProps={ fieldProps } handleClick={ handleClick } isDragging={ true }/>
    );

    scryRenderedComponentsWithType(instance, FAQItem).should.have.length(0);
  });
});
