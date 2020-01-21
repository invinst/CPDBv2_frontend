import Cookies from 'js-cookie';

export const isSignedIn = () => Boolean(Cookies.get('apiAccessToken'));
