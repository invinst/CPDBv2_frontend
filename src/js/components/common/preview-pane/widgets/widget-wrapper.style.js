import { softBlackColor, sugarCaneColor } from 'utils/styles';


export const wrapperStyle = {
  color: softBlackColor,
  backgroundColor: sugarCaneColor,
  fontSize: '14px',
  padding: '0 8px 0',
  height: '100%',
};

export const responsiveContainerStyle = {
  maxHeight: 'calc(100% - 50px)',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  left: '-8px',
  padding: '0 8px',
};

export const gradientStyle = {
  position: 'absolute',
  height: '150px',
  width: '100%',
  bottom: 0,
  left: 0,
  background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(245, 244, 244, 1) 90%)',
};
