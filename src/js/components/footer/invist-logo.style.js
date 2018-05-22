import { imgUrl } from 'utils/static-assets';


export const invistStyle = hovering => ({
  display: 'inline-block',
  height: '20px',
  width: '155px',
  background: `url(${imgUrl(hovering ? 'invist-logo-blue.svg' : 'invist-logo.svg')}) no-repeat center/cover`
});
