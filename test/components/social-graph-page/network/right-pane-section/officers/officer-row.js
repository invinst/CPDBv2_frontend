import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerRow from 'components/social-graph-page/network/right-pane-section/officers/officer-row';
import StaticRadarChart from 'components/common/radar-chart';


describe('OfficerRow component', function () {
  const officer = {
    fullName: 'Jerome Finnigan',
    id: 123,
    percentile: {
      officerId: 123,
      year: 2007,
      items: [
        { axis: 'Use of Force Reports', value: 92.3 },
        { axis: 'Officer Allegations', value: 82 },
        { axis: 'Civilian Allegations', value: 97 }
      ],
      visualTokenBackground: '#f52524',
      textColor: '#DFDFDF'
    }
  };
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render officer correctly', function () {

    instance = renderIntoDocument(<OfficerRow officer={ officer }/>);
    const radarChart = scryRenderedComponentsWithType(instance, StaticRadarChart);
    const officerName = findRenderedDOMComponentWithClass(instance, 'officer-name');
    radarChart.should.have.length(1);
    officerName.textContent.should.eql('Jerome Finnigan');
  });

  it('should call updateOfficerId when clicking', function () {
    const updateOfficerIdStub = stub();
    instance = renderIntoDocument(
      <OfficerRow
        officer={ officer }
        updateOfficerId={ updateOfficerIdStub }
      />
    );

    const officerRow = findDOMNode(instance);
    Simulate.click(officerRow);
    updateOfficerIdStub.should.be.calledWith(123);
  });

  describe('shouldComponentUpdate', function () {
    it('should return true if officer is changed', function () {
      instance = renderIntoDocument(
        <OfficerRow
          officer={ officer }
        />
      );

      instance.shouldComponentUpdate({ officer: { fullName: 'Jane' } }).should.be.true();
    });

    it('should return false if officer is not changed', function () {
      instance = renderIntoDocument(
        <OfficerRow
          officer={ officer }
        />
      );

      instance.shouldComponentUpdate({ officer: officer }).should.be.false();
    });
  });

});
