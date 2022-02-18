import { smokeGray, softBlackColor, sanFranciscoTextFamily, minionProFamily } from 'utils/styles';


export const wrapperStyle = {
  base: {
    margin: '0 auto',
    padding: '88px 16px 132px 16px',
    boxSizing: 'border-box',
  },
  mobile: {
    width: '614.4px',
  },
  tablet: {
    width: '794px',
  },
};

export const headLineStyle = {
  textAlign: 'center',
  paddingTop: '50px',
  fontFamily: minionProFamily,
  fontWeight: 'normal',
  fontSize: '36px',
  color: '#FFFFFF',
  background: '#235FEB',
  height: '90px',
};

export const sectionHeaderStyle = {
  margin: '0',
  color: softBlackColor,
  fontSize: '19px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: '600',
  boxSizing: 'border-box',
  textAlign: 'center',
};

export const smallSubHeaderStyle = {
  color: smokeGray,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 'normal',
  textDecoration: 'none',
  textAlign: 'center',
  paddingBottom: '30px',
};
