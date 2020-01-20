import Cookies from 'js-cookie';

export const isSignedIn = () => !!Cookies.get('apiAccessToken');
