import { boulderColor, softBlackColor, whiteTwoColor } from 'utils/styles';


export const containerStyle = {
  padding: '20px 16px 18px',
  backgroundColor: 'white',
  position: 'relative',
  margin: '0 -8px 8px',
  boxShadow: `0 2px ${whiteTwoColor}`,
  boxSizing: 'border-box',
};

export const countStyle = {
  fontSize: '26px',
  lineHeight: '32px',
  margin: 0,
};

export const imgStyle = {
  width: '7.4px',
  height: '12px',
  position: 'absolute',
  top: '50%',
  right: '16px',
  transform: 'translateY(-50%)',
};

export const subTitleStyle = {
  color: boulderColor,
  fontSize: '14px',
  marginTop: '8px',
  marginBottom: 0,
};

export const linkStyle = {
  textDecoration: 'none',
  color: softBlackColor,
};
