import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './marker-tooltip.sass';


export default class MarkerTooltip extends Component {

  render() {
    const { kind, id, category, coaccused, victims } = this.props;
    return (
      <div className={ cx(styles.markerTooltip, 'test--marker-tooltip') }>
        <div className='marker-tooltip-row'>
          <div className='marker-tooltip-title'>
            { kind } { id }
          </div>
          <div className='marker-tooltip-category'>
            { category }
          </div>
        </div>
        {
          victims ? (
            <div>
              <div className='divider'/>
              <div className='marker-tooltip-row'>
                <div className='marker-tooltip-title'>
                  Victim
                </div>
                <div className={ cx('marker-tooltip-category', 'test--marker-tooltip-victims') }>
                  { victims.map((victim, index) => {
                    return (
                      <div className='test--marker-tooltip-victim' key={ index }>
                        <span>{ victim.race !== 'Unknown' ? victim.race + ' ' : null}</span>
                        <span>{ victim.gender + ' ' }</span>
                        <span>{ victim.age ? 'age ' + victim.age : null }</span>
                      </div>
                    );
                  }) }
                </div>
              </div>
            </div>
          ) : null
        }
        <div className='marker-tooltip-footer'>
          <div className='footer-text'>
            Accused with { coaccused } others
          </div>
        </div>
      </div>
    );
  }
}

MarkerTooltip.propTypes = {
  kind: PropTypes.string,
  id: PropTypes.string,
  category: PropTypes.string,
  coaccused: PropTypes.number,
  victims: PropTypes.arrayOf(
    PropTypes.shape({
      gender: PropTypes.string,
      race: PropTypes.string,
      age: PropTypes.number,
    })
  )
};
