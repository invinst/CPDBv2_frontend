import React from 'react';
import { stub } from 'sinon';
import Slider from 'rc-slider';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  scryRenderedComponentsWithType,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import NetworkGraph from 'components/social-graph-page/network';
import AnimatedSocialGraphContainer from 'containers/social-graph-page/animated-social-graph-container';
import RightPaneSection from 'components/social-graph-page/network/right-pane-section';
import OfficerPane from 'components/common/preview-pane/officer-pane';
import EdgeCoaccusalsPane from 'components/social-graph-page/network/preview-pane/edge-coaccusals-pane';
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
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render all sections correctly', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph unitId='232' title='This is a Social Graph title.'/>
      </Provider>
    );

    findRenderedDOMComponentWithClass(instance, 'social-graph-title').textContent.should.eql(
      'This is a Social Graph title.'
    );
    findRenderedDOMComponentWithClass(instance, 'coaccusals-threshold-text').textContent.should.eql(
      'Minimum Coaccusal Threshold'
    );
    scryRenderedComponentsWithType(instance, AnimatedSocialGraphContainer).should.have.length(1);
    scryRenderedComponentsWithType(instance, RightPaneSection).should.have.length(1);
    const slider = findRenderedComponentWithType(instance, Slider);
    slider.props.step.should.eql(1);
    slider.props.min.should.eql(1);
    slider.props.max.should.eql(4);
    slider.props.defaultValue.should.eql(2);
    slider.props.value.should.eql(2);
  });

  it('should call requestSocialGraphNetwork with correct unitId when componentDidMount', function () {
    const requestSocialGraphNetworkStub = stub();
    instance = renderIntoDocument(
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
      'show_civil_only': true
    });
  });

  it('should call requestSocialGraphNetwork with correct officerIds when componentDidMount', function () {
    const requestSocialGraphNetworkStub = stub();
    instance = renderIntoDocument(
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
      'show_civil_only': true
    });
  });


  it('should call requestSocialGraphNetwork with correct pinboardId when componentDidMount', function () {
    const requestSocialGraphNetworkStub = stub();
    instance = renderIntoDocument(
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
      'show_civil_only': true
    });
  });

  it('should not call requestSocialGraphNetwork if both unitId and officerIds are missing', function () {
    const requestSocialGraphNetworkStub = stub();
    instance = renderIntoDocument(
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
    instance = renderIntoDocument(
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
      'show_civil_only': true
    });
  });

  it('should call requestSocialGraphAllegations with correct officerIds when componentDidMount', function () {
    const requestSocialGraphAllegationsStub = stub();
    instance = renderIntoDocument(
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
      'show_civil_only': true
    });
  });

  it('should not call requestSocialGraphAllegations if both unitId and officerIds are missing', function () {
    const requestSocialGraphAllegationsStub = stub();
    instance = renderIntoDocument(
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
    instance = renderIntoDocument(
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
      'show_civil_only': true
    });
  });

  it('should call requestSocialGraphOfficer with correct unitId when componentDidMount', function () {
    const requestSocialGraphOfficersStub = stub();
    instance = renderIntoDocument(
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
      'show_civil_only': true
    });
  });

  it('should not call requestSocialGraphOfficer if both unitId and officerIds are missing', function () {
    const requestSocialGraphOfficersStub = stub();
    instance = renderIntoDocument(
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

    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph/>
      </Provider>
    );
    intercomUtils.showIntercomLauncher.should.be.calledWith(false);

    intercomUtils.showIntercomLauncher.restore();
  });

  it('should add mousedown event when componentDidMounted', function () {
    stub(window, 'addEventListener');
    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph/>
      </Provider>
    );

    const networkGraph = findRenderedComponentWithType(instance, NetworkGraph);
    window.addEventListener.should.be.calledWith('mousedown', networkGraph.handleClickOutside);
    window.addEventListener.restore();
  });

  it('should show Intercom launcher again when componentWillUnmount', function () {
    stub(intercomUtils, 'showIntercomLauncher');

    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph/>
      </Provider>
    );
    intercomUtils.showIntercomLauncher.resetHistory();
    unmountComponentSuppressError(instance);
    intercomUtils.showIntercomLauncher.should.be.calledWith(true);

    intercomUtils.showIntercomLauncher.restore();
  });

  it('should remove mousedown event when componentWillUnmount', function () {
    stub(window, 'removeEventListener');
    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph/>
      </Provider>
    );
    const networkGraph = findRenderedComponentWithType(instance, NetworkGraph);

    unmountComponentSuppressError(instance);

    window.removeEventListener.should.be.calledWith('mousedown', networkGraph.handleClickOutside);
    window.removeEventListener.restore();
  });

  it('should fetch data again when componentDidUpdate', function () {
    const requestSocialGraphNetworkStub = stub();
    instance = renderIntoDocument(
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
      'show_civil_only': true
    });

    const networkGraph = findRenderedComponentWithType(instance, NetworkGraph);
    networkGraph.setState({ 'showCivilComplaintOnly': false, thresholdValue: 3 });

    requestSocialGraphNetworkStub.should.be.calledWith({
      'officer_ids': '123,456,789',
      'threshold': 3,
      'show_civil_only': false
    });
  });

  it('should update value when click on show civil only checkbox', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph officerIds='123,456,789'/>
      </Provider>
    );
    const networkGraph = findRenderedComponentWithType(instance, NetworkGraph);
    const showCivilOnlyCheckBox = findRenderedDOMComponentWithClass(instance, 'test--show-civil-complaint-checkbox');
    networkGraph.state.showCivilComplaintOnly.should.be.true();

    Simulate.change(showCivilOnlyCheckBox, { target: { checked: false } });
    networkGraph.state.showCivilComplaintOnly.should.be.false();
  });

  it('should update value when click on coaccusals threshold slider', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph officerIds='123,456,789'/>
      </Provider>
    );

    const networkGraph = findRenderedComponentWithType(instance, NetworkGraph);
    networkGraph.state.thresholdValue.should.equal(2);

    const coaccusalsThresholdSlider = findRenderedComponentWithType(instance, Slider);
    coaccusalsThresholdSlider.props.onChange(3);
    networkGraph.state.thresholdValue.should.equal(3);
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
        complaintPercentile: 95,
        lastPercentile: {
          year: 2017,
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 82 },
            { axis: 'Civilian Allegations', value: 97 },

          ],
          visualTokenBackground: '#f52524',
          textColor: '#DFDFDF',
        }
      },
    };
    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph selectedOfficerId={ 123 } networkPreviewPaneData={ networkPreviewPaneData }/>
      </Provider>
    );
    scryRenderedComponentsWithType(instance, OfficerPane).should.have.length(1);
    scryRenderedComponentsWithType(instance, RightPaneSection).should.have.length(0);
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
            kind: 'YEAR'
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
                url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html'
              }
            ],
            timelineIdx: 1,
          },
        ],
        info: {
          sourceOfficerName: 'Jerome Finnigan',
          targetOfficerName: 'Edward May',
          coaccusedCount: 6,
        }
      },
    };
    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph selectedOfficerId={ 123 } networkPreviewPaneData={ networkPreviewPaneData }/>
      </Provider>
    );
    scryRenderedComponentsWithType(instance, EdgeCoaccusalsPane).should.have.length(1);
    scryRenderedComponentsWithType(instance, RightPaneSection).should.have.length(0);
  });

  it('should call updateSelectedOfficerId when clicking outside and there is selectedOfficerId', function () {
    const updateSelectedOfficerIdStub = stub();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph updateSelectedOfficerId={ updateSelectedOfficerIdStub } selectedOfficerId={ 123 } />
      </Provider>
    );
    const networkGraph = findRenderedComponentWithType(instance, NetworkGraph);
    const leftSection = findRenderedDOMComponentWithClass(instance, 'left-section');
    networkGraph.handleClickOutside({ target: findDOMNode(leftSection) });
    updateSelectedOfficerIdStub.should.be.calledWith(null);
  });

  it('should call updateSelectedEdge when clicking outside and there is selectedEdge', function () {
    const updateSelectedEdgeStub = stub();
    const selectedEdge = {
      sourceOfficerName: 'Jerome Finnigan',
      targetOfficerName: 'Edward May',
      coaccusedCount: 10,
    };
    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph updateSelectedEdge={ updateSelectedEdgeStub } selectedEdge={ selectedEdge } />
      </Provider>
    );
    const networkGraph = findRenderedComponentWithType(instance, NetworkGraph);
    const leftSection = findRenderedDOMComponentWithClass(instance, 'left-section');
    networkGraph.handleClickOutside({ target: findDOMNode(leftSection) });
    updateSelectedEdgeStub.should.be.calledWith(null);
  });

  it('should not call updateSelectedOfficerId when clicking on preview-pane', function () {
    const updateSelectedOfficerIdStub = stub();
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
        complaintPercentile: 95,
        lastPercentile: {
          year: 2017,
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 82 },
            { axis: 'Civilian Allegations', value: 97 },

          ],
          visualTokenBackground: '#f52524',
          textColor: '#DFDFDF',
        }
      },
    };
    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph
          updateSelectedOfficerId={ updateSelectedOfficerIdStub }
          selectedOfficerId={ 123 }
          networkPreviewPaneData={ networkPreviewPaneData }
        />
      </Provider>
    );
    const networkGraph = findRenderedComponentWithType(instance, NetworkGraph);
    const officerPane = findRenderedComponentWithType(instance, OfficerPane);
    networkGraph.handleClickOutside({ target: findDOMNode(officerPane) });
    updateSelectedOfficerIdStub.should.not.be.called();
  });

  it('should update sortedOfficerIds state when calling updateSortedOfficerIds', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <NetworkGraph unitId='232'/>
      </Provider>
    );

    const networkGraph = findRenderedComponentWithType(instance, NetworkGraph);
    networkGraph.state.sortedOfficerIds.should.eql([]);
    networkGraph.updateSortedOfficerIds([123, 456, 789]);
    networkGraph.state.sortedOfficerIds.should.eql([123, 456, 789]);
  });
});
