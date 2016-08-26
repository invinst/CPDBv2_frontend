import { imgUrl } from 'utils/static-assets';


export const closeButtonStyle = {
  width: '30px',
  height: '30px',
  position: 'relative',
  left: 'calc(50% - 15px)',
  appearance: 'none',
  border: '0',
  background: `url("${imgUrl('header-x.svg')}") no-repeat scroll center white`,
  borderRadius: '15px',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
  ':hover': {
    background: `url("${imgUrl('header-x-hover.svg')}") no-repeat scroll center transparent`
  }
};
