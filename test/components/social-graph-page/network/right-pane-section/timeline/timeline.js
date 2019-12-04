import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';

import Timeline, { TimelineWithSpinner } from 'components/social-graph-page/network/right-pane-section/timeline';
import Item from 'components/social-graph-page/network/right-pane-section/timeline/item';
import LoadingSpinner from 'components/common/loading-spinner';
import styles from 'components/social-graph-page/network/right-pane-section/timeline/timeline.sass';


describe('Timeline component', function () {
  const items = [
    {
      kind: 'YEAR',
      year: 2005,
      hasData: true,
      key: '12345',
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
    },
  ];

  it('should render correctly', function () {
    const wrapper = shallow(
      <Timeline
        items={ items }
        pathname='/social-graph/'
      />
    );
    const timelineItems = wrapper.find(Item);
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
      },
    ];
    const wrapper = mount(
      <Timeline
        items={ items }
        pathname='/social-graph/'
      />
    );
    const addScrollEventsSpy = stub(wrapper.instance(), 'addScrollEvents');
    wrapper.setProps({
      items: newItem,
      pathname: '/social-graph/',
    });
    addScrollEventsSpy.should.be.called();
    addScrollEventsSpy.restore();
  });

  it('should scrollTo timeline item when trigger change from external', function () {
    const wrapper = mount(
      <Timeline
        items={ items }
        pathname='/social-graph/'
        timelineIdx={ 1 }
        timelineIdxTriggerChange={ 0 }
      />
    );
    const scrollControllerScrollToStub = stub(wrapper.instance().scrollController, 'scrollTo');
    wrapper.setProps({
      items: items,
      pathname: '/social-graph/',
      timelineIdx: 0,
      timelineIdxTriggerChange: 1,
    });
    scrollControllerScrollToStub.should.be.calledWith('#trigger-0');
  });

  it('should destroy scrollController when componentWillUnmount', function () {
    const wrapper = mount(
      <Timeline
        items={ items }
        pathname='/social-graph/'
      />
    );
    const scrollControllerDestroySpy = spy(wrapper.instance().scrollController, 'destroy');
    wrapper.unmount();
    scrollControllerDestroySpy.should.be.calledWith(true);
  });

  it('should call updateTimelineIdx with timelineIdx of the item we scroll to', function () {
    const updateTimelineIdxStub = stub();
    const item = {
      kind: 'CR',
      timelineIdx: 3,
    };
    const wrapper = mount(
      <Timeline
        items={ items }
        pathname='/social-graph/'
        timelineIdxTriggerChange={ 0 }
      />
    );
    wrapper.setProps({
      items: items,
      pathname: '/social-graph/',
      timelineIdx: 2,
      refreshIntervalId: 0,
      updateTimelineIdx: updateTimelineIdxStub,
      timelineIdxTriggerChange: 0,
    });
    wrapper.instance().handleScroll(item);
    updateTimelineIdxStub.should.be.calledWith(3);
  });

  it('should update externalUpdate if timelineIdx is different from timelineIdx of the item we scroll to', function () {
    const item = {
      kind: 'CR',
      timelineIdx: 3,
    };
    const wrapper = shallow(
      <Timeline
        items={ items }
        pathname='/social-graph/'
        timelineIdxTriggerChange={ 0 }
        timelineIdx={ 3 }
      />
    );
    wrapper.instance().externalUpdate.should.be.true();
    wrapper.instance().handleScroll(item);
    wrapper.instance().externalUpdate.should.be.false();
  });

  it('should call handleScroll when timeline reach ScrollMagic.Scene', function (done) {
    const handleScrollStub = stub(Timeline.prototype, 'handleScroll');
    mount(
      <Timeline
        items={ items }
        timelineIdx={ 0 }
        timelineIdxTriggerChange={ 0 }
      />
    );
    setTimeout(() => {
      handleScrollStub.should.be.calledWith(items[1]);
      handleScrollStub.restore();
      done();
    }, 150);
  });

  context('withLoadingSpinner', function () {
    it('should render LoadingSpinner only if requesting is true', function () {
      const wrapper = shallow(
        <TimelineWithSpinner
          items={ items }
          timelineIdx={ 0 }
          timelineIdxTriggerChange={ 0 }
          requesting={ true }
        />
      );

      wrapper.find(Timeline).exists().should.be.false();

      const loadingSpinner = wrapper.find(LoadingSpinner);
      loadingSpinner.prop('className').should.equal(styles.timelineLoading);
    });

    it('should not render LoadingSpinner if requesting is false', function () {
      const wrapper = shallow(
        <TimelineWithSpinner
          items={ items }
          timelineIdx={ 0 }
          timelineIdxTriggerChange={ 0 }
          requesting={ false }
        />
      );

      wrapper.find(Timeline).should.have.length(1);
      wrapper.find(LoadingSpinner).exists().should.be.false();
    });
  });
});
