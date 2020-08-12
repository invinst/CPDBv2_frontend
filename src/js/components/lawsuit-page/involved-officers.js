import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import style from './involved-officers.sass';
import InvolvedOfficerCard from './involved-officer-card';


export default class InvolvedOfficers extends Component {
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
    const { officers, addOrRemoveItemInPinboard } = this.props;
    const { expanded } = this.state;
    return (
      <div className={ cx(style.involvedOfficers, { 'expanded': expanded }) }>
        {
          officers.map((officer) => (
            <InvolvedOfficerCard
              key={ officer.officerId }
              officer={ officer }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
            />
          ))
        }
        {
          !expanded
            ? (
              <div className='show-more-button-container no-print'>
                <span onClick={ this.handleExpandList } className='show-more-button'>
                  Show ALL Involved Officers (Defendants)
                </span>
              </div>
            )
            : null
        }
      </div>
    );
  }
}

InvolvedOfficers.propTypes = {
  officers: PropTypes.array,
  addOrRemoveItemInPinboard: PropTypes.func,
};

InvolvedOfficers.defaultProps = {
  officers: [],
};
