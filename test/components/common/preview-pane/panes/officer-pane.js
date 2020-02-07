import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import browserHistory from 'utils/history';

import { OfficerPane as OfficerPane } from 'components/common/preview-pane/panes';
import {
  NewVisualTokenWidget as VisualTokenWidget,
  NewOfficerInfoWidget as OfficerInfoWidget,
  NewMetricWidget as MetricWidget,
} from 'components/common/preview-pane/widgets';


describe('OfficerPane component', () => {
  const officer = {
    id: 123456,
    fullName: 'John Watts',
    appointedDate: '05-08-2018',
    resignationDate: '05-12-2019',
    age: 28,
    unit: {
      id: 1,
      unitName: '001',
      description: 'Unit 001',
    },
    rank: 'Police Officer',
    badge: '012',
    race: 'black',
    gender: 'Male',
    complaintCount: 1,
    sustainedCount: 1,
    complaintPercentile: 10,
    disciplineCount: 0,
    trrCount: 5,
    trrPercentile: 78,
    civilianComplimentCount: 2,
    majorAwardCount: 1,
    honorableMentionCount: 3,
    honorableMentionPercentile: 99.3,
    to: 'some_url',
    lastPercentile: {
      items: [
        { axis: 'a', value: 10 },
        { axis: 'b', value: 20 },
        { axis: 'c', value: 30 },
      ],
      visualTokenBackground: '#ffffff',
    },
    isPinned: true,
  };

  it('should contain the sub components', () => {
    const wrapper = shallow(
      <OfficerPane
        { ...officer }
      />
    );

    const visualToken = wrapper.find(VisualTokenWidget);
    const officerInfo = wrapper.find(OfficerInfoWidget);
    const metric = wrapper.find(MetricWidget);

    visualToken.prop('items').should.eql([
      { axis: 'a', value: 10 },
      { axis: 'b', value: 20 },
      { axis: 'c', value: 30 },
    ]);
    visualToken.prop('visualTokenBackground').should.equal('#ffffff');

    officerInfo.prop('fullName').should.equal('John Watts');
    officerInfo.prop('appointedDate').should.equal('05-08-2018');
    officerInfo.prop('resignationDate').should.equal('05-12-2019');
    officerInfo.prop('age').should.equal(28);
    officerInfo.prop('unit').should.eql({
      id: 1,
      unitName: '001',
      description: 'Unit 001',
    });
    officerInfo.prop('rank').should.equal('Police Officer');
    officerInfo.prop('badge').should.equal('012');
    officerInfo.prop('race').should.equal('black');
    officerInfo.prop('gender').should.equal('Male');

    metric.prop('metrics').should.containEql({
      name: 'Allegations',
      value: 1,
      description: 'More than 10% of other officers',
    });
    metric.prop('metrics').should.containEql({
      name: 'Sustained',
      value: 1,
      isHighlight: true,
      description: '0 Disciplined',
    });
    metric.prop('metrics').should.containEql({
      name: 'Use of Force Reports',
      value: 5,
      description: 'More than 78% of other officers',
    });
    metric.prop('metrics').should.containEql({
      name: 'Major Awards',
      value: 1,
    });
    metric.prop('metrics').should.containEql({
      name: 'Honorable Mentions',
      value: 3,
      description: 'More than 99.3% of other officers',
    });
    metric.render().text().should.containEql('2CivilianCompliments');
  });

  it('should hide percentile description if its value is zero', function () {
    const wrapper = shallow(
      <OfficerPane
        { ...officer }
        complaintPercentile={ 0 }
        honorableMentionPercentile={ 0 }
        trrPercentile={ 0 }
      />
    );

    const metric = wrapper.find(MetricWidget);

    metric.prop('metrics').should.containEql({
      name: 'Allegations',
      value: 1,
      description: '',
    });
    metric.prop('metrics').should.containEql({
      name: 'Honorable Mentions',
      value: 3,
      description: '',
    });
    metric.prop('metrics').should.containEql({
      name: 'Honorable Mentions',
      value: 3,
      description: '',
    });
  });

  it('should hide percentile description if its value is null', function () {
    const wrapper = shallow(
      <OfficerPane
        { ...officer }
        complaintPercentile={ null }
        honorableMentionPercentile={ null }
        trrPercentile={ null }
      />
    );

    const metric = wrapper.find(MetricWidget);

    metric.prop('metrics').should.containEql({
      name: 'Allegations',
      value: 1,
      description: '',
    });
    metric.prop('metrics').should.containEql({
      name: 'Honorable Mentions',
      value: 3,
      description: '',
    });
    metric.prop('metrics').should.containEql({
      name: 'Honorable Mentions',
      value: 3,
      description: '',
    });
  });

  it('should render pin and view officer profile buttons', function () {
    const wrapper = shallow(
      <OfficerPane
        { ...officer }
        complaintPercentile={ null }
        honorableMentionPercentile={ null }
        trrPercentile={ null }
      />
    );

    wrapper.find('.pin-button').exists().should.be.true();
    wrapper.find('.view-officer-profile-button').exists().should.be.true();
  });

  it('should not render pin button if not pinnable', function () {
    const wrapper = shallow(
      <OfficerPane
        { ...officer }
        complaintPercentile={ null }
        honorableMentionPercentile={ null }
        trrPercentile={ null }
        pinnable={ false }
      />
    );

    wrapper.find('.pin-button').exists().should.be.false();
    wrapper.find('.view-officer-profile-button').exists().should.be.true();
  });

  it('should add or remove item to/from pinboard when click on pin button', function () {
    const addOrRemoveItemInPinboardStub = sinon.stub();

    const wrapper = mount(
      <OfficerPane
        { ...officer }
        complaintPercentile={ null }
        honorableMentionPercentile={ null }
        trrPercentile={ null }
        type={ 'OFFICER' }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        isPinned={ false }
      />
    );

    let pinButton = wrapper.find('.pin-button').first();
    pinButton.simulate('click');

    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: 'OFFICER',
      id: 123456,
      isPinned: false,
      fullName: 'John Watts',
      complaintCount: 1,
      sustainedCount: 1,
      age: 28,
      race: 'black',
      rank: 'Police Officer',
      gender: 'Male',
    });

    wrapper.setProps({
      ...officer,
      complaintPercentile: null,
      honorableMentionPercentile: null,
      trrPercentile: null,
      type: 'OFFICER',
      addOrRemoveItemInPinboard:
      addOrRemoveItemInPinboardStub,
      isPinned: true,
    });

    pinButton = wrapper.find('.pin-button').first();
    pinButton.simulate('click');

    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: 'OFFICER',
      id: 123456,
      isPinned: true,
      fullName: 'John Watts',
      complaintCount: 1,
      sustainedCount: 1,
      age: 28,
      race: 'black',
      rank: 'Police Officer',
      gender: 'Male',
    });
  });

  it('should redirect to officer page when click on View officer profile button', function () {
    const browserHistoryPush = sinon.stub(browserHistory, 'push');

    const wrapper = shallow(
      <OfficerPane
        { ...officer }
        complaintPercentile={ null }
        honorableMentionPercentile={ null }
        trrPercentile={ null }
        type={ 'OFFICER' }
        isPinned={ false }
      />
    );

    const viewProfileButton = wrapper.find('.view-officer-profile-button');
    viewProfileButton.simulate('click');

    browserHistoryPush.should.be.calledWith('some_url');
  });
});
