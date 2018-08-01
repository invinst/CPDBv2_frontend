import { linenColor, whiteTwoColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const animatedRadarChartStyle = {
  width: '50%',
  height: '392px',
  display: 'inline-block',
  backgroundColor: linenColor,
  verticalAlign: 'top',
  position: 'relative',
};

export const radarChartPlaceholderStyle = {
  width: '100%',
  height: '100%',
  cursor: 'pointer'
};

export const openExplainerButtonStyle = {
  width: '24px',
  height: '24px',
  backgroundColor: 'white',
  opacity: 0.6,
  borderRadius: '12px',
  position: 'absolute',
  right: '16px',
  top: '16px',
  boxSizing: 'border-box',
};

export const questionMarkStyle = {
  opacity: 1,
  display: 'inline-block',
  color: 'black',
  fontSize: '14px',
  verticalAlign: 'middle',
  textAlign: 'center',
  width: '100%',
  lineHeight: 1,
  fontWeight: 500,
  paddingTop: '2px',
};

export const radarChartOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent'
};

export const noDataRadarTextStyle = {
  backgroundColor: 'transparent',
  color: whiteTwoColor,
  position: 'absolute',
  padding: '0 16px',
  top: '300px',
  fontSize: '14px',
  textAlign: 'center',
  width: '100%',
  boxSizing: 'border-box',
  fontWeight: 300
};

export const noDataPopupStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  marginLeft: '5px',
  background: `url("${imgUrl('ic-info-white.svg')}") no-repeat scroll center transparent`,
};
