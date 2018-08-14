import { get } from 'lodash';

import { whiteTwoColor, accentColor } from 'utils/styles';


export const wrapperStyle = (hoverPart) => {
  const mappingToDirection = {
    'left': 'right',
    'right': 'left'
  };
  const direction = get(mappingToDirection, hoverPart, null);

  return {
    width: '464px',
    height: '266px',
    border: `solid 1px ${direction ? 'transparent' : whiteTwoColor}`,
    borderRadius: '2px',
    backgroundImage: `linear-gradient(white, white),
      linear-gradient(to ${direction}, ${accentColor}, ${whiteTwoColor})`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
  };
};

export const secondSectionStyle = {
  height: '112px',
  backgroundColor: 'white',
  boxSizing: 'border-box',
};

export const firstOfficerStyle = {
  textAlign: 'left',
  padding: '11px 16px'
};

export const secondOfficerStyle = {
  textAlign: 'right',
  padding: '11px 16px'
};
