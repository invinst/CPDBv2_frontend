import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import ScaleExplainer from 'components/officer-page/radar-chart/explainer/scale-explainer';
import StaticRadarChart from 'components/common/radar-chart';
import { RawContentStateFactory } from 'utils/test/factories/draft';


describe('ScaleExplainer components', function () {
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

  it('should render radar chart with legend', function () {
    instance = renderIntoDocument(
      <ScaleExplainer radarChartData={ radarChartData } year={ 2016 }/>
    );
    const radarChart = findRenderedComponentWithType(instance, StaticRadarChart);

    radarChart.props.data.should.eql(radarChartData);
    findDOMNode(instance).textContent.should.containEql('2016');
  });

  it('should render editable content', function () {
    const editWrapperStateProps = {
      fields: {
        'scale_description': {
          type: 'rich_text',
          name: 'scale_description',
          value: RawContentStateFactory.build({}, { blockTexts: ['scale description'] })
        },
        'scale_sub_description': {
          type: 'rich_text',
          name: 'scale_sub_description',
          value: RawContentStateFactory.build({}, { blockTexts: ['scale sub description'] })
        }
      },
      sectionEditModeOn: true,
      onSaveForm: spy(),
      turnOnSectionEditMode: spy(),
      turnOffSectionEditMode: spy()
    };

    instance = renderIntoDocument(
      <ScaleExplainer
        radarChartData={ radarChartData }
        year={ 2016 }
        editWrapperStateProps={ editWrapperStateProps }
      />
    );

    const editWrapperStateProvider = findRenderedComponentWithType(instance, EditWrapperStateProvider);
    const hoverableEditWrapper = findRenderedComponentWithType(editWrapperStateProvider, HoverableEditWrapper);
    const richTextEditables = scryRenderedComponentsWithType(hoverableEditWrapper, RichTextEditable);

    richTextEditables.should.have.length(2);
    const scaleDescription = richTextEditables[0];
    const scaleSubDescription = richTextEditables[1];
    scaleDescription.props.fieldname.should.equal('scale_description');
    scaleSubDescription.props.fieldname.should.equal('scale_sub_description');

    findDOMNode(scaleDescription).textContent.should.equal('scale description');
    findDOMNode(scaleSubDescription).textContent.should.equal('scale sub description');
  });
});
