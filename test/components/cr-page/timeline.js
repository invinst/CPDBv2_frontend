import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Timeline from 'components/cr-page/timeline';


describe('Timeline component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render 3 date if given 3 different dates', function () {
    instance = renderIntoDocument(<Timeline startDate='2012-12-12' endDate='2013-12-12' incidentDate='2011-12-12'/>);
    const texts = scryRenderedDOMComponentsWithClass(instance, 'date');
    texts.length.should.eql(3);
    texts[0].textContent.should.eql('Dec 12, 2011');
    texts[1].textContent.should.eql('Dec 12, 2012');
    texts[2].textContent.should.eql('Dec 12, 2013');
  });

  it('should render 2 dates if 2 out of 3 dates are the same', function () {
    instance = renderIntoDocument(<Timeline startDate='2012-12-12' endDate='2013-12-12' incidentDate='2012-12-12'/>);
    let texts = scryRenderedDOMComponentsWithClass(instance, 'date');
    texts.length.should.eql(2);
    texts[0].textContent.should.eql('Dec 12, 2012');
    texts[1].textContent.should.eql('Dec 12, 2013');

    instance = renderIntoDocument(<Timeline startDate='2013-12-12' endDate='2013-12-12' incidentDate='2012-12-12'/>);
    texts = scryRenderedDOMComponentsWithClass(instance, 'date');
    texts.length.should.eql(2);
    texts[0].textContent.should.eql('Dec 12, 2012');
    texts[1].textContent.should.eql('Dec 12, 2013');
  });

  it('should render 1 date if all of 3 dates are the same', function () {
    instance = renderIntoDocument(<Timeline startDate='2012-12-12' endDate='2012-12-12' incidentDate='2012-12-12'/>);
    const texts = scryRenderedDOMComponentsWithClass(instance, 'date');
    texts.length.should.eql(1);
    texts[0].textContent.should.eql('Dec 12, 2012');
  });

  it('should not render any date if not given any date', function () {
    instance = renderIntoDocument(<Timeline/>);
    const texts = scryRenderedDOMComponentsWithClass(instance, 'date');
    texts.length.should.eql(0);
  });
});
