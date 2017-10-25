import { mediumGrayColor, hardBlackColor, brightOrangeTwoColor } from 'utils/styles';


export const entryStyle = {
  paddingTop: '7px',
  paddingBottom: '7px',
  boxSizing: 'border-box',
  height: '32px',
  letterSpacing: 'normal',
  fontWeight: 400
};

export const countStyle = {
  color: hardBlackColor,
  display: 'inline-block',
  width: '26px',
  textAlign: 'right',
  marginRight: '16px'
};

export const sustainedCountStyle = sustainedCount => ({
  ...countStyle,
  color: brightOrangeTwoColor,
  opacity: sustainedCount === 0 ? 0.36 : 1,
});

export const nameStyle = {
  textDecoration: 'none',
  width: '221px',
  color: mediumGrayColor,
  fontWeight: 300,
  display: 'inline-block'
};
