import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import ScaleExplainer from 'components/officer-page/radar-chart/explainer/scale-explainer';
import StaticRadarChart from 'components/common/radar-chart';
import { buildEditStateFields } from 'utils/test/factories/draft';


describe('ScaleExplainer components', function () {
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
  ];it('should render radar chart with legend', function () {
    const wrapper = shallow(
      <ScaleExplainer radarChartData={ radarChartData } year={ 2016 }/>
    );
    const radarChart = wrapper.find(StaticRadarChart);

    radarChart.prop('data').should.eql(radarChartData);
    wrapper.text().should.containEql('2016');
  });

  it('should render editable content', function () {
    const editWrapperStateProps = {
      fields: buildEditStateFields({
        'scale_description': ['scale description'],
        'scale_sub_description': ['scale sub description'],
      }),
      sectionEditModeOn: true,
      onSaveForm: spy(),
      turnOnSectionEditMode: spy(),
      turnOffSectionEditMode: spy(),
    };

    const wrapper = mount(
      <ScaleExplainer
        radarChartData={ radarChartData }
        year={ 2016 }
        editWrapperStateProps={ editWrapperStateProps }
      />
    );

    const editWrapperStateProvider = wrapper.find(EditWrapperStateProvider);
    const hoverableEditWrapper = editWrapperStateProvider.find(HoverableEditWrapper);
    const richTextEditables = hoverableEditWrapper.find(RichTextEditable);

    richTextEditables.should.have.length(2);
    const scaleDescription = richTextEditables.at(0);
    const scaleSubDescription = richTextEditables.at(1);
    scaleDescription.prop('fieldname').should.equal('scale_description');
    scaleSubDescription.prop('fieldname').should.equal('scale_sub_description');

    scaleDescription.text().should.equal('scale description');
    scaleSubDescription.text().should.equal('scale sub description');
  });
});
