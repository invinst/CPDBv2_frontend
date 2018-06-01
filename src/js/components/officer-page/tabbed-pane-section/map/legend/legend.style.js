import {
  softBlackColor,
  whiteTwoColor
} from 'utils/styles';


export const wrapperStyle = {
  width: '320px',
  height: '147px',
  borderRadius: '2px',
  border: `solid 1px ${ whiteTwoColor }`,
  backgroundColor: 'white',
  padding: '20px 16px 16px 16px',
  boxSizing: 'border-box',
  display: 'inline-block',
  position: 'absolute',
  top: '32px',
  right: '32px',
};

export const titleStyle = {
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'left',
  color: softBlackColor,
};

export const contentStyle = {
  marginTop: '12px',
  fontSize: '14px',
  fontWeight: 300,
};
