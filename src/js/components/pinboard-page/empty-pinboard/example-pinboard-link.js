import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Truncate from 'react-truncate';

import styles from 'components/pinboard-page/empty-pinboard/example-pinboard-link.sass';


export default function ExamplePinboardLink(props) {
  const { id, title, description } = props;

  return (
    <Link to={ `/pinboard/${id}/` } className={ styles.examplePinboardLink }>
      <div className='wrapper'>
        <div className='title'>{ title }</div>
        <Truncate className='description' lines={ 3 }>{ description }</Truncate>
      </div>
      <div className='arrow' />
    </Link>
  );
}

ExamplePinboardLink.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
};
