import PropTypes from 'prop-types';
import React, { Component } from 'react';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import marked from 'marked';

import { ELLIPSIS_CONFIG } from 'utils/constants';
import styles from 'components/pinboard-page/empty-pinboard/example-pinboard-link.sass';


export default class ExamplePinboardLink extends Component {
  handleClick = () => {
    const { id, currentPinboardId, updatePinboardFromSource } = this.props;
    updatePinboardFromSource(currentPinboardId, id);
  };

  render() {
    const { title, description } = this.props;

    return (
      <a onClick={ this.handleClick } className={ styles.examplePinboardLink }>
        <div className='wrapper'>
          <div className='title'>{ title }</div>
          <HTMLEllipsis
            { ...ELLIPSIS_CONFIG }
            className='description'
            unsafeHTML={ marked(description) }
          />
        </div>
        <div className='arrow'/>
      </a>
    );
  }
}

ExamplePinboardLink.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  currentPinboardId: PropTypes.string,
  updatePinboardFromSource: PropTypes.func,
};

ExamplePinboardLink.defaultProps = {
  description: '',
};
