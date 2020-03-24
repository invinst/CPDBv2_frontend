import Cookies from 'js-cookie';

export const isSignedInFromCookie = () => Boolean(Cookies.get('apiAccessToken'));
