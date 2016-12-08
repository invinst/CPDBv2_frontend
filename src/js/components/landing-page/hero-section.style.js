import { spindleColor, softBlackColor, sanFranciscoTextFamily } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = {
  height: '464px',
  padding: '32px 32px 100px 32px'
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
  paddingLeft: '32px',
  paddingRight: '25px'
};

export const heroTitleStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '36px',
  fontWeight: 600,
  color: softBlackColor
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
  borderTop: `1px solid ${softBlackColor}`
};
