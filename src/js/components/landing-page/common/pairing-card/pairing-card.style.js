import { whiteTwoColor, accentColor } from 'utils/styles';


export const wrapperStyle = (direction) => ({
  width: '464px',
  height: '266px',
  border: `solid 1px ${direction ? 'transparent' : whiteTwoColor}`,
  borderRadius: '2px',
  backgroundImage: `linear-gradient(white, white), linear-gradient(to ${direction}, ${accentColor}, ${whiteTwoColor})`,
  backgroundOrigin: 'border-box',
  backgroundClip: 'content-box, border-box',
});

export const secondSectionStyle = {
  height: '112px',
  backgroundColor: 'white',
  padding: '11px 16px',
  boxSizing: 'border-box',
};

export const firstOfficerStyle = {
  textAlign: 'left',
  marginRight: '32px',
};

export const secondOfficerStyle = {
  textAlign: 'right',
};
