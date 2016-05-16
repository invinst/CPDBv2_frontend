import { imgRootFolder } from 'utils/static-assets';


let imgRoot = imgRootFolder();

export const closeButtonStyle = {
  width: '35px',
  height: '35px',
  position: 'relative',
  left: 'calc(50% - 17.5px)',
  appearance: 'none',
  border: '0',
  background: `url("${imgRoot}X-04.svg") no-repeat scroll 0 0 transparent`
};
