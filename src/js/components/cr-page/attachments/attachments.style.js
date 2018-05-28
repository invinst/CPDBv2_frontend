import {
  sanFranciscoTextFamily, softBlackColor, whiteTwoColor, clayGray, sugarCaneColor
} from 'utils/styles';


export const wrapperStyle = hasData => ({
  backgroundColor: hasData ? 'white' : sugarCaneColor,
  position: 'relative',
  top: '-1px'
});

export const innerWrapperStyle = hasData => ({
  margin: '0 16px',
  borderBottom: hasData ? `1px solid ${whiteTwoColor}` : null,
  borderTop: hasData ? `1px solid ${whiteTwoColor}` : null,
  position: 'relative',
});

export const headerStyle = {
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  paddingTop: '9px'
};

export const attachmentsStyle = {
  paddingBottom: '8px'
};

export const headerLeftColumnStyle = {
  display: 'inline-block',
  width: 'calc(100% - 200px)'
};

export const titleStyle = {
  color: softBlackColor,
};

export const subTitleStyle = {
  color: clayGray,
  marginLeft: '8px',
};

export const emptyMessageStyle = {
  color: clayGray,
  fontSize: '14px'
};

export const requestButtonStyle = {
  display: 'inline-block',
  width: '200px',
  textAlign: 'right'
};
