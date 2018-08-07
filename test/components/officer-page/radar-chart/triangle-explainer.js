import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import TriangleExplainer from 'components/officer-page/radar-chart/explainer/triangle-explainer';
import StaticRadarChart from 'components/common/radar-chart';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import { RawContentStateFactory } from 'utils/test/factories/draft';


describe('TriangleExplainer components', function () {
  let instance;
  const radarChartData = [
    {
      axis: 'axis 1',
      value: 99,
    },
    {
      axis: 'axis 2',
      value: 98,
    },
    {
      axis: 'axis 3',
      value: 97,
    },
  ];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render radar chart', function () {
    instance = renderIntoDocument(<TriangleExplainer radarChartData={ radarChartData }/>);
    const radarChart = findRenderedComponentWithType(instance, StaticRadarChart);

    radarChart.props.data.should.eql(radarChartData);
  });

  it('should render editable content', function () {
    const editWrapperStateProps = {
      fields: {
        'triangle_description': {
          type: 'rich_text',
          name: 'triangle_description',
          value: RawContentStateFactory.build({}, { blockTexts: ['triangle description'] })
        },
        'triangle_sub_description': {
          type: 'rich_text',
          name: 'triangle_sub_description',
          value: RawContentStateFactory.build({}, { blockTexts: ['triangle sub description'] })
        }
      },
      sectionEditModeOn: true,
      onSaveForm: spy(),
      turnOnSectionEditMode: spy(),
      turnOffSectionEditMode: spy()
    };

    instance = renderIntoDocument(
      <TriangleExplainer
        radarChartData={ radarChartData }
        editWrapperStateProps={ editWrapperStateProps }
      />
    );

    const editWrapperStateProvider = findRenderedComponentWithType(instance, EditWrapperStateProvider);
    const hoverableEditWrapper = findRenderedComponentWithType(editWrapperStateProvider, HoverableEditWrapper);
    const richTextEditables = scryRenderedComponentsWithType(hoverableEditWrapper, RichTextEditable);

    richTextEditables.should.have.length(2);
    const triangleDescription = richTextEditables[0];
    const triangleSubDescription = richTextEditables[1];
    triangleDescription.props.fieldname.should.equal('triangle_description');
    triangleSubDescription.props.fieldname.should.equal('triangle_sub_description');

    findDOMNode(triangleDescription).textContent.should.equal('triangle description');
    findDOMNode(triangleSubDescription).textContent.should.equal('triangle sub description');
  });
});
