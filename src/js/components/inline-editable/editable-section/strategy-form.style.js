import {
  fashionPinkColor, softGreenColor, pinkishWhiteColor, tomatoPinkColor
} from 'utils/styles';


export const strategyFormStyle = {
  position: 'absolute',
  top: 0,
  boxShadow: `0 2px 4px 0 ${softGreenColor}`,
  padding: '16px',
  left: 'calc(50% - 117.5px)',
  backgroundColor: pinkishWhiteColor
};

export const numberEntriesStyle = {
  border: `1px solid ${fashionPinkColor}`,
  width: '37px',
  height: '22px',
  borderRadius: '2px',
  outline: 'none'
};

export const strategySelectStyle = {
  border: '1px solid white',
  backgroundColor: tomatoPinkColor,
  width: '158px',
  height: '26px',
  borderRadius: '2px',
  outline: 'none',
  marginLeft: '8px'
};
