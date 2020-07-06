import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import Slider from 'rc-slider';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import NetworkGraph from 'components/social-graph-page/network';
import AnimatedSocialGraphContainer from 'containers/social-graph-page/animated-social-graph-container';
import RightPaneSection from 'components/social-graph-page/network/right-pane-section';
import OfficerPane from 'components/common/preview-pane/panes/officer-pane';
import EdgeCoaccusalsPane from 'components/social-graph-page/network/preview-pane/edge-coaccusals-pane';
import PreviewPane from 'components/social-graph-page/network/preview-pane';
import * as intercomUtils from 'utils/intercom';
import { NETWORK_PREVIEW_PANE } from 'utils/constants';


describe('NetworkGraph component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    socialGraphPage: {
      networkData: {
        graphData: {},
      },
    },
  });

  it('should render all sections correctly', function () {
    const wrapper = shallow(
      <NetworkGraph unitId='232' title='This is a Social Graph title.'/>
    );

    wrapper.find('.social-graph-title').text().should.eql(
      'This is a Social Graph title.'
    );
    wrapper.find('.coaccusals-threshold-text').text().should.eql(
      'Minimum Coaccusal Threshold'
    );
    wrapper.find(AnimatedSocialGraphContainer).exists().should.be.true();
    wrapper.find(RightPaneSection).exists().should.be.true();
    const slider = wrapper.find(Slider);
    slider.prop('step').should.equal(1);
    slider.prop('min').should.equal(1);
    slider.prop('max').should.equal(4);
    slider.prop('defaultValue').should.equal(2);
    slider.prop('value').should.equal(2);
  });

  it('should call requestSocialGraphNetwork with correct unitId when componentDidMount', function () {
    const requestSocialGraphNetworkStub = stub();
    mount(
      <Provider store={ store }>
        <NetworkGraph
          requestSocialGraphNetwork={ requestSocialGraphNetworkStub }
          unitId='232'
        />
      </Provider>
    );
    requestSocialGraphNetworkStub.should.be.calledWith({
      'unit_id': '232',
      'threshold': 2,
      'complaint_origin': 'CIVILIAN',
    });
  });

  it('should call requestSocialGraphNetwork with correct officerIds when componentDidMount', function () {
    const requestSocialGraphNetworkStub = stub();
    mount(
      <Provider store={ store }>
        <NetworkGraph
          requestSocialGraphNetwork={ requestSocialGraphNetworkStub }
          officerIds='123,456,789'
        />
      </Provider>
    );
    requestSocialGraphNetworkStub.should.be.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 2,
      'complaint_origin': 'CIVILIAN',
    });
  });


  it('should call requestSocialGraphNetwork with correct pinboardId when componentDidMount', function () {
    const requestSocialGraphNetworkStub = stub();
    mount(
      <Provider store={ store }>
        <NetworkGraph
          requestSocialGraphNetwork={ requestSocialGraphNetworkStub }
          pinboardId='5cd06f2b'
        />
      </Provider>
    );
    requestSocialGraphNetworkStub.should.be.calledWith({
      'pinboard_id': '5cd06f2b',
      'threshold': 2,
      'complaint_origin': 'CIVILIAN',
    });
  });

  it('should not call requestSocialGraphNetwork if both unitId and officerIds are missing', function () {
    const requestSocialGraphNetworkStub = stub();
    shallow(
      <Provider store={ store }>
        <NetworkGraph
          requestSocialGraphNetwork={ requestSocialGraphNetworkStub }
        />
      </Provider>
    );
    requestSocialGraphNetworkStub.should.not.be.called();
  });

  it('should call requestSocialGraphAllegations with correct unitId when componentDidMount', function () {
    const requestSocialGraphAllegationsStub = stub();
    mount(
      <Provider store={ store }>
        <NetworkGraph
          requestSocialGraphAllegations={ requestSocialGraphAllegationsStub }
          unitId='232'
        />
      </Provider>
    );
    requestSocialGraphAllegationsStub.should.be.calledWith({
      'unit_id': '232',
      'threshold': 2,
      'complaint_origin': 'CIVILIAN',
    });
  });

  it('should call requestSocialGraphAllegations with correct officerIds when componentDidMount', function () {
    const requestSocialGraphAllegationsStub = stub();
    mount(
      <Provider store={ store }>
        <NetworkGraph
          requestSocialGraphAllegations={ requestSocialGraphAllegationsStub }
          officerIds='123,456,789'
        />
      </Provider>
    );
    requestSocialGraphAllegationsStub.should.be.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 2,
      'complaint_origin': 'CIVILIAN',
    });
  });

  it('should not call requestSocialGraphAllegations if both unitId and officerIds are missing', function () {
    const requestSocialGraphAllegationsStub = stub();
    mount(
      <Provider store={ store }>
        <NetworkGraph
          requestSocialGraphAllegations={ requestSocialGraphAllegationsStub }
        />
      </Provider>
    );
    requestSocialGraphAllegationsStub.should.not.be.called();
  });


  it('should call requestSocialGraphOfficer with correct officerIds when componentDidMount', function () {
    const requestSocialGraphOfficersStub = stub();
    mount(
      <Provider store={ store }>
        <NetworkGraph
          requestSocialGraphOfficers={ requestSocialGraphOfficersStub }
          officerIds='123,456,789'
        />
      </Provider>
    );
    requestSocialGraphOfficersStub.should.be.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 2,
      'complaint_origin': 'CIVILIAN',
    });
  });

  it('should call requestSocialGraphOfficer with correct unitId when componentDidMount', function () {
    const requestSocialGraphOfficersStub = stub();
    mount(
      <Provider store={ store }>
        <NetworkGraph
          requestSocialGraphOfficers={ requestSocialGraphOfficersStub }
          unitId='232'
        />
      </Provider>
    );
    requestSocialGraphOfficersStub.should.be.calledWith({
      'unit_id': '232',
      'threshold': 2,
      'complaint_origin': 'CIVILIAN',
    });
  });

  context('pinboardId in param', function () {
    it('should call fetchComplaintSummary on componentDidMount', function () {
      const fetchComplaintSummaryStub = stub();
      mount(
        <Provider store={ store }>
          <NetworkGraph
            fetchComplaintSummary={ fetchComplaintSummaryStub }
            pinboardId='c05fbe83'
          />
        </Provider>
      );
      fetchComplaintSummaryStub.should.be.calledOnce();
    });
  });

  context('pinboardId is not in param', function () {
    it('should not call fetchComplaintSummary on componentDidMount', function () {
      const fetchComplaintSummaryStub = stub();
      mount(
        <Provider store={ store }>
          <NetworkGraph
            fetchComplaintSummary={ fetchComplaintSummaryStub }
            unitId='235'
          />
        </Provider>
      );

      mount(
        <Provider store={ store }>
          <NetworkGraph
            fetchComplaintSummary={ fetchComplaintSummaryStub }
            officerIds='2,3,7,8'
          />
        </Provider>
      );

      fetchComplaintSummaryStub.should.not.be.called();
    });
  });

  it('should not call requestSocialGraphOfficer if both unitId and officerIds are missing', function () {
    const requestSocialGraphOfficersStub = stub();
    mount(
      <Provider store={ store }>
        <NetworkGraph
          requestSocialGraphOfficers={ requestSocialGraphOfficersStub }
        />
      </Provider>
    );
    requestSocialGraphOfficersStub.should.not.be.called();
  });

  it('should hide Intercom launcher when componentDidMounted', function () {
    stub(intercomUtils, 'showIntercomLauncher');

    mount(
      <Provider store={ store }>
        <NetworkGraph/>
      </Provider>
    );
    intercomUtils.showIntercomLauncher.should.be.calledWith(false);
  });

  it('should add mousedown event when componentDidMounted', function () {
    stub(window, 'addEventListener');

    const wrapper = mount(
      <Provider store={ store }>
        <NetworkGraph/>
      </Provider>
    );
    const instance = wrapper.find(NetworkGraph).instance();

    window.addEventListener.should.be.calledWith('mousedown', instance.handleClickOutside);
  });

  it('should show Intercom launcher again when componentWillUnmount', function () {
    stub(intercomUtils, 'showIntercomLauncher');

    const wrapper = mount(
      <Provider store={ store }>
        <NetworkGraph/>
      </Provider>
    );
    intercomUtils.showIntercomLauncher.resetHistory();
    wrapper.unmount();
    intercomUtils.showIntercomLauncher.should.be.calledWith(true);
  });

  it('should remove mousedown event when componentWillUnmount', function () {
    stub(window, 'removeEventListener');

    const wrapper = mount(
      <Provider store={ store }>
        <NetworkGraph/>
      </Provider>
    );
    const instance = wrapper.find(NetworkGraph).instance();
    wrapper.unmount();

    window.removeEventListener.should.be.calledWith('mousedown', instance.handleClickOutside);
  });

  it('should fetch data again when componentDidUpdate', function () {
    const requestSocialGraphNetworkStub = stub();
    const wrapper = shallow(
      <NetworkGraph
        requestSocialGraphNetwork={ requestSocialGraphNetworkStub }
        officerIds='123,456,789'
      />
    );

    requestSocialGraphNetworkStub.resetHistory();
    wrapper.setState({ complaintOrigin: 'ALL', thresholdValue: 3 });

    requestSocialGraphNetworkStub.should.be.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 3,
      'complaint_origin': 'ALL',
    });
  });

  it('should update complaint origin value when click on complaint origin label', function () {
    const wrapper = shallow(
      <NetworkGraph officerIds='123,456,789'/>
    );
    const complaintOriginAll= wrapper.find('.complaint-origin-option').at(0);
    const complaintOriginOfficer = wrapper.find('.complaint-origin-option').at(2);
    wrapper.state('complaintOrigin').should.equal('CIVILIAN');
    complaintOriginAll.simulate('click');
    wrapper.state('complaintOrigin').should.equal('ALL');
    complaintOriginOfficer.simulate('click');
    wrapper.state('complaintOrigin').should.equal('OFFICER');
  });

  it('should update value when click on coaccusals threshold slider', function () {
    const wrapper = shallow(
      <NetworkGraph officerIds='123,456,789'/>
    );

    wrapper.state('thresholdValue').should.equal(2);

    const coaccusalsThresholdSlider = wrapper.find(Slider);
    coaccusalsThresholdSlider.prop('onChange')(3);
    wrapper.state('thresholdValue').should.equal(3);
  });

  it('should render officer preview-pane if there is selectedOfficerId', function () {
    const networkPreviewPaneData = {
      type: NETWORK_PREVIEW_PANE.OFFICER,
      data: {
        id: 123,
        to: '/officer/123/jerome-finnigan/',
        fullName: 'Jerome Finnigan',
        appointedDate: 'JUL 8, 2001',
        resignationDate: 'OCT 10, 2005',
        badge: '123456',
        gender: 'Male',
        age: 47,
        race: 'White',
        rank: 'Police Officer',
        unit: {
          id: 456,
          unitName: 'Unit 715',
          description: 'This is unit description',
        },
        complaintCount: 10,
        civilianComplimentCount: 20,
        sustainedCount: 5,
        disciplineCount: 3,
        trrCount: 7,
        majorAwardCount: 15,
        honorableMentionCount: 12,
        honorableMentionPercentile: 70,
        trrPercentile: 90,
        allegationPercentile: 95,
        lastPercentile: {
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 82 },
            { axis: 'Civilian Allegations', value: 97 },

          ],
          visualTokenBackground: '#F52524',
          textColor: '#DFDFDF',
        },
      },
    };
    const wrapper = mount(
      <Provider store={ store }>
        <NetworkGraph selectedOfficerId={ 123 } networkPreviewPaneData={ networkPreviewPaneData }/>
      </Provider>
    );
    wrapper.find(OfficerPane).exists().should.be.true();
    wrapper.find(RightPaneSection).exists().should.be.false();
  });

  it('should render edge coaccusals preview-pane if there is selectedEdge', function () {
    const networkPreviewPaneData = {
      type: NETWORK_PREVIEW_PANE.EDGE_COACCUSALS,
      data: {
        items: [
          {
            date: 2003,
            hasData: true,
            key: '294088-YEAR-2003',
            kind: 'YEAR',
          },
          {
            category: 'Illegal Search',
            crid: '294088',
            incidentDate: 'NOV 26',
            key: '294088',
            kind: 'CR',
            subcategory: 'Search Of Premise Without Warrant',
            year: 2003,
            attachments: [
              {
                fileType: 'document',
                id: '123456',
                previewImageUrl: 'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088.gif',
                title: 'CRID 294088 CR',
                url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html',
              },
            ],
            timelineIdx: 1,
          },
        ],
        info: {
          sourceOfficerName: 'Jerome Finnigan',
          targetOfficerName: 'Edward May',
          coaccusedCount: 6,
        },
      },
    };
    const wrapper = mount(
      <Provider store={ store }>
        <NetworkGraph selectedOfficerId={ 123 } networkPreviewPaneData={ networkPreviewPaneData }/>
      </Provider>
    );
    wrapper.find(EdgeCoaccusalsPane).exists().should.be.true();
    wrapper.find(RightPaneSection).exists().should.be.false();
  });

  it('should call updateSelectedOfficerId when clicking outside and there is selectedOfficerId', function () {
    const updateSelectedOfficerIdStub = stub();
    const wrapper = mount(
      <Provider store={ store }>
        <NetworkGraph
          updateSelectedOfficerId={ updateSelectedOfficerIdStub }
          selectedOfficerId={ 123 }
        />
      </Provider>
    );
    const leftSection = wrapper.find('.left-section');
    wrapper.find(NetworkGraph).instance().handleClickOutside({ target: leftSection.getDOMNode() });
    updateSelectedOfficerIdStub.should.be.calledOnce();
    updateSelectedOfficerIdStub.should.be.calledWith(null);
  });

  it('should call updateSelectedEdge when clicking outside and there is selectedEdge', function () {
    const updateSelectedEdgeStub = stub();
    const selectedEdge = {
      sourceOfficerName: 'Jerome Finnigan',
      targetOfficerName: 'Edward May',
      coaccusedCount: 10,
    };
    const wrapper = mount(
      <Provider store={ store }>
        <NetworkGraph
          updateSelectedEdge={ updateSelectedEdgeStub }
          selectedEdge={ selectedEdge }
        />
      </Provider>
    );
    const leftSection = wrapper.find('.left-section');
    wrapper.find(NetworkGraph).instance().handleClickOutside({ target: leftSection.getDOMNode() });
    updateSelectedEdgeStub.should.be.calledWith(null);
  });

  it('should not call updateSelectedEdge when clicking outside and there is selected crid and edge', function () {
    const updateSelectedEdgeStub = stub();
    const selectedEdge = {
      sourceOfficerName: 'Jerome Finnigan',
      targetOfficerName: 'Edward May',
      coaccusedCount: 10,
    };
    const wrapper = mount(
      <Provider store={ store }>
        <NetworkGraph
          updateSelectedEdge={ updateSelectedEdgeStub }
          selectedEdge={ selectedEdge }
          selectedCrid={ '123456' }
        />
      </Provider>
    );
    const leftSection = wrapper.find('.left-section');
    wrapper.find(NetworkGraph).instance().handleClickOutside({ target: leftSection.getDOMNode() });
    updateSelectedEdgeStub.should.not.be.called();
  });

  it('should call updateSelectedCrid when clicking outside and there is selectedCrid', function () {
    const updateSelectedCridStub = stub();
    const wrapper = mount(
      <Provider store={ store }>
        <NetworkGraph
          updateSelectedCrid={ updateSelectedCridStub }
          selectedCrid={ '123456' }
        />
      </Provider>
    );
    const leftSection = wrapper.find('.left-section');
    wrapper.find(NetworkGraph).instance().handleClickOutside({ target: leftSection.getDOMNode() });
    updateSelectedCridStub.should.be.calledWith(null);
  });

  it('should not call update selected officer, edge and cr when clicking on preview-pane', function () {
    const updateSelectedOfficerIdStub = stub();
    const updateSelectedCridStub = stub();
    const updateSelectedEdgeStub = stub();
    const networkPreviewPaneData = {
      type: NETWORK_PREVIEW_PANE.OFFICER,
      data: {
        id: 123,
        to: '/officer/123/jerome-finnigan/',
        fullName: 'Jerome Finnigan',
        appointedDate: 'JUL 8, 2001',
        resignationDate: 'OCT 10, 2005',
        badge: '123456',
        gender: 'Male',
        age: 47,
        race: 'White',
        rank: 'Police Officer',
        unit: {
          id: 456,
          unitName: 'Unit 715',
          description: 'This is unit description',
        },
        complaintCount: 10,
        civilianComplimentCount: 20,
        sustainedCount: 5,
        disciplineCount: 3,
        trrCount: 7,
        majorAwardCount: 15,
        honorableMentionCount: 12,
        honorableMentionPercentile: 70,
        trrPercentile: 90,
        allegationPercentile: 95,
        lastPercentile: {
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 82 },
            { axis: 'Civilian Allegations', value: 97 },
          ],
          visualTokenBackground: '#F52524',
          textColor: '#DFDFDF',
        },
      },
    };
    const wrapper = shallow(
      <NetworkGraph
        updateSelectedOfficerId={ updateSelectedOfficerIdStub }
        updateSelectedCrid={ updateSelectedCridStub }
        updateSelectedEdge={ updateSelectedEdgeStub }
        selectedOfficerId={ 123 }
        networkPreviewPaneData={ networkPreviewPaneData }
      />
    );
    const previewPane = wrapper.find(PreviewPane);
    wrapper.instance().handleClickOutside({ target: previewPane.render() });
    updateSelectedOfficerIdStub.should.not.be.called();
    updateSelectedCridStub.should.not.be.called();
    updateSelectedEdgeStub.should.not.be.called();
  });

  it('should update sortedOfficerIds state when calling updateSortedOfficerIds', function () {
    const wrapper = shallow(
      <NetworkGraph unitId='232'/>
    );

    wrapper.state('sortedOfficerIds').should.eql([]);
    wrapper.instance().updateSortedOfficerIds([123, 456, 789]);
    wrapper.state('sortedOfficerIds').should.eql([123, 456, 789]);
  });

  it('should show/hide left sidebar and right sidebar when clicking on toggle sidebars button', function () {
    const store = mockStore({
      socialGraphPage: {
        networkData: {
          graphData: {
            officers: [
              {
                'full_name': 'Jerome Finnigan',
                'id': 1,
                'percentile_trr': '78.2707',
                'percentile_allegation_civilian': '97.8772',
                'percentile_allegation_internal': '61.1521',
              },
              {
                'full_name': 'Edward May',
                'id': 2,
                'percentile_trr': '78.2707',
                'percentile_allegation_civilian': '97.8772',
                'percentile_allegation_internal': '61.1521',
              },
            ],
            'coaccused_data': [
              {
                'officer_id_1': 1,
                'officer_id_2': 2,
                'incident_date': '1988-10-03',
                'accussed_count': 1,
              },
              {
                'officer_id_1': 1,
                'officer_id_2': 2,
                'incident_date': '1989-10-03',
                'accussed_count': 2,
              },
            ],
            'list_event': ['1988-10-03', '1989-10-03'],
          },
        },
      },
    });
    const wrapper = mount(
      <Provider store={ store }>
        <NetworkGraph officerIds='123,456,789'/>
      </Provider>
    );

    const toggleSidebarsButton = wrapper.find('.toggle-sidebars-btn');
    wrapper.find('.left-section').exists().should.be.true();
    wrapper.find('.right-section').exists().should.be.true();

    toggleSidebarsButton.simulate('click');
    wrapper.find('.left-section').exists().should.be.false();
    wrapper.find('.right-section').exists().should.be.true();

    toggleSidebarsButton.simulate('click');
    wrapper.find('.left-section').exists().should.be.false();
    wrapper.find('.right-section').exists().should.be.false();

    toggleSidebarsButton.simulate('click');
    wrapper.find('.left-section').exists().should.be.true();
    wrapper.find('.right-section').exists().should.be.false();
  });

  it('should update performResizeGraph when sidebarsStatus state is difference after updating', function () {
    const wrapper = shallow(
      <NetworkGraph officerIds='123,456,789'/>
    );

    wrapper.setState({ sidebarsStatus: 'SHOW_BOTH' });
    wrapper.find(AnimatedSocialGraphContainer).prop('performResizeGraph').should.be.false();

    wrapper.setState({ sidebarsStatus: 'HIDE_BOTH' });
    wrapper.find(AnimatedSocialGraphContainer).prop('performResizeGraph').should.be.true();
  });

  it('should render mainTabsContent if there is mainTabsContent', function () {
    const wrapper = shallow(
      <NetworkGraph
        unitId='232'
        mainTabsContent={ <div className='main-tabs-content'>This is main tabs content</div> }
      />
    );
    const mainTabsContent = wrapper.find('.main-tabs-content');
    mainTabsContent.text().should.equal('This is main tabs content');
  });
});
