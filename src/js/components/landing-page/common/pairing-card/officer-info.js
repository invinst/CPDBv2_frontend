import React, { PropTypes } from 'react';

import style from './officer-info.sass';


function OfficerInfo(props) {
  const { info, rightOfficer } = props;
  const { fullName, age, race, gender, rank } = info;

  return (
    <div
      className={ `${style.officerInfo} ${rightOfficer ? 'right-officer': 'left-officer'}` }
      onClick={ this.handleClick }
    >
      <div className='officer-info-upper'>
        <div className='officer-info-text'>{ rank }</div>
        <div className='officer-info-name'>{ fullName }</div>
      </div>
      <div className='officer-info-row-divider'/>
      <div className='officer-info-personal-info'>
        { age }-year-old { race } { gender }
      </div>
    </div>
  );
}

OfficerInfo.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    fullName: PropTypes.string,
    birthYear: PropTypes.number,
    age: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    gender: PropTypes.string,
    rank: PropTypes.string,
  }),
  rightOfficer: PropTypes.bool,
};

OfficerInfo.defaultProps = {
  rightOfficer: false,
};

export default OfficerInfo;
