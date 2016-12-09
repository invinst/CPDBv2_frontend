import { spindleColor, softBlackColor, sanFranciscoTextFamily } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const outerWrapperStyle = {
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.15)',
  position: 'relative',
  zIndex: 1
};

export const wrapperStyle = {
  height: '464px',
  padding: '32px 32px 100px 32px',
  position: 'relative'
};

export const leftColumnWrapperStyle = {
  width: '50%',
  background: spindleColor,
  display: 'inline-block'
};

export const sunburstGraphicStyle = {
  background: `url("${imgUrl('sunburst-graphic.svg')}") no-repeat scroll 0 0 transparent`,
  width: '242px',
  height: '260px',
  margin: '86px auto'
};

export const rightColumnWrapperStyle = {
  width: '50%',
  display: 'inline-block',
  verticalAlign: 'top',
  paddingLeft: '32px',
  paddingRight: '25px',
  boxSizing: 'border-box'
};

export const heroTitleStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '36px',
  fontWeight: 600,
  color: softBlackColor,
  marginBottom: '23px'
};

const heroTextStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '16px',
  fontWeight: 400,
  color: softBlackColor
};

export const heroComplaintTextStyle = {
  ...heroTextStyle,
  padding: '25px 0'
};

export const heroUseOfForceStyle = {
  ...heroTextStyle,
  borderTop: `1px solid ${softBlackColor}`,
  paddingTop: '25px'
};

export const editToggleStyle = {
  position: 'absolute',
  top: '16px',
  right: '16px',
  fontSize: '13px',
  fontWeight: 300
};
