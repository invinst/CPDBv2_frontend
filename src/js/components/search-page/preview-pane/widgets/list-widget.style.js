import { clayGray, altoColor, whiteTwoColor, accentColor } from 'utils/styles';


export const containerStyle = {
  padding: '18px 16px 8px 16px',
  backgroundColor: 'white',
  border: `1px solid ${altoColor}`,
  borderRadius: '2px',
  margin: '8px 0',
  boxSizing: 'border-box',
};

export const headerStyle = {
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '18px',
  margin: '0 0 6px',
  textTransform: 'uppercase',
};

export const listStyle = {
  padding: 0,
  margin: 0,
};

export const listItemStyle = (lastItem = false) => ({
  padding: '12px 0px',
  borderBottom: lastItem ? 'none' : `1px solid ${whiteTwoColor}`,
  listStyleType: 'none',
  boxSizing: 'border-box',
});

export const listItemFirstStyle = {
  marginRight: '12px',
  height: '32px',
  float: 'left',
};

export const itemNameStyle = {
  margin: 0
};

export const itemCountStyle = {
  color: clayGray,
  margin: '1px 0 0',
};

export const chartWrapperStyle = {
  verticalAlign: 'middle',
  display: 'inline-block',
  width: '38px',
  height: '38px',
  borderRadius: '2px',
  overflow: 'hidden'
};

export const linkStyle = {
  hover: {
    textDecoration: 'none',
    color: accentColor
  },
  base: {
    textDecoration: 'none',
    color: 'inherit',
  }
};
