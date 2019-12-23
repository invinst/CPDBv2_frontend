import React, { PropTypes } from 'react';

import { NewWidgetWrapper, ListWidget } from '../widgets';
import styles from './trr-pane.sass';


export default function TRRPane(props) {
  const {
    category,
    incidentDate,
    address,
    officer,
    to,
  } = props;
  return (
    <NewWidgetWrapper callToAction={ { to, text: 'View Tactical Response Report' } }>
      <div className={ styles.trrPane }>
        <div className='trr-preview-pane-info-wrapper'>
          <div className='trr-preview-pane-title'>
            <div className='trr-preview-pane-title-title'>{ category }</div>
          </div>
          <div className='trr-preview-pane-info-row'>{ incidentDate }</div>
          <div className='trr-preview-pane-info-row'>{ address }</div>
        </div>
        {
          officer && <ListWidget
            typeName='allegation'
            title='OFFICER'
            showItemArrow={ false }
            items={ [officer] }
            wrapperClassName='trr-preview-pane-accused'
          />
        }
      </div>
    </NewWidgetWrapper>
  );
}

TRRPane.propTypes = {
  category: PropTypes.string,
  incidentDate: PropTypes.string,
  address: PropTypes.string,
  officer: PropTypes.object,
  to: PropTypes.string,
};
