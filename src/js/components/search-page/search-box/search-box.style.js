import { whiteTwoColor } from 'utils/styles';


export const searchInputStyle = {
  input: {
    outline: 'none',
    border: 0,
    fontSize: '14px',
    verticalAlign: 'top',
    fontWeight: 300,
    backgroundColor: 'transparent',
  },
  wrapper: {
    boxSizing: 'border-box',
    width: '100%',
    height: '40px',
    padding: 0,
    border: `solid 1px ${whiteTwoColor}`,
  },
  placeholder: {
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: '14px',
  },
};
