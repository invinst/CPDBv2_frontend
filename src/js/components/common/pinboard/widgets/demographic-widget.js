import React from 'react';
import * as PropTypes from 'prop-types';

import withLoadingSpinner from 'components/common/with-loading-spinner';
import DemographicChart from './demographic-chart';
import styles from './demographic-widget.sass';
import widgetStyles from './widget.sass';


const DemographicWidget = ({ demographicData }) => (
  <div className={ styles.demographicWidget }>
    <div className='demographic-header'>RACE</div>
    <DemographicChart demographicData={ demographicData['race'] } />
    <div className='demographic-header'>GENDER</div>
    <DemographicChart demographicData={ demographicData['gender'] } />
  </div>
);

DemographicWidget.propTypes = {
  demographicData: PropTypes.object,
};

DemographicWidget.defaultProps = {
  demographicData: {},
};

export const DemographicWidgetWithSpinner = withLoadingSpinner(DemographicWidget, widgetStyles.widgetSpinner);
export default DemographicWidget;
