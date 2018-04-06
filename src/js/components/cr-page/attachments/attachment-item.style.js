import {
  whiteTwoColor, clayGray
} from 'utils/styles';

export const wrapperStyle = {
  width: '104px',
  marginRight: '16px',
  marginBottom: '30px',
  textDecoration: 'none',
  display: 'inline-block'
};

export const thumbnailStyle = imageUrl => ({
  width: '45px',
  height: '60px',
  border: `1px solid ${whiteTwoColor}`,
  background: `white url(${imageUrl}) no-repeat center center`,
  margin: '0 auto 8px'
});

export const titleStyle = {
  color: clayGray,
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: 400
};
