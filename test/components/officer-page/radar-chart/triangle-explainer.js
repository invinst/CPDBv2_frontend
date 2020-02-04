import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import TriangleExplainer from 'components/officer-page/radar-chart/explainer/triangle-explainer';
import StaticRadarChart from 'components/common/radar-chart';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import { buildEditStateFields } from 'utils/test/factories/draft';


describe('TriangleExplainer components', function () {
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

  it('should render radar chart', function () {
    const wrapper = shallow(<TriangleExplainer radarChartData={ radarChartData }/>);
    const radarChart = wrapper.find(StaticRadarChart);

    radarChart.prop('data').should.eql(radarChartData);
  });

  it('should render editable content', function () {
    const editWrapperStateProps = {
      fields: buildEditStateFields({
        'triangle_description': ['triangle description'],
        'triangle_sub_description': ['triangle sub description'],
      }),
      sectionEditModeOn: true,
      onSaveForm: sinon.spy(),
      turnOnSectionEditMode: sinon.spy(),
      turnOffSectionEditMode: sinon.spy(),
    };

    const wrapper = mount(
      <TriangleExplainer
        radarChartData={ radarChartData }
        editWrapperStateProps={ editWrapperStateProps }
      />
    );

    const editWrapperStateProvider = wrapper.find(EditWrapperStateProvider);
    const hoverableEditWrapper = editWrapperStateProvider.find(HoverableEditWrapper);
    const richTextEditables = hoverableEditWrapper.find(RichTextEditable);

    richTextEditables.should.have.length(2);
    const triangleDescription = richTextEditables.at(0);
    const triangleSubDescription = richTextEditables.at(1);
    triangleDescription.prop('fieldname').should.equal('triangle_description');
    triangleSubDescription.prop('fieldname').should.equal('triangle_sub_description');

    triangleDescription.text().should.equal('triangle description');
    triangleSubDescription.text().should.equal('triangle sub description');
  });
});
