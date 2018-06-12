import { whiteTwoColor, softBlackColor, clayGray } from 'utils/styles';


export const wrapperStyle = {
  width: '100%',
  borderRadius: '2px',
  border: `solid 1px ${whiteTwoColor}`,
  minHeight: '200px',
  padding: '0 16px',
  backgroundColor: 'white',
  boxSizing: 'border-box',
};

export const listWrapperStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

export const officerNameStyle = {
  display: 'inline-block',
  fontSize: '14px',
  color: softBlackColor,
  marginLeft: '8px',
  verticalAlign: 'middle',
};

export const fullRowStyle = {
  padding: '7px 0',
  borderBottom: `1px solid ${whiteTwoColor}`
};

export const visualTokenStyle = {
  borderRadius: '2px',
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '38px',
  height: '38px',
  padding: '1px 0',
  overflow: 'hidden',
};

export const rankStyle = {
  fontSize: '12px',
  color: clayGray,
  lineHeight: 1.17,
  fontWeight: 300,
};

