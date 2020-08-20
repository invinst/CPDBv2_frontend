import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import style from './summary.sass';


export default class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  handleExpandList = () => {
    this.setState({
      expanded: true,
    });
  };

  render() {
    const { summary, className } = this.props;
    const { expanded } = this.state;
    return (
      <div className={ cx(style.summary, className, { 'expanded': expanded }) }>
        <div className='summary-title'>Summary</div>
        <div className='summary-text'>{ summary }</div>
        {
          !expanded
            ? (
              <div className='show-more-button-container no-print'>
                <span onClick={ this.handleExpandList } className='show-more-button'>
                  Show full summary
                </span>
              </div>
            )
            : null
        }
      </div>
    );
  }
}

Summary.propTypes = {
  summary: PropTypes.string,
  className: PropTypes.string,
};
