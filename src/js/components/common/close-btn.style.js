import { imgUrl } from 'utils/static-assets';


export const closeButtonStyle = (imageName, hoveredImageName) => ({
  width: '22px',
  height: '22px',
  position: 'relative',
  left: 'calc(50% - 11px)',
  appearance: 'none',
  border: '0',
  background: `url("${imgUrl(imageName)}") no-repeat scroll center white`,
  ':hover': {
    background: `url("${imgUrl(hoveredImageName)}") no-repeat scroll center transparent`
  }
});
