import React from 'react';
import * as PropTypes from 'prop-types';

import withLoadingSpinner from 'components/common/with-loading-spinner';
import styles from './summary-widget.sass';
import widgetStyles from './widget.sass';


const SummaryWidget = ({ summaryItems }) => {
  return (
    <div className={ styles.summaryWidget }>
      <div className='summary-header'>
        <div className='header-title'>TYPE</div>
        <div>TOTAL</div>
      </div>
      <div className='summary-items-wrapper'>
        {
          summaryItems.map(({ title, count }, index) => (
            <div className='summary-item' key={ `summary-item-${index}` }>
              <div className='item-title'>{ title }</div>
              <div className='item-count'>{ count }</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

SummaryWidget.propTypes = {
  summaryItems: PropTypes.array,
};

SummaryWidget.defaultProps = {
  summaryItems: [],
};

export const SummaryWidgetWithSpinner = withLoadingSpinner(SummaryWidget, widgetStyles.widgetSpinner);
export default SummaryWidget;
