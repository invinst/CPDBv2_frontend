import { lightBlackColor, clayGray, greyishColor, accentColor, sidebarWidth } from 'utils/styles';


export const wrapperStyle = {
  display: 'inline-block',
  width: `${sidebarWidth}px`,
  height: '100%',
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  background: 'white',
  boxShadow: `0 1px 2px 0 ${lightBlackColor}`,
  padding: '18px 16px',
  boxSizing: 'border-box',
  verticalAlign: 'top'
};

export const leftButtonStyle = {
  float: 'left'
};

export const rightButtonStyle = {
  float: 'right'
};

export const headingStyle = {
  color: clayGray,
  fontSize: '14px',
  marginBottom: '11px',
  display: 'block',
  fontWeight: 300
};

export const filterBlockStyle = {
  backgroundColor: 'rgba(0, 94, 244, 0.1)',
  height: '40px',
  borderRadius: '2px',
  display: 'inline-block',
  marginRight: '5px',
  paddingRight: '8px',
  paddingBottom: '2px',
  minWidth: '95px'
};

export const xContainerStyle = {
  float: 'left',
  margin: '12px 8px'
};

export const xStyle = {
  width: '16px',
  height: '16px'
};

export const filterTitleStyle = {
  fontSize: '14px',
  color: '#231f20',
  marginTop: '4px',
  paddingTop: '2px',
  marginBottom: 0,
  display: 'inline-block'
};

export const filterTypeStyle = {
  fontSize: '12px',
  color: greyishColor,
  marginBottom: 0,
  marginTop: 0,
  fontWeight: 300
};

export const clearFilterTextStyle = {
  fontSize: '14px',
  color: clayGray,
  fontWeight: 300,
  marginTop: '11px'
};

export const clearFilterLinkStyle = {
  color: accentColor,
  textDecoration: 'none'
};
