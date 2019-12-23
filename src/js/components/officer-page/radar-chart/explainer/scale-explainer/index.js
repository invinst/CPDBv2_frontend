import React, { PropTypes } from 'react';

import StaticRadarChart from 'components/common/radar-chart';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import { sugarCaneColor, whiteTwoColor } from 'utils/styles';
import styles from './scale-explainer.sass';


export default function ScaleExplainer(props) {
  const { radarChartData, year, editWrapperStateProps } = props;
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
    <div className={ styles.scaleExplainer }>
      <div className='radar-container'>
        <StaticRadarChart
          { ...radarConfig }
          data={ radarChartData }
        />
        <div className='scale-explainer-legend'>{ year }</div>
      </div>
      <div className='explainer-container'>
        <h5 className='title-text'>What is the scale?</h5>
        <EditWrapperStateProvider { ...editWrapperStateProps }>
          <HoverableEditWrapper>
            <RichTextEditable
              className={ styles.scaleExplainerText }
              placeholder='scale explain text'
              fieldname='scale_description'
            />
            <RichTextEditable
              className={ styles.scaleExplainerSubtext }
              placeholder='scale explain sub text'
              fieldname='scale_sub_description'
            />
          </HoverableEditWrapper>
        </EditWrapperStateProvider>
      </div>
    </div>
  );
}

ScaleExplainer.propTypes = {
  radarChartData: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string,
      value: PropTypes.number,
    })
  ),
  year: PropTypes.number,
  editWrapperStateProps: PropTypes.object,
};
