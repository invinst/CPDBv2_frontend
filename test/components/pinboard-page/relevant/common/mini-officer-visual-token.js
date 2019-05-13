import React from 'react';
import should from 'should';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import { OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT } from 'utils/constants';
import MiniVisualToken from 'components/pinboard-page/relevant/common/mini-officer-visual-token';
import StaticRadarChart from 'components/common/radar-chart';


describe('MiniVisualToken component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content', function () {
    const percentile = {
      officerId: 1,
      year: 2015,
      items: [
        { axis: 'Use of Force Reports', value: 20.6, },
        { axis: 'Officer Allegations', value: 10.1, },
        { axis: 'Civilian Allegations', value: 52.5, },
      ],
      visualTokenBackground: '#ed7467',
      textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
    };
    instance = renderIntoDocument(
      <MiniVisualToken
        className='custom-class-name'
        percentile={ percentile }
      />
    );
    findDOMNode(instance).getAttribute('class').should.containEql('custom-class-name');

    const radarChart = findRenderedComponentWithType(instance, StaticRadarChart);
    radarChart.props.hideAxisText.should.be.true();
    radarChart.props.showGrid.should.be.false();
    radarChart.props.showSpineLine.should.be.false();
    radarChart.props.backgroundColor.should.eql('#ed7467');
    radarChart.props.data.should.eql([
      { axis: 'Use of Force Reports', value: 20.6, },
      { axis: 'Officer Allegations', value: 10.1, },
      { axis: 'Civilian Allegations', value: 52.5, },
    ]);
    radarChart.props.width.should.eql(22);
    radarChart.props.height.should.eql(22);
    radarChart.props.radius.should.eql(10);
    radarChart.props.offsetTop.should.eql(2);
  });

  it('should render handle missing data', function () {
    instance = renderIntoDocument(<MiniVisualToken/>);

    const radarChart = findRenderedComponentWithType(instance, StaticRadarChart);
    radarChart.props.hideAxisText.should.be.true();
    radarChart.props.showGrid.should.be.false();
    radarChart.props.showSpineLine.should.be.false();
    should(radarChart.props.backgroundColor).be.undefined();
    should(radarChart.props.data).be.undefined();
    radarChart.props.width.should.eql(22);
    radarChart.props.height.should.eql(22);
    radarChart.props.radius.should.eql(10);
    radarChart.props.offsetTop.should.eql(2);
  });
});
