import { accentColor, hawkesBlue } from 'utils/styles';

export const linkStyle = {
  display: 'block',
  borderRadius: '2px',
  backgroundColor: hawkesBlue,
  color: accentColor,
  margin: '0px 16px',
  padding: '0px 16px',
  height: '40px',
  textDecoration: 'none'
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
  fontSize: '14px'
};
