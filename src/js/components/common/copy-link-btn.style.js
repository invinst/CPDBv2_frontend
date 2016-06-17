import { imgUrl } from 'utils/static-assets';


export const buttonStyle = {
  width: '43px',
  height: '28px',
  appearance: 'none',
  border: '0',
  background: `url("${imgUrl('copy-link.svg')}") no-repeat scroll 0 0 transparent`
};

export const buttonHoverStyle = {
  width: '43px',
  height: '28px',
  appearance: 'none',
  border: '0',
  background: `url("${imgUrl('copy-link.svg')}") no-repeat scroll 0 0 transparent`,
  ':hover': {
    background: `url("${imgUrl('copy-link-hover.svg')}") no-repeat scroll 0 0 transparent`
  }
};
