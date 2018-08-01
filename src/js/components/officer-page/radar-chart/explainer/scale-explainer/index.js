import React, { Component, PropTypes } from 'react';

import StaticRadarChart from 'components/common/radar-chart';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import {
  containerStyle, explainerContainerStyle, radarContainerStyle, subTextStyle, titleTextStyle, textStyle, legendStyle
} from './scale-explainer.style';
import { sugarCaneColor, whiteTwoColor } from 'utils/styles';


export default class ScaleExplainer extends Component {
  render() {
    const { radarChartData, year, editWrapperStateProps } = this.props;
    const radarConfig = {
      showValueInsteadOfTitle: true,
      backgroundColor: sugarCaneColor,
      showGrid: true,
      gridColor: whiteTwoColor,
      showSpineLine: false,
      showAxisValue: true,
      axisTitleFontSize: 28,
      axisTitleFontWeight: 500,
    };

    return (
      <div style={ containerStyle } className='test--scale-explainer'>
        <div style={ radarContainerStyle }>
          <StaticRadarChart
            { ...radarConfig }
            data={ radarChartData }
          />
          <div style={ legendStyle }>{ year }</div>
        </div>
        <div style={ explainerContainerStyle }>
          <h5 style={ titleTextStyle }>What is the scale?</h5>
          <EditWrapperStateProvider { ...editWrapperStateProps }>
            <HoverableEditWrapper>
              <RichTextEditable
                style={ textStyle }
                className='test--scale-explain-text'
                placeholder='scale explain text'
                fieldname='scale_description'
              />
              <RichTextEditable
                style={ subTextStyle }
                className='test--scale-explain-sub-text'
                placeholder='scale explain sub text'
                fieldname='scale_sub_description'
              />
            </HoverableEditWrapper>
          </EditWrapperStateProvider>
        </div>
      </div>
    );
  }
}

ScaleExplainer.propTypes = {
  radarChartData: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string,
      value: PropTypes.number
    })
  ),
  year: PropTypes.number,
  editWrapperStateProps: PropTypes.object
};
