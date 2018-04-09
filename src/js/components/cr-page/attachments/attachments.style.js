import {
  sanFranciscoTextFamily, softBlackColor, greyishColor, whiteTwoColor, clayGray
} from 'utils/styles';


export const wrapperStyle = {
  position: 'relative',
  margin: '0 16px',
  borderBottom: `1px solid ${whiteTwoColor}`
};

export const headerStyle = {
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  paddingTop: '7px',
  marginBottom: '21px'
};

export const headerLeftColumnStyle = {
  display: 'inline-block',
  width: 'calc(100% - 150px)'
};

export const titleStyle = {
  color: softBlackColor,
};

export const subTitleStyle = {
  color: clayGray,
  marginLeft: '8px',
};

export const emptyMessageStyle = {
  color: greyishColor,
  fontSize: '14px',
  padding: '11px 0'
};

export const requestButtonStyle = {
  display: 'inline-block',
  width: '150px',
  textAlign: 'right'
};
