import PropTypes from 'prop-types';
import React from 'react';

import Attachment from '../attachment';
import Heading from './heading';
import styles from './lawsuit.sass';


export default function Lawsuit(props) {
  const { lawsuit, onTrackingAttachment, pathname } = props;
  return (
    <div className={ styles.lawsuit }>
      <Heading lawsuit={ lawsuit } />
      <div>
        {
          lawsuit.attachments.map((attachment, index) =>
            <Attachment
              attachment={ attachment }
              key={ index }
              onTrackingAttachment={ onTrackingAttachment }
              pathname={ pathname }
            />
          )
        }
      </div>
    </div>
  );
}

Lawsuit.propTypes = {
  lawsuit: PropTypes.object,
  onTrackingAttachment: PropTypes.func,
  pathname: PropTypes.string,
};
