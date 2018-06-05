import { imgUrl } from 'utils/static-assets';


export const invistStyle = hovering => ({
  display: 'inline-block',
  height: '20px',
  width: '155px',
  marginLeft: '-9px',
  background: `url(${imgUrl(hovering ? 'invist-logo-hoverred.svg' : 'invist-logo.svg')}) no-repeat center/cover`
});
