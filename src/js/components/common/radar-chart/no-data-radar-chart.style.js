import { boulderColor, whiteTwoColor } from 'utils/styles';


const noDataTextWidth = 252;

export const noDataRadarStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: boulderColor
};

export const noDataRadarTextStyle = {
  backgroundColor: 'transparent',
  color: whiteTwoColor,
  position: 'absolute',
  left: `calc(50% - ${noDataTextWidth / 2}px)`,
  bottom: '50px',
  width: `${noDataTextWidth}px`,
  fontSize: '14px',
  textAlign: 'center',
  fontWeight: 300
};
