import {
  whiteTwoColor,
  snowColor,
  softBlackColor,
  sugarCaneColor,
  clayGray,
} from 'utils/styles';


const height = 58;

export const wrapperShowingStyle = {

  backgroundColor: snowColor,
};

export const showingStyle = {
  backgroundColor: snowColor,
  height: `${height}px`,
  lineHeight: `${height}px`,
  display: 'inline-block',
};

export const kindStyle = {
  width: '61px',
  color: clayGray,
  backgroundColor: sugarCaneColor,
  border: `solid 1px ${whiteTwoColor}`
};

export const categoryStyle = {
  width: '297px',
  display: 'inline-block',
  verticalAlign: 'middle',
};

export const dateStyle = {
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 300,
};
