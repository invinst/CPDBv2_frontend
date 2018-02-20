import { whiteTwoColor, mediumGrayColor, hardBlackColor, accentColor, sanFranciscoTextFamily } from 'utils/styles';


export const wrapperStyle = {
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  verticalAlign: 'top',
  width: '50%',
  display: 'inline-block',
};

export const fieldsWrapperStyle = {
  display: 'inline-block',
  width: '100%',
};

export const unitWrapperStyle = {
  padding: '11px 0',
  margin: '0 16px',
  width: 'calc(100% - 32px)',
  height: '18px',
  borderTop: `solid 1px ${whiteTwoColor}`,
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

export const officerNameStyle = {
  width: '100%',
  height: '32px',
  fontSize: '26px',
  fontWeight: 500,
  margin: '48px 0 16px 16px'
};
