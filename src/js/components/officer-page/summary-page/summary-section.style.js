import { whiteTwoColor, mediumGrayColor, hardBlackColor, accentColor, sanFranciscoTextFamily } from 'utils/styles';


export const wrapperStyle = {
  paddingTop: '16px',
  paddingBottom: '40px',
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400
};

export const fieldsWrapperStyle = {
  position: 'relative'
};

export const unitWrapperStyle = {
  padding: '11px 0',
  margin: '0 16px',
  width: 'calc(100% - 32px)',
  height: '18px',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  display: 'inline-block'
};

export const unitLabelStyle = {
  display: 'inline-block',
  color: mediumGrayColor,
  width: '117px'
};

export const unitValueStyle = {
  display: 'inline-block',
  color: hardBlackColor
};

export const lastFieldStyle = {
  borderBottom: 'none'
};

export const viewUnitProfileButtonStyle = {
  base: {
    color: mediumGrayColor,
    cursor: 'pointer'
  },
  hover: {
    color: accentColor,
    cursor: 'pointer'
  }
};
