import { hawkesBlue, accentColor } from 'utils/styles';


export const containerStyle = {
  borderRadius: '2px',
  backgroundColor: hawkesBlue,
  color: accentColor,
  padding: '0px 16px',
  height: '40px',
};

export const textStyle = {
  lineHeight: '40px',
  fontSize: '14px',
};

export const buttonStyle = {
  borderRadius: '2px',
  color: accentColor,
  border: `1px solid ${ accentColor }`,
  height: '26px',
  width: '51px',
  textAlign: 'center',
  lineHeight: '26px',
  display: 'inline-block',
  float: 'right',
  marginTop: '6px',
};

export const linkStyle = {
  textDecoration: 'none',
};
