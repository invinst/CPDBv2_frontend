import { whiteTwoColor, sugarCaneColor, softBlackColor, } from 'utils/styles';


export const commonStyle = {
  fontSize: '14px',
};

const smallBoxStyle = {
  width: '104px',
  display: 'inline-block',
  textAlign: 'center',
};

export const commonRankStyle = {
  ...smallBoxStyle,
  borderRight: `solid 1px ${sugarCaneColor}`,
  backgroundColor: whiteTwoColor,
};

export const commonUnitStyle = {
  ...smallBoxStyle,
  whiteSpace: 'nowrap',
  backgroundColor: '#E8E7E7',
};

export const commonWrapperShowingStyle = {
  display: 'inline-block',
  width: 'calc(100% - 209px)',
};

export const commonShowingStyle = {
  width: 'calc(100% - 32px)',
  display: 'inline-block',
  margin: '0 16px',
};

export const commonWrapperKindStyle = {
  width: '85px',
  display: 'inline-block',
  marginRight: '16px',
};

export const commonKindStyle = {
  lineHeight: '24px',
  display: 'inline-block',
  textAlign: 'center',
};

export const commonCategoryStyle = {
  lineHeight: '18px',
  color: softBlackColor,
};

export const commonDetailStyle = {
  width: '297px',
  display: 'inline-block',
  verticalAlign: 'middle',
};

export const commonDateStyle = {
  float: 'right',
  width: '44px',
  display: 'inline-block',
  textAlign: 'right',
};

