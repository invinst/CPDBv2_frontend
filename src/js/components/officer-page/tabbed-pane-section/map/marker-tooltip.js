import React, { Component, PropTypes } from 'react';

import {
  contentStyle,
  dividerStyle,
  footerStyle,
  footerTextStyle,
  rowStyle,
  titleStyle,
  wrapperStyle
} from './marker-tooltip.style';


export default class MarkerTooltip extends Component {

  render() {
    const { kind, id, category, coaccused, victims } = this.props;
    return (
      <div style={ wrapperStyle } className='test--marker-tooltip'>
        <div style={ rowStyle }>
          <div className='test--marker-tooltip-kind-id' style={ titleStyle }>
            { kind } { id }
          </div>
          <div className='test--marker-tooltip-category' style={ contentStyle }>
            { category }
          </div>
        </div>
        {
          victims ? (
            <div>
              <div style={ dividerStyle } />
              <div style={ rowStyle }>
                <div style={ titleStyle }>
                  Victim
                </div>
                <div className='test--marker-tooltip-victims' style={ contentStyle }>
                  { victims.map((victim, index) => {
                    return (
                      <div className='test--marker-tooltip-victim' key={ index }>
                        { victim.race !== 'Unknown' ? victim.race : null}
                        { victim.gender }
                        { victim.age ? 'age ' + victim.age : null }
                      </div>
                    );
                  }) }
                </div>
              </div>
            </div>
          ) : null
        }
        <div className='test--marker-tooltip-coaccused' style={ footerStyle }>
          <div style={ footerTextStyle }>
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
