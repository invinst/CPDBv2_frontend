import { greyishColor, softBlackColor, sugarCaneColor, whiteTwoColor } from 'utils/styles';
import { backButtonWidth } from './search-content.style';


const marginRight = 23;
export const searchInputStyle = {
  color: softBlackColor,
  outline: 'none',
  border: 0,
  fontSize: '14px',
  padding: '0 9px',
  display: 'inline-block',
  boxSizing: 'border-box',
  verticalAlign: 'top',
  fontWeight: 500,
  marginRight: `${marginRight}px`,
  width: `calc(100% - ${backButtonWidth + marginRight}px)`,
  height: '32px',
  backgroundColor: sugarCaneColor,
  ':hover': {
    backgroundColor: whiteTwoColor,
  }
};

export const searchInputPlaceholderStyle = {
  '::placeholder': {
    color: greyishColor
  }
};
