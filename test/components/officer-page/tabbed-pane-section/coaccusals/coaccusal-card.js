import StaticRadarChart from 'components/common/radar-chart';
import CoaccusalCard from 'components/officer-page/tabbed-pane-section/coaccusals/coaccusal-card';
import React from 'react';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  Simulate
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import { unmountComponentSuppressError } from 'utils/test';


describe('CoaccusalCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough contents correctly', function () {
    const radarAxes = [
      {
        axis: 'trr',
        value: 95.0
      },
      {
        axis: 'internal',
        value: 94.0
      },
      {
        axis: 'civilian',
        value: 93.0
      }
    ];
    const coaccusal = {
      officerName: 'officerName',
      allegationCount: 1,
      sustainedCount: 1,
      allegationPercentile: 99.0,
      age: 40,
      race: 'white',
      gender: 'male',
      coaccusalCount: 1,
      rank: 'Police Officer',
      radarAxes: radarAxes,
      radarColor: {
        backgroundColor: 'white',
        textColor: 'black'
      },
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
        rank={ coaccusal.rank }
        radarAxes={ coaccusal.radarAxes }
        radarColor={ coaccusal.radarColor }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-thumbnail');
    const officerName = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-officer-name');
    const allegationCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-allegation-count');
    const sustainedCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-sustained-count');
    const allegationPercentile = findRenderedDOMComponentWithClass(
      instance, 'test--coaccusal-card-allegation-percentile'
    );
    const officerInfo = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-officer-info');
    const coaccusalCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-coaccusal-count');
    const officerRank = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-officer-rank');
    const coaccusalThumbnail = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-thumbnail');
    const staticRadarChart = findRenderedComponentWithType(instance, StaticRadarChart);

    officerName.textContent.should.eql('officerName');
    allegationCount.textContent.should.eql('1 allegation');
    sustainedCount.textContent.should.eql('1 sustained');
    allegationPercentile.textContent.should.eql('More than 99% of other officers');
    officerInfo.textContent.should.eql('40 years old, white, male.');
    coaccusalCount.textContent.should.eql('Coaccused in 1 case.');
    officerRank.textContent.should.eql('Police Officer');
    coaccusalThumbnail.style.height.should.eql('38px');
    coaccusalThumbnail.style.width.should.eql('38px');
    staticRadarChart.props.data.should.eql(radarAxes);
    staticRadarChart.props.backgroundColor.should.eql('white');
    staticRadarChart.props.textColor.should.eql('black');
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
      rank: 'Police Officer'
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
        rank={ coaccusal.rank }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-thumbnail');
    const allegationCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-allegation-count');
    const sustainedCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-sustained-count');
    const allegationPercentile =
      findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-allegation-percentile');
    const officerInfo = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-officer-info');
    const coaccusalCount = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card-coaccusal-count');

    allegationCount.textContent.should.eql('2 allegations');
    sustainedCount.textContent.should.eql('1 sustained');
    allegationPercentile.textContent.should.eql('More than 99.9% of other officers');
    officerInfo.textContent.should.eql('40 years old, white, male.');
    coaccusalCount.textContent.should.eql('Coaccused in 3 cases.');
  });

  it('should call openOfficerPage action with coaccused officer id when clicking on it', function () {
    const coaccusal = {
      officerId: 1234,
      officerName: 'officerName',
      allegationCount: 2,
      sustainedCount: 1,
      allegationPercentile: 99.999,
      age: 40,
      race: 'white',
      gender: 'male',
      coaccusalCount: 3,
      rank: 'Police Officer'
    };
    const openOfficerPageStub = stub();

    instance = renderIntoDocument(
      <CoaccusalCard
        officerId={ coaccusal.officerId }
        officerName={ coaccusal.officerName }
        allegationCount={ coaccusal.allegationCount }
        sustainedCount={ coaccusal.sustainedCount }
        allegationPercentile={ coaccusal.allegationPercentile }
        age={ coaccusal.age }
        race={ coaccusal.race }
        gender={ coaccusal.gender }
        coaccusalCount={ coaccusal.coaccusalCount }
        openOfficerPage={ openOfficerPageStub }
        rank={ coaccusal.rank }
      />
    );

    const coaccusalCard = findRenderedDOMComponentWithClass(instance, 'test--coaccusal-card');
    Simulate.click(coaccusalCard);

    openOfficerPageStub.should.be.calledWith(1234);
  });
});
