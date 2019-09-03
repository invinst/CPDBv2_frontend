import React, { Component, PropTypes } from 'react';

import StaticRadarChart from 'components/common/radar-chart';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import { sugarCaneColor, whiteTwoColor } from 'utils/styles';
import styles from './triangle-explainer.sass';


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
      <div className={ styles.triangleExplainer }>
        <div className='radar-container'>
          <StaticRadarChart { ...radarConfig } data={ radarChartData }/>
        </div>
        <div className='explainer-container'>
          <h5 className='title-text'>What is this triangle?</h5>
          <EditWrapperStateProvider { ...editWrapperStateProps }>
            <HoverableEditWrapper>
              <RichTextEditable
                className={ styles.triangleExplainerText }
                placeholder='triangle explain text'
                fieldname='triangle_description'
              />
              <RichTextEditable
                className={ styles.triangleExplainerSubtext }
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
      value: PropTypes.number,
    })
  ),
  editWrapperStateProps: PropTypes.object,
};
