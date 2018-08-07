import React, { Component, PropTypes } from 'react';

import {
  containerStyle, explainerContainerStyle, radarContainerStyle, subTextStyle, titleTextStyle, textStyle
} from './triangle-explainer.style';
import StaticRadarChart from 'components/common/radar-chart';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import { sugarCaneColor, whiteTwoColor } from 'utils/styles';


export default class TriangleExplainer extends Component {
  render() {
    const { radarChartData, editWrapperStateProps } = this.props;
    const radarConfig = {
      backgroundColor: sugarCaneColor,
      showGrid: true,
      gridColor: whiteTwoColor,
      showSpineLine: false,
    };

    return (
      <div style={ containerStyle } className='test--triangle-explainer'>
        <div style={ radarContainerStyle }>
          <StaticRadarChart { ...radarConfig } data={ radarChartData }/>
        </div>
        <div style={ explainerContainerStyle }>
          <h5 style={ titleTextStyle }>What is this triangle?</h5>
          <EditWrapperStateProvider { ...editWrapperStateProps }>
            <HoverableEditWrapper>
              <RichTextEditable
                style={ textStyle }
                className='test--triangle-explain-text'
                placeholder='triangle explain text'
                fieldname='triangle_description'
              />
              <RichTextEditable
                style={ subTextStyle }
                className='test--triangle-explain-sub-text'
                placeholder='triangle explain sub text'
                fieldname='triangle_sub_description'
              />
            </HoverableEditWrapper>
          </EditWrapperStateProvider>
        </div>
      </div>
    );
  }
}

TriangleExplainer.propTypes = {
  radarChartData: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string,
      value: PropTypes.number
    })
  ),
  editWrapperStateProps: PropTypes.object
};
