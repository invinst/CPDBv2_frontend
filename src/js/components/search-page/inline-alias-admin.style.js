import { eyeCandyPink, smokeGray, deepGirlyPink } from 'utils/styles';
import { tagStyle } from 'components/search-page/search-tags.style';

export const inlineAliasAdminStyle = {
  backgroundColor: eyeCandyPink,
  height: '100vh',
  width: '100vw',
};

export const centerContentStyle = {
  position: 'absolute',
  top: '30%',
  left: '45%',
};

export const titleStyle = {
  fontWeight: '500',
  marginBottom: '30px',
};

export const textStyle = {
  margin: '0px',
};

export const descriptionStyle = {
  margin: '5px 0px',
  fontSize: '12px',
  fontWeight: '300',
};

export const hintStyle = {
  color: smokeGray,
  fontWeight: '300',
  fontSize: '13px'
};

export const errorStyle = {
  ...hintStyle,
  color: 'red'
};

export const actionButtonStyle = {
  ...tagStyle(false),
  textDecoration: 'none',
  backgroundColor: deepGirlyPink,
  color: 'inherit',
  border: 'none',
  marginRight: '10px',
  marginTop: '20px'
};

export const removeTagButtonStyle = {
  marginLeft: '5px',
  cursor: 'pointer',
  height: '8px',
};

export const reactTagsinputInputStyle = {
  border: 'none',
  outline: 'none',
  color: '#696767',
  marginBottom: '5px',
};
