import { pinkishWhiteColor } from 'utils/styles';


export const wrapperStyle = sectionEditModeOn => ({
  backgroundColor: sectionEditModeOn ? pinkishWhiteColor : 'transparent',
  display: 'inline-block'
});
