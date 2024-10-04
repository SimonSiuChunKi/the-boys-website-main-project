import { showSuccessReport } from '../components/notiflixConfig';
export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
}
export const handleLogout = (navigate) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    showSuccessReport('Successfully Logged Out', 'Hope to see you again!')
    navigate('/login');
};