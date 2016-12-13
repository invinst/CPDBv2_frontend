import { imgUrl } from 'utils/static-assets';


export const closeButtonStyle = {
  width: '22px',
  height: '22px',
  position: 'relative',
  left: 'calc(50% - 11px)',
  appearance: 'none',
  border: '0',
  background: `url("${imgUrl('ic-close.svg')}") no-repeat scroll center white`,
  ':hover': {
    background: `url("${imgUrl('ic-close-hover.svg')}") no-repeat scroll center transparent`
  }
};
