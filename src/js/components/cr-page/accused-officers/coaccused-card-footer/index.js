import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { join, compact } from 'lodash';

import styles from './coaccused-card-footer.sass';


export default class CoaccusedCardFooter extends Component {
  render() {
    const { category, finding, disciplined, findingOutcomeMix } = this.props;
    const { isPrinting } = this.context;
    const outcomeDisciplined = isPrinting && disciplined ? 'Disciplined' : null;
    return (
      <div className={ styles.coaccusedCardFooter }>
        <div className='accused-card-category'>{ category }</div>
        <div
          className={ cx('accused-card-outcome', { 'sustained': finding === 'Sustained', 'disciplined': disciplined }) }
        >
          <div className='finding-outcome-mix'>{ join(compact([findingOutcomeMix, outcomeDisciplined]), ', ') }</div>
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

CoaccusedCardFooter.contextTypes = {
  isPrinting: PropTypes.bool,
};
