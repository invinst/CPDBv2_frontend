import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import Timeline, { TimelineWithSpinner } from 'components/social-graph-page/network/right-pane-section/timeline';
import Item from 'components/social-graph-page/network/right-pane-section/timeline/item';
import LoadingSpinner from 'components/common/loading-spinner';
import styles from 'components/social-graph-page/network/right-pane-section/timeline/timeline.sass';


describe('Timeline component', function () {
  let instance;
  const items = [
    {
      kind: 'YEAR',
      year: 2005,
      hasData: true,
      key: '12345'
    },
    {
      kind: 'CR',
      crid: '123456',
      incidentDate: 'OCT 8',
      year: 2006,
      category: 'Use of Force',
      attachments: [],
      key: '123456',
      timelineIdx: 0,
    }
  ];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <Timeline
        items={ items }
        pathname='/social-graph/'
      />
    );
    const timelineItems = scryRenderedComponentsWithType(instance, Item);
    timelineItems.should.have.length(2);
  });

  it('should call addScrollEvents when componentDidUpdate if items are different from previous items', function () {
    const newItem = [
      {
        kind: 'CR',
        crid: '654321',
        incidentDate: 'OCT 10',
        year: 2007,
        category: 'Use of Force',
        attachments: [],
        key: '654321',
        timelineIdx: 1,
      }
    ];
    instance = renderIntoDocument(
      <Timeline
        items={ items }
        pathname='/social-graph/'
      />
    );
    const addScrollEventsSpy = stub(instance, 'addScrollEvents');
    reRender(
      <Timeline
        items={ newItem }
        pathname='/social-graph/'
      />,
      instance
    );
    addScrollEventsSpy.should.be.called();
    addScrollEventsSpy.restore();
  });

  it('should scrollTo timeline item when trigger change from external', function () {
    instance = renderIntoDocument(
      <Timeline
        items={ items }
        pathname='/social-graph/'
        timelineIdx={ 1 }
        timelineIdxTriggerChange={ 0 }
      />
    );
    const scrollControllerScrollToStub = stub(instance.scrollController, 'scrollTo');
    reRender(
      <Timeline
        items={ items }
        pathname='/social-graph/'
        timelineIdx={ 0 }
        timelineIdxTriggerChange={ 1 }
      />,
      instance
    );
    scrollControllerScrollToStub.should.be.calledWith('#trigger-0');
  });

  it('should destroy scrollController when componentWillUnmount', function () {
    instance = renderIntoDocument(
      <Timeline
        items={ items }
        pathname='/social-graph/'
      />
    );
    const scrollControllerDestroySpy = spy(instance.scrollController, 'destroy');
    unmountComponentSuppressError(instance);
    scrollControllerDestroySpy.should.be.calledWith(true);
  });

  it('should call updateTimelineIdx with timelineIdx of the item we scroll to', function () {
    const updateTimelineIdxStub = stub();
    const item = {
      kind: 'CR',
      timelineIdx: 3,
    };
    instance = renderIntoDocument(
      <Timeline
        items={ items }
        pathname='/social-graph/'
        timelineIdxTriggerChange={ 0 }
      />
    );
    instance = reRender(
      <Timeline
        items={ items }
        pathname='/social-graph/'
        timelineIdx={ 2 }
        refreshIntervalId={ 0 }
        updateTimelineIdx={ updateTimelineIdxStub }
        timelineIdxTriggerChange={ 0 }
      />,
      instance
    );
    instance.handleScroll(item);
    updateTimelineIdxStub.should.be.calledWith(3);
  });

  it('should update externalUpdate if timelineIdx is different from timelineIdx of the item we scroll to', function () {
    const item = {
      kind: 'CR',
      timelineIdx: 3,
    };
    instance = renderIntoDocument(
      <Timeline
        items={ items }
        pathname='/social-graph/'
        timelineIdxTriggerChange={ 0 }
        timelineIdx={ 3 }
      />
    );
    instance.externalUpdate.should.be.true();
    instance.handleScroll(item);
    instance.externalUpdate.should.be.false();
  });

  it('should call handleScroll when timeline reach ScrollMagic.Scene', function (done) {
    instance = renderIntoDocument(
      <Timeline
        items={ items }
        timelineIdx={ 0 }
        timelineIdxTriggerChange={ 0 }
      />
    );
    const handleScrollStub = stub(instance, 'handleScroll');
    setTimeout(() => {
      handleScrollStub.should.be.calledWith(items[1]);
      handleScrollStub.restore();
      done();
    }, 150);
  });

  context('withLoadingSpinner', function () {
    it('should render LoadingSpinner only if requesting is true', function () {
      instance = renderIntoDocument(
        <TimelineWithSpinner
          items={ items }
          timelineIdx={ 0 }
          timelineIdxTriggerChange={ 0 }
          requesting={ true }
        />
      );

      scryRenderedComponentsWithType(instance, Timeline).should.have.length(0);

      const loadingSpinner = findRenderedComponentWithType(instance, LoadingSpinner);
      loadingSpinner.props.className.should.equal(styles.timelineLoading);
    });

    it('should not render LoadingSpinner if requesting is false', function () {
      instance = renderIntoDocument(
        <TimelineWithSpinner
          items={ items }
          timelineIdx={ 0 }
          timelineIdxTriggerChange={ 0 }
          requesting={ false }
        />
      );

      scryRenderedComponentsWithType(instance, Timeline).should.have.length(1);
      scryRenderedComponentsWithType(instance, LoadingSpinner).should.have.length(0);
    });
  });
});
