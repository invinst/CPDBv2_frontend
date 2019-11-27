import React from 'react';
import { shallow } from 'enzyme';


import SearchTermItemPane from 'components/common/preview-pane/panes/search-term-item-pane';
import CallToAction from 'components/common/preview-pane/panes/search-term-item-pane/call-to-action';
import SlideMotion from 'components/animation/slide-motion';


describe('SearchTermItemPane component', function () {
  const name = 'item name';
  const description = 'some description';

  it('should be renderable if focused item has name', function () {
    SearchTermItemPane.should.be.renderable({ name: 'some name' });
  });

  it('should render correctly', function () {
    const wrapper = shallow(<SearchTermItemPane name={ name } description={ description } id={ name }/>);

    const titleComponent = wrapper.find('.test--preview-pane-title');
    titleComponent.text().should.equal('item name');

    const descriptionComponent = wrapper.find('.test--preview-pane-description').render();
    descriptionComponent.text().should.equal('some description');

    wrapper.find(CallToAction).exists().should.be.true();
  });

  it('should render SlideMotion with show property is true when name is not empty', function () {
    const wrapper = shallow(<SearchTermItemPane name={ name } description={ description } id={ name }/>);

    const slideMotion = wrapper.find(SlideMotion);
    slideMotion.prop('show').should.be.true();
  });

  it('should render SlideMotion with show property is false when name is empty', function () {
    const wrapper = shallow(<SearchTermItemPane name='' id=''/>);

    const slideMotion = wrapper.find(SlideMotion);
    slideMotion.prop('show').should.be.false();
  });
});
