import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CoaccusalCard from 'components/officer-page/summary-page/tabbed-pane-section/coaccusals/coaccusal-card';


describe('CoaccusalCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough contents correctly', function () {
    const coaccusal = {
      officerName: 'officerName',
      allegationCount: 1,
      sustainedCount: 1,
      allegationPercentile: 99.0,
      age: 40,
      race: 'white',
      gender: 'male',
      coaccusalCount: 1,
    };

    instance = renderIntoDocument(
      <CoaccusalCard
        officerName={ coaccusal.officerName }
        allegationCount={ coaccusal.allegationCount }
        sustainedCount={ coaccusal.sustainedCount }
        allegationPercentile={ coaccusal.allegationPercentile }
        age={ coaccusal.age }
        race={ coaccusal.race }
        gender={ coaccusal.gender }
        coaccusalCount={ coaccusal.coaccusalCount }
        thumbnail='https://via.placeholder.com/38x38'
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-thumbnail');
    const officerName = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-officer-name');
    const allegationCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-allegation-count');
    const sustainedCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-sustained-count');
    const allegationPercentile =
      findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-allegation-percentile');
    const officerInfo = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-officer-info');
    const coaccusalCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-coaccusal-count');

    officerName.textContent.should.eql('officerName');
    allegationCount.textContent.should.eql('1 allegation');
    sustainedCount.textContent.should.eql('1 sustained');
    allegationPercentile.textContent.should.eql('More than 99% of other officers');
    officerInfo.textContent.should.eql('40 years old, white, male.');
    coaccusalCount.textContent.should.eql('Coaccused in 1 case.');
  });

  it('should pluralize and round percentile correctly ', function () {
    const coaccusal = {
      officerName: 'officerName',
      allegationCount: 2,
      sustainedCount: 1,
      allegationPercentile: 99.999,
      age: 40,
      race: 'white',
      gender: 'male',
      coaccusalCount: 3,
    };

    instance = renderIntoDocument(
      <CoaccusalCard
        officerName={ coaccusal.officerName }
        allegationCount={ coaccusal.allegationCount }
        sustainedCount={ coaccusal.sustainedCount }
        allegationPercentile={ coaccusal.allegationPercentile }
        age={ coaccusal.age }
        race={ coaccusal.race }
        gender={ coaccusal.gender }
        coaccusalCount={ coaccusal.coaccusalCount }
        thumbnail='https://via.placeholder.com/38x38'
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-thumbnail');
    const officerName = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-officer-name');
    const allegationCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-allegation-count');
    const sustainedCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-sustained-count');
    const allegationPercentile =
      findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-allegation-percentile');
    const officerInfo = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-officer-info');
    const coaccusalCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-coaccusal-count');

    officerName.textContent.should.eql('officerName');
    allegationCount.textContent.should.eql('2 allegations');
    sustainedCount.textContent.should.eql('1 sustained');
    allegationPercentile.textContent.should.eql('More than 99.9% of other officers');
    officerInfo.textContent.should.eql('40 years old, white, male.');
    coaccusalCount.textContent.should.eql('Coaccused in 3 cases.');
  });
});
