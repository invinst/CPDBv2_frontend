import { deepBlueColor, accentColor, lavenderColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = ({ active, hovering }) => ({
  display: 'inline-block',
  boxSizing: 'border-box',
  cursor: 'pointer',
  width: '50px',
  height: '50px',
  padding: '18px 15px',
  fontSize: '16px',
  backgroundColor: active ?
    hovering ? deepBlueColor : accentColor :
    hovering ? lavenderColor : 'white'
});

export const iconStyle = (iconToUse) => ({
  display: 'inline-block',
  width: '100%',
  height: '100%',
  background: `url("${imgUrl(iconToUse)}") no-repeat scroll center`
});
