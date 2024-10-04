import { showSuccessReport } from '../components/notiflixConfig';
import { deleteCookie, getCookie } from '../components/CookieManage';

export const isAuthenticated = () => {
    return !!getCookie('accessToken');
}
export const handleLogout = (navigate) => {
    deleteCookie('accessToken');
    deleteCookie('idToken');
    deleteCookie('refreshToken');
    deleteCookie('userId');
    showSuccessReport('Successfully Logged Out', 'Hope to see you again!')
    navigate('/login');
};