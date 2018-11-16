import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import styles from './coaccused-card-footer.sass';


export default class CoaccusedCardFooter extends Component {
  render() {
    const { category, finding, disciplined, findingOutcomeMix } = this.props;
    return (
      <div className={ styles.coaccusedCardFooter }>
        <div className='accused-card-category'>{ category }</div>
        <div
          className={ cx('accused-card-outcome', { 'sustained': finding === 'Sustained', 'disciplined': disciplined }) }
        >
          <div className='finding-outcome-mix'>{ findingOutcomeMix }</div>
        </div>
      </div>
    );
  }
}

CoaccusedCardFooter.propTypes = {
  finding: PropTypes.string,
  disciplined: PropTypes.bool,
  category: PropTypes.string,
  findingOutcomeMix: PropTypes.string,
};
